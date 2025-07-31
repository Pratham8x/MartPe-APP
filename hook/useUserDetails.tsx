import { useEffect, useState } from "react";
import {
  getAsyncStorageItem,
  removeAsyncStorageItem,
  setAsyncStorageItem,
} from "../utility/asyncStorage";

export const getUserDetails = async () => {
  try {
    const details = await getAsyncStorageItem("userDetails");
    return details;
  } catch (error) {
    console.error("Error retrieving user details:", error);
    return null;
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize user details when the hook is first used
  useEffect(() => {
    initializeUserDetails();
  }, []);

  const initializeUserDetails = async () => {
    try {
      setIsLoading(true);
      const details = await getAsyncStorageItem("userDetails");
      if (details && typeof details === "string") {
        const parsedDetails = JSON.parse(details) as UserDetails;
        setUserDetails(parsedDetails);
        setIsAuthenticated(true);
        console.log("User details loaded from storage:", parsedDetails);
      } else {
        console.log("No user details found in storage");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error initializing user details:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserDetails = async (details: UserDetails) => {
    try {
      await setAsyncStorageItem("userDetails", JSON.stringify(details));
      setUserDetails(details);
      setIsAuthenticated(true);
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
        setIsAuthenticated(true);
        return parsedDetails;
      }
      return null;
    } catch (error) {
      console.error("Error retrieving user details:", error);
      return null;
    }
  };

  const removeUserDetails = async () => {
    try {
      await removeAsyncStorageItem("userDetails");
      setUserDetails(null);
      setIsAuthenticated(false);
      console.log("User details removed successfully");
    } catch (error) {
      console.error("Error removing user details:", error);
    }
  };

  // Check if user is authenticated (has valid tokens)
  const checkAuthentication = () => {
    return isAuthenticated && userDetails && userDetails.accessToken;
  };

  return {
    userDetails,
    isLoading,
    isAuthenticated,
    saveUserDetails,
    getUserDetails,
    removeUserDetails,
    checkAuthentication,
    refreshUserDetails: initializeUserDetails,
  };
};

export default useUserDetails;