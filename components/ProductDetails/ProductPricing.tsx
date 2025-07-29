import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Discount } from "./SVG";
import { router } from "expo-router";

interface ProductPricingProps {
  storeName: string;
  description: string;
  maxPrice: number;
  price: number;
  discount: number;
  storeId: string;
}

const { width, height } = Dimensions.get("window");

const ProductPricing: FC<ProductPricingProps> = ({
  storeName,
  description,
  maxPrice,
  price,
  discount,
  storeId,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.push(`/(tabs)/home/productListing/${storeId}`);
        }}
      >
        <Text style={{ textAlign: "left" }}>
          Visit / Explore{" "}
          <Text style={{ color: "#F13A3A", fontWeight: "900" }}>
            {storeName}
          </Text>
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          color: "#000",
          fontWeight: "400",
          fontSize: 13,
          paddingVertical: 5,
        }}
      >
        {description}
      </Text>
      <View
        style={{ height: 1, backgroundColor: "#EAEFF1", marginVertical: 10 }}
      ></View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: width * 0.02,
          }}
        >
          {maxPrice > price && (
            <Text
              style={{
                fontSize: 16,
                textDecorationLine: "line-through",
                fontWeight: "400",
                color: "#495057",
              }}
            >
              ₹ {Math.ceil(maxPrice)}
            </Text>
          )}
          <Text style={{ fontSize: 14 }}>₹</Text>

          <Text style={{ fontSize: 20, fontWeight: "900" }}>{price}</Text>
        </View>
        {discount > 0 && (
          <View
            style={{
              backgroundColor: "#1DA578",
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: width * 0.05,
              borderRadius: 100,
            }}
          >
            <Discount />

            <Text style={{ color: "white" }}>{Math.ceil(discount)} %</Text>
          </View>
        )}
      </View>
      <Text style={{ fontSize: 12, color: "#495057" }}>
        Inclusive of all taxes
      </Text>
    </View>
  );
};

export default ProductPricing;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",

    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.05,
    marginHorizontal: width * 0.05,
    elevation: 5,
    borderRadius: 10,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#495057",
    marginRight: width * 0.05,
  },
  cartButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  cartButtonIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
});
