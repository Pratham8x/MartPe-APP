import ImageComp from "../../components/common/ImageComp";
import AddToCartButton from "../../components/search/AddToCartButton";
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
import { router } from "expo-router";
interface FavOutletsProps {
  itemsData: any;
}

const FavOutlets: FC<FavOutletsProps> = ({ itemsData }) => {
  const { removeVendorFavorite } = useFavoriteStore();
  return (
    <ScrollView
      style={{ marginBottom: Dimensions.get("screen").width * 0.2 }}
      showsVerticalScrollIndicator={false}
    >
      {[...itemsData].reverse().map((store: any, index: number) => {
        return (
          <TouchableOpacity
            onPress={() => {
              router.push(`./(tabs)/home/productListing/${store.id}`);
            }}
            key={index}
            style={{
              flexDirection: "row",
              // marginHorizontal: Dimensions.get("screen").width * 0.04,
              marginTop: Dimensions.get("screen").width * 0.05,
              // backgroundColor: "white",
              borderColor: "black",
              // borderWidth: 1,
              justifyContent: "flex-start",
              paddingHorizontal: Dimensions.get("screen").width * 0.03,
              paddingVertical: Dimensions.get("screen").width * 0.03,
              borderRadius: 12,
              alignItems: "center",
              backgroundColor: "#F5F7F8",
            }}
          >
            <View>
              <ImageComp
                source={ store?.descriptor?.symbol }
                imageStyle={{
                  aspectRatio: 1,
                  height: 60,
                  // width: 50,
                  borderRadius: 100,
                }}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                marginHorizontal: Dimensions.get("screen").width * 0.03,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#3D3B40",
                }}
              >
                {store?.descriptor?.name}
              </Text>
              <View style={{ flexDirection: "row", marginVertical: 4 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 20,
                  }}
                >
                  <MaterialCommunityIcons
                    name="star"
                    size={18}
                    color="#FFD523"
                  />
                  <Text style={{ fontSize: 14, fontWeight: "400" }}>4.2</Text>
                  {Math.ceil(store?.calculated_max_offer?.percent) > 0 ? (
                    <Text
                      style={{
                        color: "#00BC66",
                        fontSize: 14,
                        fontWeight: "500",
                        marginHorizontal: 10,
                      }}
                    >
                      Upto {Math.ceil(store?.calculated_max_offer?.percent)}%
                      Off
                    </Text>
                  ) : null}
                </View>
              </View>

              <View style={{ flexDirection: "column" }}>
                <Text
                  style={{
                    color: "#3D3B40",
                    fontWeight: "500",
                    fontSize: 13,
                  }}
                >
                  <MaterialCommunityIcons name="map-marker" />
                  {store?.address?.locality}, {store?.address?.state}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "80%",
                  }}
                >
                  {store?.panIndia ? (
                    <Text
                      style={{
                        marginVertical: 4,
                        color: "#73777B",
                        fontSize: 13,
                      }}
                    >
                      <MaterialCommunityIcons name="truck" /> Delivers Across
                      India
                    </Text>
                  ) : (
                    <Text
                      style={{
                        marginVertical: 4,
                        color: "#73777B",
                        fontSize: 13,
                      }}
                    >
                      <MaterialCommunityIcons name="truck" /> Delivers within{" "}
                      {store?.address?.city}
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      removeVendorFavorite(store.id as string);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="heart"
                      size={24}
                      color="#F13A3A"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FavOutlets;
