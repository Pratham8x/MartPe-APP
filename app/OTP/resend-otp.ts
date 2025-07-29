import Constants from "expo-constants";

const BASE_URL = Constants.expoConfig?.extra?.BACKEND_BASE_URL;

export const resendOTP = async ({
  orderId,
  phoneNumber,
}: {
  orderId: string;
  phoneNumber: string;
}) => {
  // Based on generateOTP, your backend uses action=gen, not action=generate!
  // Also notice generateOTP uses sendTo parameter, not phoneNumber
  const url = `${BASE_URL}/get-otp?action=gen&sendTo=${phoneNumber}&orderId=${orderId}`;
  
  console.log("Resend OTP URL (with action=gen):", url);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Resend OTP response status:", res.status);

    if (res.status !== 200) {
      const data = await res.json();
      console.log('Resend OTP Error Response:', data);
      return { status: res.status, data };
    }

    const data = await res.json();
    console.log('Resend OTP Success Response:', data);
    return { status: 200, data };
  } catch (error) {
    console.log('Resend OTP Fetch error:', error);
    return { status: 500, data: { error: { message: 'resend otp failed' } } };
  }
};

// Alternative version - try without orderId first (like initial generation)
export const resendOTPWithoutOrderId = async ({
  orderId,
  phoneNumber,
}: {
  orderId: string;
  phoneNumber: string;
}) => {
  // Exactly like generateOTP - no orderId parameter
  const url = `${BASE_URL}/get-otp?action=gen&sendTo=${phoneNumber}`;
  
  console.log("Resend OTP URL (no orderId):", url);

  try {
    const res = await fetch(url);

    if (res.status !== 200) {
      const data = await res.json();
      console.log('Resend OTP Error Response:', data);
      return { status: res.status, data };
    }

    const data = await res.json();
    console.log('Resend OTP Success Response:', data);
    return { status: 200, data };
  } catch (error) {
    console.log('Resend OTP Fetch error:', error);
    return { status: 500, data: { error: { message: 'resend otp failed' } } };
  }
};

export default function OTPPage() {
  return null;
}