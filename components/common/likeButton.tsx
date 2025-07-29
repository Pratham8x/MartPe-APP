import React, { useRef, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Animated, // Import Animated
} from "react-native";
import { useFavoriteStore } from "../../state/useFavoriteStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface LikeButtonProps {
  productId?: string;
  vendorId?: string;
  color?: string;
}

const LikeButton = ({ productId, vendorId, color }: LikeButtonProps) => {
  const {
    addFavorite,
    removeFavorite,
    addVendorFavorite,
    removeVendorFavorite,
  } = useFavoriteStore();
  const [fav, setFav] = useState<boolean>(false);
  const allFavorites = useFavoriteStore((state) => state.allFavorites);
  const isFavorite: boolean = productId
    ? allFavorites?.products?.find((id) => id.id === productId)
      ? true
      : false
    : allFavorites?.vendors?.find((id) => id.id === vendorId)
    ? true
    : false;

  // Animation value
  const scaleValue = useRef(new Animated.Value(1)).current; // Initial scale

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.8,
      friction: 3, // Bounciness of the spring
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Return to original scale
      friction: 3, // Bounciness of the spring
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  };

  useEffect(() => {
    if (isFavorite) {
      setFav(true);
    }
  }, [allFavorites]);

  return (
    <View>
      {fav ? (
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={() => {
            handlePressOut();
            if (vendorId) {
              removeVendorFavorite(vendorId as string).then(() => {
                setFav(false);
              });
            } else {
              removeFavorite(productId as string).then(() => {
                setFav(false);
              });
            }
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <MaterialCommunityIcons name="heart" size={24} color="#FB3E44" />
          </Animated.View>
        </Pressable>
      ) : (
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={() => {
            handlePressOut();
            if (vendorId) {
              addVendorFavorite(vendorId as string).then(() => {
                setFav(true);
              });
            } else {
              addFavorite(productId as string).then(() => {
                setFav(true);
              });
            }
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color={color ? color : "#000"}
            />
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};

export default LikeButton;
