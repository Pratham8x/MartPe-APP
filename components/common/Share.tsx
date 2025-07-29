import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Share } from "react-native";
import useUserDetails from "../../hook/useUserDetails";
import { MaterialCommunityIcons } from "@expo/vector-icons";
interface ShareProps {
  productId?: string;
  productName?: string;
  storeId?: string;
  storeName?: string;
  type: string;
  incentivise: boolean;
  size?: number;
  address?: string;
}

const ShareButton = ({
  productId,
  productName,
  storeId,
  storeName,
  type,
  incentivise,
  size,
  address,
}) => {
  const { userDetails, getUserDetails } = useUserDetails();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    getUserDetails().then(() => setIsLoading(false));
    console.log("User details from app:", userDetails);
  }, []);

  function getMessage(
    type,
    username,
    productName,
    storeName,
    productId,
    storeId,
    address
  ) {
    switch (type) {
      case "item":
        return `Hey! ${username} has shared *${productName}* from *${storeName}* outlet on the app! Click on the link to view the product: https://www.martpe.in/(tabs)/home/productDetails/${productId}`;
      case "outlet":
        return `Hey! ${username} has shared *${storeName}* outlet on the app! Click on the link to view the outlet: 
        https://www.martpe.in/(tabs)/home/productListing/${storeId}`;
      default:
        return `Hey! ${username} has shared address:  ${address} on the app! Click to the link : https://www.martpe.in/addAddress`;
    }
  }

  const shareMessage = async () => {
    if (isLoading) {
      return;
    }
    const username = userDetails.firstName;
    try {
      const result = await Share.share({
        message: getMessage(
          type,
          username,
          productName,
          storeName,
          productId,
          storeId,
          address
        ),
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableOpacity onPress={shareMessage}>
      <MaterialCommunityIcons
        name="share-variant"
        size={size ? size : 24}
        color="#000"
      />
    </TouchableOpacity>
  );
};

export default ShareButton;
