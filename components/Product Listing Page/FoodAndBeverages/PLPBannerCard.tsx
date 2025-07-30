import React, { useState } from "react";
import {
  Image,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import PLPBannerAddressDropdown from "./PLPBannerAddressDropdown";
import useDeliveryStore from "../../../state/deliveryAddressStore";
import { router } from "expo-router";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import LikeButton from "../../../components/common/likeButton";
import ShareButton from "../../../components/common/Share";

interface PLPBannerCardProps {
  title: string;
  description: string;
  rating: number;
  address: string;
  deliveryTime: string;
  distance: number;
  delivery: string;
  searchbox?: boolean;
  userAddress: string;
  vendorId: string;
}

const PLPBannerCard: React.FC<PLPBannerCardProps> = ({
  title,
  description,
  rating,
  address,
  deliveryTime,
  distance,
  delivery,
  searchbox,
  userAddress,
  vendorId,
}) => {
  // TODO: Add user address

  return (
    <View
      style={{
        ...styles.PLPBannerCardContainer,
        marginTop: searchbox ? 50 : 125,
        height: searchbox && 80,
      }}
    >
      <Text style={styles.PLPBannerCardTitle}>{title}</Text>
      <Text
        style={{
          ...styles.PLPBannerCardDescription,
          marginBottom: 5,
        }}
      >
        {description.length > 30
          ? description.slice(0, 40) + "..."
          : description}
      </Text>

      {/* horizontal description bar */}
      <View
        style={{
          ...styles.PLPBannerCardContentContainer,
          marginTop: 5,
          ...styles.horizontalBar,
        }}
      >
        {/* rating */}
        <FontAwesome
          name="star"
          size={12}
          color="#fbbf24"
          style={{ marginRight: 3 }}
        />
        <Text style={{ fontSize: 12, fontWeight: "500" }}>{rating}</Text>
        <Text style={{ color: "#848080", fontSize: 12, marginHorizontal: 5 }}>
          {" \u25CF"}
        </Text>
        <MaterialCommunityIcons
          name="clock-time-four"
          size={12}
          color="black"
          style={{ marginRight: 3 }}
        />
        <Text style={{ fontSize: 12, fontWeight: "500" }}>{deliveryTime}</Text>
        <Text style={{ color: "#848080", fontSize: 12, marginHorizontal: 5 }}>
          {" \u25CF"}
        </Text>
        <MaterialIcons
          name="delivery-dining"
          size={16}
          color="black"
          style={{ marginRight: 3 }}
        />
        <Text style={{ fontSize: 12, fontWeight: "500" }}>
          {distance}
          {" km"}
        </Text>
        <Text style={{ color: "#848080", fontSize: 12, marginHorizontal: 5 }}>
          {" \u25CF"}
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "500" }}>{delivery}</Text>
      </View>

      {/* from address */}
      <View style={{ ...styles.PLPBannerCardContentContainer, marginTop: 15 }}>
        <View
          style={{ padding: 3, backgroundColor: "#e8e8e8", borderRadius: 100 }}
        >
          <MaterialIcons name="location-pin" size={14} color="black" />
        </View>
        <Text
          style={{
            fontSize: 12,
            marginLeft: 10,
            lineHeight: 14,
            color: "#848080",
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {address}
        </Text>
      </View>

      {/* to address */}
      <View style={{ ...styles.PLPBannerCardContentContainer, marginTop: 10 }}>
        <View
          style={{ padding: 3, backgroundColor: "#e8e8e8", borderRadius: 100 }}
        >
          <MaterialIcons name="my-location" size={14} color="black" />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => router.push("/address/SavedAddresses")}
          >
            <Text
              style={{
                fontSize: 12,
                marginLeft: 10,
                flex: 1,
                lineHeight: 14,
                color: "#848080",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {userAddress?.length > 0 ? userAddress : "Select location"}
            </Text>

            {/* <Image source={require("../../../assets/dropdownArrow.png")} /> */}
            <Ionicons name="chevron-down" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "flex-end",
        }}
      >
        <LikeButton vendorId={vendorId} />
        <View style={{ marginHorizontal: 5 }}></View>
        <ShareButton
          storeName={title}
          type="outlet"
          incentivise={true}
          storeId={vendorId}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PLPBannerCardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginHorizontal: 15,
    overflow: "hidden",
    padding: 20,
    elevation: 3,
  },
  PLPBannerCardTitle: {
    fontSize: 20,
    fontWeight: "900",
  },
  PLPBannerCardDescription: {
    fontSize: 14,
    color: "#848080",
  },
  horizontalBar: {
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    borderColor: "#C6C6C6",
  },
  PLPBannerCardContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  starImg: {
    width: 15,
    height: 15,
  },
});

export default PLPBannerCard;
