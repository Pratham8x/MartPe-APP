import { BackArrow } from "../../constants/icons/tabIcons";
import { router } from "expo-router";
import React from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

const wishlistHeading = "Favorites";

const HeaderWishlist = () => {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        width: widthPercentageToDP(100),
        alignItems: "center",
        paddingVertical: Dimensions.get("window").width * 0.03,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          left: Dimensions.get("window").width * 0.05,
        }}
        onPress={() => {
          router.back();
        }}
      >
        <BackArrow />
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#000" }}>
        {wishlistHeading.toUpperCase()}
      </Text>
    </View>
  );
};

export default HeaderWishlist;
