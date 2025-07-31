import DynamicButton from "../../components/common/DynamicButton";
import ImageComp from "../../components/common/ImageComp";
import React, { FC } from "react";
import { View, Text, Dimensions, StyleSheet, Pressable } from "react-native";
import AddToCart from "./AddToCart";
import { FontAwesome } from "@expo/vector-icons";
import LikeButton from "../../components/common/likeButton";
interface FoodDetailsProps {
  foodDetails: {
    images: string;
    long_desc: string;
    name: string;
    short_desc: string;
    symbol: string;
    price: string;
    storeId: string;
    maxQuantity: number;
    itemId: string;
    visible: boolean;
    discount: number;
    maxPrice: number;
  };
  closeFilter: () => void;
}

const FoodDetailsComponent: FC<FoodDetailsProps> = ({
  foodDetails,
  closeFilter,
}) => {
  return (
    <View style={styles.contentContainer}>
      <ImageComp
        source={
            (foodDetails?.images && foodDetails.images[0]) ||
            "https://www.foodiesfeed.com/wp-content/uploads/2019/04/mae-mu-oranges-ice-915x1372.jpg"}
        imageStyle={{
          height: Dimensions.get("screen").height * 0.3,
          width: Dimensions.get("screen").width * 0.9,
          borderRadius: 10,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "#323A3E",
            textAlign: "left",
            fontWeight: "700",
            marginVertical: Dimensions.get("screen").width * 0.03,
          }}
        >
          {foodDetails.name}
        </Text>
        <LikeButton productId={foodDetails.itemId} />
      </View>

      <Text>
        <Text
          style={{
            fontSize: 16,
            color: "#323A3E",
            textAlign: "left",
            fontWeight: "400",
          }}
        >
          {foodDetails.symbol}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: "#323A3E",
            textAlign: "left",
            fontWeight: "600",
            paddingVertical: Dimensions.get("screen").width * 0.2,
          }}
        >
          ₹ {foodDetails.price}
        </Text>
      </Text>
      {/* rating area  */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome name="star" size={16} color="#FFD700" />
        <Text style={{ marginLeft: 5 }}>4.2</Text>
      </View>
      <Text
        style={{
          fontSize: 16,
          color: "#323A3E",
          textAlign: "left",
          fontWeight: "400",
        }}
      >
        {foodDetails.short_desc}
      </Text>
      <View style={styles.stickyFooter}>
        <AddToCart
          price={Number(foodDetails.price)}
          storeId={foodDetails.storeId}
          maxLimit={foodDetails.maxQuantity}
          itemId={foodDetails.itemId}
        />
      </View>
    </View>
  );
};

export default FoodDetailsComponent;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,

    // marginTop: -30,
    paddingHorizontal: Dimensions.get("screen").width * 0.05,
    width: "100%",
  },
  stickyFooter: {
    position: "absolute",
    marginHorizontal: Dimensions.get("screen").width * 0.05,
    bottom: 10,
    width: "100%",
  },
});
