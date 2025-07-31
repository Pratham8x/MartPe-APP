import { me } from "../gql/api/user";

export const isTokenExpired = async (token: string) => {
  try {
    const response: any = await me();
    console.log("isTokenExpired response:", response);
    return response?.data?.isTokenExpired?.isTokenExpired;
  } catch (error) {
    console.error("Error checking if token is expired:", error);
  }
};
