import React, { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useUserDetails from "../hook/useUserDetails";
import { isTokenValid } from "../utility/token";

export default function Page() {
  const { userDetails, getUserDetails } = useUserDetails();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // default false
  const queryClient = new QueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      await getUserDetails(); // fetch from AsyncStorage
      console.log("User details from app:", userDetails);

      if (userDetails) {
        const { accessToken, refreshToken } = userDetails;
        const isAccessTokenValid = isTokenValid(accessToken);
        const isRefreshTokenValid = isTokenValid(refreshToken);
        console.log(
          "isAccessTokenValid:",
          isAccessTokenValid,
          "isRefreshTokenValid:",
          isRefreshTokenValid,
        );

        setIsLoggedIn(isAccessTokenValid || isRefreshTokenValid);
      } else {
        setIsLoggedIn(false);
      }

      setIsLoading(false); // move this to end
    };

    checkAuth();
  }, []); // empty dependency list — runs only once

  if (isLoading) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        {isLoggedIn ? (
          <Redirect href={"../(tabs)/home"} />
        ) : (
          <Redirect href={"../(auth)/"} />
        )}
      </ToastProvider>
    </QueryClientProvider>
  );
}