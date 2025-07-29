import { graphqlClient } from "../../clients/api";
import {
  generateOTPQuery,
  verifyOTPQuery,
  resendOTPQuery,
} from "../queries/onboarding";

export const generateOTP = (params: any) => {
  console.log(`params: ${JSON.stringify(params, null, 2)}`);
  return graphqlClient.setHeaders({}).request(generateOTPQuery, { ...params });
};

export const verifyOTP = (params: any) => {
  return graphqlClient.setHeaders({}).request(verifyOTPQuery, { ...params });
};

export const resendOTP = (params: any) => {
  return graphqlClient.setHeaders({}).request(resendOTPQuery, { ...params });
};
