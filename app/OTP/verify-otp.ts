import Constants from "expo-constants";
import { AddressType } from "../../common-types";

export interface VerifyOtpResponseType {
  token?: string;
  user?: {
    _id: string;
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    email?: string;
    fav_items: string[];
    fav_stores: string[];
    cartItemsCount: number;
    lastUsedAddress: AddressType;
  };
  isOTPVerified: true;
}

const BASE_URL = Constants.expoConfig?.extra?.BACKEND_BASE_URL;

export const verifyOTP = async (
  phoneNumber: string,
  orderId: string,
  otp: string
): Promise<{
  status: number;
  data: VerifyOtpResponseType | { error: { message: string } };
}> => {
  const url = `${BASE_URL}/get-otp?action=verify&orderId=${orderId}&phoneNumber=${phoneNumber}&otp=${otp}`;
  console.log("Verify OTP URL:", url);

  try {
    const res = await fetch(url);

    if (res.status !== 200) {
      console.warn("Verify OTP failed with status:", res.status);
      const data = await res.json();
      return { status: res.status, data };
    }

    const data = (await res.json()) as VerifyOtpResponseType;
    return { status: 200, data };
  } catch (error) {
    console.error("verifyOTP fetch error:", error);
    return {
      status: 500,
      data: { error: { message: "Something went wrong while verifying OTP" } },
    };
  }
};

// Required dummy default export to prevent Expo Router warning
export default function VerifyOTPPage() {
  return null;
}
