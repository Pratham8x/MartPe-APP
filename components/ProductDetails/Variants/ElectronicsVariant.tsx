import React, { FC } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import ImageComp from "../../common/ImageComp";
import { router } from "expo-router";

interface ElectronicsProps {
  primaryAttribute: string;
  givePrimaryVariant: (primaryVariant: string) => void;
  productId: string;
  image: string;
  currentPrice: number;
  maximumPrice: number;
  availableQuantity: number;
  primaryVariant: string;
  isPrimary: boolean;
  selectedProductId: string;
}

const ElectronicsPrimary: FC<ElectronicsProps> = ({
  primaryAttribute,
  givePrimaryVariant,
  productId,
  image,
  currentPrice,
  maximumPrice,
  availableQuantity,
  primaryVariant,
  selectedProductId,
  isPrimary,
}) => {
  return (
    <View>
      {isPrimary ? (
        <Pressable
          onPress={() => {
            router.push(`/(tabs)/home/productDetails/${productId}`);
          }}
          style={{
            width: Dimensions.get("window").width / 3,
            paddingVertical: 10,
            borderColor: selectedProductId === productId ? "#333" : "#BBC8D1",
            borderWidth: 1.2,
            paddingHorizontal: 10,
            borderRadius: 10,
            marginRight: Dimensions.get("window").width * 0.03,
          }}
        >
          <ImageComp
            source={{ uri: image }}
            imageStyle={{ width: "100%", height: 120, borderRadius: 10 }}
          />
          <Text style={{ fontSize: 14, fontWeight: "500" }}>
            {primaryAttribute}
          </Text>

          <View>
            {availableQuantity > 0 ? (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "green" }}>
                In Stock
              </Text>
            ) : (
              <Text style={{ fontSize: 12, fontWeight: "400", color: "red" }}>
                Out of Stock
              </Text>
            )}
          </View>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            router.push(`/(tabs)/home/productDetails/${productId}`);
          }}
          style={[
            styles.containerSecondary,
            {
              borderColor: selectedProductId === productId ? "#333" : "#BBC8D1",
            },
          ]}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              fontWeight: selectedProductId === productId ? "600" : "400",
            }}
          >
            {primaryAttribute}
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default ElectronicsPrimary;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 3,
    paddingVertical: 5,
    borderColor: "#BBC8D1",
    borderWidth: 1.2,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: Dimensions.get("window").width * 0.03,
  },
  containerSecondary: {
    width: Dimensions.get("window").width / 4,
    paddingVertical: 10,
    borderColor: "#BBC8D1",
    borderWidth: 1.2,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: Dimensions.get("window").width * 0.03,
  },
});
