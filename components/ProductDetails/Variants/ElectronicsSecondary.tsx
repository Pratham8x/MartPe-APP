import React, { FC } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { router } from "expo-router";

interface ElectronicsProps {
  primaryAttribute: string;
  givePrimaryVariant: (primaryVariant: string) => void;
  productId: string;
  image: string;
  currentPrice: number;
  maximumPrice: number;
  availableQuantity: number;
  secondaryAttribute: string;
  secondaryVariant: string;
}

const ElectronicsSecondary: FC<ElectronicsProps> = ({
  primaryAttribute,
  givePrimaryVariant,
  productId,
  image,
  currentPrice,
  maximumPrice,
  availableQuantity,
  secondaryAttribute,
  secondaryVariant,
}) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          router.push(`/(tabs)/home/productDetails/${productId}`);
        }}
        style={{
          paddingVertical: 10,
          borderColor:
            secondaryVariant === secondaryAttribute ? "#F13A3A" : "#BBC8D1",
          borderWidth: 1.2,
          paddingHorizontal: Dimensions.get("window").width * 0.05,
          borderRadius: 10,
          marginRight: Dimensions.get("window").width * 0.03,
        }}
      >
        <Text>{secondaryAttribute}</Text>
      </Pressable>
    </View>
  );
};

export default ElectronicsSecondary;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 3,
    paddingVertical: 10,
    borderColor: "#BBC8D1",
    borderWidth: 1.2,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: Dimensions.get("window").width * 0.03,
  },
});
