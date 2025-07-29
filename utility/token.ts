import { decode } from "base-64";

export interface decodedToken {
  id: string;
  iat: number;
  exp: number;
  iss: string;
}

export const decodeJWTToken = (token: string): decodedToken => {
  return JSON.parse(decode(token.split(".")[1]));
};

export const isTokenValid = (token: string) => {
  if (!token) return false;
  const decodedAccessToken = decodeJWTToken(token);
  const tokenExpiry = decodedAccessToken?.exp * 1000;
  return tokenExpiry > Date.now();
};
