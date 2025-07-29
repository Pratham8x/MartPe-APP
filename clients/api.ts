import { GraphQLClient } from "graphql-request";
import { isTokenValid } from "../utility/token";
import {
  getAsyncStorageItem,
  setAsyncStorageItem,
} from "../utility/asyncStorage";

const backend_graphql_url =
  process.env.EXPO_PUBLIC_BACKEND_GRAPHQL_URL ||
  "https://api-sandbox.martpe.in/graphql";
const refresh_token_url =
  process.env.EXPO_PUBLIC_REFRESH_TOKEN_URL ||
  "https://api-sandbox.martpe.in/refresh-token";

// For development fallback
const testAccessToken = "your_dev_token_here";

const getRefreshedTokens = async (refreshToken: string) => {
  try {
    const response = await fetch(refresh_token_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      console.log("Failed to refresh tokens, status:", response.status);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while refreshing token:", error);
    return null;
  }
};

const getAccessToken = async () => {
  try {
    const userDetails = await getAsyncStorageItem("userDetails");
    if (!userDetails) return testAccessToken;

    const parsedUserDetails = JSON.parse(userDetails);
    const { accessToken, refreshToken } = parsedUserDetails || {};

    if (isTokenValid(accessToken)) {
      console.log("Access token is valid – reusing.");
      return accessToken;
    }

    console.log("Access token expired – trying to refresh.");

    if (!isTokenValid(refreshToken)) {
      console.log("Refresh token is also invalid – re-login required.");
      return testAccessToken;
    }

    // ✅ Attempt to refresh tokens
    const refreshed = await getRefreshedTokens(refreshToken);
    if (!refreshed || !refreshed.accessToken) {
      console.log("Failed to refresh tokens – using test token.");
      return testAccessToken;
    }

    // ✅ Save new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      refreshed;

    await setAsyncStorageItem("userDetails", {
      ...parsedUserDetails,
      ...(newAccessToken && { accessToken: newAccessToken }),
      ...(newRefreshToken && { refreshToken: newRefreshToken }),
    });

    return newAccessToken;
  } catch (error) {
    console.error("Error fetching token from AsyncStorage:", error);
    return testAccessToken;
  }
};

export const getHeaders = async (): Promise<Record<string, string>> => {
  const accessToken = await getAccessToken();

  if (accessToken && accessToken.length > 0) {
    return { Authorization: "Bearer " + accessToken };
  }

  console.log("No valid access token found – skipping headers.");
  return {};
};


// Create GraphQL client (auth headers can be passed per request)
export const graphqlClient = new GraphQLClient(backend_graphql_url);
