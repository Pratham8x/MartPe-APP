import ImageComp from "../../components/common/ImageComp";
import React, { FC } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { useFavoriteStore } from "../../state/useFavoriteStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AddToCartButton from "../../components/search/AddToCartButton";
import { router } from "expo-router";
interface FavItemsProps {
  itemsData: any;
}

const FavItems: FC<FavItemsProps> = ({ itemsData }) => {
  const { removeFavorite } = useFavoriteStore();
  return (
    <ScrollView>
      {[...itemsData].reverse().map((item: any) => {
        return (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              borderRadius: 12,
              // borderWidth: 1.2,

              backgroundColor: "#F5F7F8",
              marginTop: Dimensions.get("screen").width * 0.05,
              paddingVertical: Dimensions.get("screen").width * 0.03,
              paddingHorizontal: Dimensions.get("screen").width * 0.03,
              // backgroundColor: "#ff3",
            }}
            key={item.id}
            onPress={() => {
              router.push(`/(tabs)/home/productDetails/${item.id}`);
            }}
          >
            <ImageComp
              source={item.descriptor.images[0]}
              imageStyle={{
                minHeight: Dimensions.get("screen").width * 0.25,
                // aspectRatio: 1,
                width: Dimensions.get("screen").width * 0.25,
                borderRadius: 10,
                borderWidth: 1,
                marginRight: 10,
                borderColor: "#D0D4CA",
              }}
              resizeMode="cover"
            />
            <View style={{ width: "65%" }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {item.descriptor.name.split(" ").slice(0, 7).join(" ")}
              </Text>
              <Text
                style={{ fontSize: 13, fontWeight: "400", color: "#607274" }}
              >
                {item.provider.descriptor.name}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.price?.maximum_value > item.price?.value && (
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      color: "#607274",
                      marginRight: 5,
                      textDecorationLine: "line-through",
                    }}
                  >
                    ₹ {item.price?.maximum_value}
                  </Text>
                )}

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: "#000",
                  }}
                >
                  ₹ {item.price.value}
                </Text>
                {
                  // if offer value is present
                  item.price.offer_percent && (
                    <>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: "green",
                          marginHorizontal: 5,
                          // fontWeight: "500",
                        }}
                      >
                        {Math.ceil(item.price.offer_percent)}% off
                      </Text>
                    </>
                  )
                }
              </View>
              <View
                style={{
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Pressable
                  onPress={() => {
                    removeFavorite(item.id as string);
                  }}
                >
                  <MaterialCommunityIcons
                    name="heart"
                    size={24}
                    color="#F13A3A"
                  />
                </Pressable>
                <View style={{ width: 100 }}>
                  <AddToCartButton
                    maxQuantity={item.quantity.maximum.count}
                    storeId={item.vendor_id}
                    itemId={item.id}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FavItems;
