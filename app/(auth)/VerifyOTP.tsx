import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useToast } from "react-native-toast-notifications";
import useUserDetails from "../../hook/useUserDetails";
import { resendOTP } from "../OTP/resend-otp";
import { verifyOTP } from "../OTP/verify-otp";

const textInputColor = "#C7C4C4";
const resendOTPDuration = 30;

interface VerifyOtpResponseType {
  status: number;
  data: {
    token?: string;
    user?: {
      _id: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      lastUsedAddress?: any;
    };
    isOTPVerified: boolean;
    error?: {
      message: string;
    };
  };
}

function padZero(num: number, size: number): string {
  let s = num.toString();
  while (s.length < size) s = "0" + s;
  return s;
}

const VerifyOTP: React.FC = () => {
  const toast = useToast();
  const { otpOrderId, mobileNumber } = useLocalSearchParams<{
    otpOrderId: string;
    mobileNumber: string;
  }>();
  const router = useRouter();
  const { saveUserDetails } = useUserDetails();

  const [otp, setOtp] = useState<string>("");
  const [count, setCount] = useState(resendOTPDuration);
  const [isValidOTPLength, setIsValidOTPLength] = useState<boolean>(false);
  const [textInputBorderColor, setTextInputBorderColor] =
    useState(textInputColor);

  const customTextInputOnFocus = () => setTextInputBorderColor("#030303");
  const customTextInputOnBlur = () => setTextInputBorderColor(textInputColor);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getFormattedMobileNumber = (number: string) => {
    return number.length === 10 ? `${number}` : number;
  };


const handleResendOTP = async () => {
  if (count === 0 && otpOrderId && mobileNumber) {
    try {
      const decodedOrderId = decodeURIComponent(otpOrderId);
      const formattedNumber = getFormattedMobileNumber(mobileNumber);
      
      console.log("Resending OTP with params:", {
        orderId: decodedOrderId,
        phoneNumber: formattedNumber
      });

      const response = await resendOTP({
        orderId: decodedOrderId,
        phoneNumber: formattedNumber
      });

      console.log("Resend OTP response:", response);

      if (response.status === 200) {
        toast.show("OTP has been resent to your mobile number", {
          type: "success",
          placement: "bottom",
          duration: 3000,
        });
        setCount(resendOTPDuration);
        setOtp(""); // Clear existing OTP input
      } else {
        console.error("OTP resend failed:", response);
        const errorMessage = response.data?.message || response.data?.error?.message || "Failed to resend OTP";
        toast.show(errorMessage, {
          type: "danger",
          placement: "bottom",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(`Error resending OTP for [${otpOrderId}]:`, error);
      
      // More detailed error handling
      let errorMessage = "Error resending OTP";
      if (error instanceof Error) {
        if (error.message.includes('Network request failed')) {
          errorMessage = "Network connection failed. Please check your internet connection.";
        } else if (error.message.includes('timeout')) {
          errorMessage = "Request timed out. Please try again.";
        } else {
          errorMessage = `Network error: ${error.message}`;
        }
      }
      
      toast.show(errorMessage, {
        type: "danger",
        placement: "bottom",
        duration: 4000,
      });
    }
  } else {
    // Handle missing parameters
    if (!otpOrderId) {
      toast.show("Missing OTP order ID", { type: "danger", placement: "bottom" });
    } else if (!mobileNumber) {
      toast.show("Missing mobile number", { type: "danger", placement: "bottom" });
    } else if (count > 0) {
      toast.show(`Please wait ${count} seconds before requesting again`, { 
        type: "warning", 
        placement: "bottom" 
      });
    }
  }
};

  const validateOTP = async (mobileNumber: string) => {
    try {
      const formattedNumber = getFormattedMobileNumber(mobileNumber);
      const decodedOrderId = decodeURIComponent(otpOrderId!);

      console.log("Verifying OTP for:", formattedNumber);

      const response = (await verifyOTP(
        formattedNumber,
        decodedOrderId,
        otp
      )) as VerifyOtpResponseType;

      console.log("Verify OTP response:", response);

      if (response.status === 200) {
        const { token, user, isOTPVerified } = response.data;

        if (isOTPVerified && user && token) {
          const userDetails = {
            userId: user._id,
            accessToken: token,
            refreshToken: token,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            savedAddresses: user.lastUsedAddress ? [user.lastUsedAddress] : [],
          };

          console.log("Saving user details...");
          await saveUserDetails(userDetails);
          router.replace("/(auth)/SignUp");
        } else if (isOTPVerified && !user) {
          router.push({
            pathname: "/(auth)/SignUp",
            params: { mobileNumber: formattedNumber },
          });
        } else {
          Alert.alert("Verification Failed", "Invalid OTP");
        }
      } else {
        Alert.alert(
          "Verification Failed",
          response.data?.error?.message || "Invalid OTP"
        );
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "An error occurred during verification");
    }
  };

  useEffect(() => {
    setIsValidOTPLength(otp.length === 6);
  }, [otp]);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "",
          headerShown: true,
          headerBackVisible: true,
          headerShadowVisible: false,
        }}
      />

      <Text style={{ fontSize: 20, fontWeight: "700" }}>Verify OTP</Text>

      <Text style={styles.otpSubHeaderDescription}>
        You have to enter an OTP code we sent via SMS to your registered mobile
        number
        <Text style={{ fontWeight: "500" }}>
          +91-
          {mobileNumber
            ? `${mobileNumber.slice(0, 3)}XXXX${mobileNumber.slice(7, 11)}`
            : "XXXXXXX"}
        </Text>
        .
      </Text>

      <Text style={{ fontSize: 16, fontWeight: "500" }}>
        OTP<Text style={{ color: "#FB3E44" }}>*</Text>
      </Text>

      <View style={styles.otpInputContainer}>
        <TextInput
          keyboardType="number-pad"
          maxLength={6}
          style={{
            ...styles.inputField,
            borderColor: textInputBorderColor,
          }}
          onChangeText={setOtp}
          value={otp}
          caretHidden
          onFocus={customTextInputOnFocus}
          onBlur={customTextInputOnBlur}
        />
      </View>

      {count === 0 ? (
        <Text style={styles.resendOtpText}>
          Did not receive the OTP yet?    
          <Text
            style={{
              color: "#030303",
              textDecorationLine: "underline",
              fontWeight: "500",
            }}
            onPress={handleResendOTP}
          >

              Resend OTP
          </Text>
        </Text>
      ) : (
        <Text style={styles.resendOtpText}>
          OTP request to resend in
          <Text style={styles.resendOtpCounter}> 00:{padZero(count, 2)}</Text>
             sec
        </Text>
      )}

      <TouchableOpacity
        style={{
          ...styles.verifyOTPButton,
          backgroundColor: isValidOTPLength ? "#FB3E44" : "#D9D9D9",
        }}
        activeOpacity={!isValidOTPLength ? 1 : 0.5}
        disabled={!isValidOTPLength}
        onPress={() => isValidOTPLength && validateOTP(mobileNumber)}
      >
        <Text
          style={{
            ...styles.verifyOTPButtonText,
            color: isValidOTPLength ? "#FFFFFF" : "#6C6C6C",
          }}
        >
          Submit
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 30,
  },
  otpSubHeaderDescription: {
    fontSize: 15,
    marginVertical: 10,
  },
  otpInputContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputField: {
    borderWidth: 1,
    width: widthPercentageToDP("90"),
    height: 50,
    borderRadius: 10,
    paddingLeft: widthPercentageToDP("90") / 7,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 30,
  },
  verifyOTPButton: {
    backgroundColor: "#FB3E44",
    width: widthPercentageToDP("90"),
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    borderRadius: 50,
  },
  verifyOTPButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendOtpText: {
    marginTop: 10,
    fontSize: 14,
    color: "#7B7B7B",
    fontWeight: "400",
  },
  resendOtpCounter: {
    fontSize: 14,
    color: "#7B7B7B",
    fontWeight: "bold",
  },
});

export default VerifyOTP;