import { useState } from "react";
import {
  getAsyncStorageItem,
  removeAsyncStorageItem,
  setAsyncStorageItem,
} from "../utility/asyncStorage";

export const getUserDetails = async () => {
  try {
    const details = await getAsyncStorageItem("userDetails");
    // if (details !== null) {
    //   setUserDetails(JSON.parse(details));
    // }
    return details;
  } catch (error) {
    console.error("Error retrieving user details:", error);
  } 
};

interface UserDetails {
  accessToken: string;
  refreshToken: string;
    firstName: string;
  lastName: string;
  phoneNumber: string;
}

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveUserDetails = async (details: UserDetails) => {
    try {
      await setAsyncStorageItem("userDetails", JSON.stringify(details));
      setUserDetails(details);
      console.log("User details saved successfully, details:", details);
    } catch (error) {
      console.error("Error saving user details:", error);
    }
  };

 const getUserDetails = async (): Promise<UserDetails | null> => {
  try {
    const details = await getAsyncStorageItem("userDetails");
    if (details && typeof details === "string") {
      const parsedDetails = JSON.parse(details) as UserDetails;
      setUserDetails(parsedDetails);
      return parsedDetails;
    }
    return null;
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return null;
  } finally {
    setIsLoading(false);
  }
};

  // ...existing code...
  const removeUserDetails = async () => {
    try {
      await removeAsyncStorageItem("userDetails");
      setUserDetails(null);
      console.log("User details removed successfully");
    } catch (error) {
      console.error("Error removing user details:", error);
    }
  };

  return {
    userDetails,
    isLoading,
    saveUserDetails,
    getUserDetails,
    removeUserDetails,
  };
};

export default useUserDetails; 