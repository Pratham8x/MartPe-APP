import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import useUserDetails from "../../hook/useUserDetails";
 import { createUser } from "../../user/create-user";

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface FormValidation {
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phoneNumber: boolean;
}

const SignUp: React.FC = () => {
  const { saveUserDetails } = useUserDetails();
  const router = useRouter();
  const { mobileNumber } = useLocalSearchParams();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: mobileNumber ? String(mobileNumber).replace(/^\+?91/, "") : "",
  });
  
  const [validation, setValidation] = useState<FormValidation>({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });

  const [fieldErrors, setFieldErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate individual fields
  const validateField = (field: keyof UserFormData, value: string): string => {
    switch (field) {
      case "firstName":
        return value.trim().length >= 2 ? "" : "First name must be at least 2 characters";
      case "lastName":
        return value.trim().length >= 2 ? "" : "Last name must be at least 2 characters";
      case "email":
        return emailRegex.test(value.trim()) ? "" : "Please enter a valid email address";
      case "phoneNumber":
        return /^\d{10}$/.test(value) ? "" : "Phone number must be exactly 10 digits";
      default:
        return "";
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof UserFormData, value: string) => {
    // Clean phone number input
    if (field === "phoneNumber") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    // Update form data
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Validate field
    const error = validateField(field, value);
    setFieldErrors(prev => ({
      ...prev,
      [field]: error
    }));

    // Update validation state
    setValidation(prev => ({
      ...prev,
      [field]: error === ""
    }));
  };

  // Check if form is valid
  const isFormValid = (): boolean => {
    const baseValidation = validation.firstName && validation.lastName && validation.email;
    
    // If mobile number came from previous screen, don't validate phone input
    if (mobileNumber) {
      return baseValidation;
    }
    
    return baseValidation && validation.phoneNumber;
  };

  // Handle form submission this is main need to fix it after some time
  const handleSubmit = async () => {
    if (!isFormValid()) {
      Alert.alert("Validation Error", "Please fill all required fields correctly");
      return;
    }

    setLoading(true);

    try {
      // Use phone from params if available, otherwise use form input
      const phoneToUse = mobileNumber 
        ? String(mobileNumber).replace(/^\+?91/, "")
        : formData.phoneNumber;

      console.log("Submitting user data:", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phoneNumber: phoneToUse,
      });

      const response = await createUser(
        formData.firstName.trim(),
        phoneToUse,
        formData.lastName.trim(),
        formData.email.trim()
      );

      console.log("API Response:", response);

      if (response.status === 200 && response.data) {
        const userData = response.data;

        // Prepare user details for storage
        const userDetails = {
          userId: userData._id,
          accessToken: userData.token,
          refreshToken: userData.token,
          firstName: userData.firstName,
          lastName: userData.lastName || "",
          phoneNumber: userData.phoneNumber,
          email: userData.email || "",
        };

        // Save user details
        await saveUserDetails(userDetails);
        
        // Navigate to home screen
        router.replace("../(tabs)/home");
        
      } else {
        // Handle API errors
        const errorMessage = response.data?.error?.message || 
                           response.data?.message || 
                           "Registration failed. Please try again.";
        Alert.alert("Registration Failed", errorMessage);
      }

    } catch (error: any) {
      console.error("Registration error:", error);
      
      let errorMessage = "An unexpected error occurred. Please try again.";
      
      if (error.message === "Network request failed") {
        errorMessage = "Unable to connect to server. Please check your internet connection.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Help us to get to know you</Text>
          <Text style={styles.subtitle}>Please fill in your details to get started</Text>

          <View style={styles.form}>
            {/* First Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={[
                  styles.input,
                  fieldErrors.firstName ? styles.inputError : null
                ]}
                placeholder="Enter your first name"
                value={formData.firstName}
                onChangeText={(text) => handleInputChange("firstName", text)}
                autoCapitalize="words"
                maxLength={50}
              />
              {fieldErrors.firstName ? (
                <Text style={styles.errorText}>{fieldErrors.firstName}</Text>
              ) : null}
            </View>

            {/* Last Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={[
                  styles.input,
                  fieldErrors.lastName ? styles.inputError : null
                ]}
                placeholder="Enter your last name"
                value={formData.lastName}
                onChangeText={(text) => handleInputChange("lastName", text)}
                autoCapitalize="words"
                maxLength={50}
              />
              {fieldErrors.lastName ? (
                <Text style={styles.errorText}>{fieldErrors.lastName}</Text>
              ) : null}
            </View>

            {/* Phone Number Input - Only show if not from OTP screen */}
            {!mobileNumber && (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                  style={[
                    styles.input,
                    fieldErrors.phoneNumber ? styles.inputError : null
                  ]}
                  placeholder="Enter 10-digit phone number"
                  value={formData.phoneNumber}
                  onChangeText={(text) => handleInputChange("phoneNumber", text)}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
                {fieldErrors.phoneNumber ? (
                  <Text style={styles.errorText}>{fieldErrors.phoneNumber}</Text>
                ) : null}
              </View>
            )}

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={[
                  styles.input,
                  fieldErrors.email ? styles.inputError : null
                ]}
                placeholder="Enter your email address"
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={100}
              />
              {fieldErrors.email ? (
                <Text style={styles.errorText}>{fieldErrors.email}</Text>
              ) : null}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor: isFormValid() ? "#FB3E44" : "#cccccc",
                  opacity: isFormValid() ? 1 : 0.7,
                }
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid() || loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.submitButtonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#741919",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: "#080404",
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333333",
  },
  inputError: {
    borderColor: "#ff4444",
    backgroundColor: "#fff5f5",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginTop: 6,
    fontWeight: "500",
  },
  submitButton: {
    width: wp("90%"),
    alignSelf: "center",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    shadowColor: "#FB3E44",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SignUp;