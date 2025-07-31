import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import ProductList3 from "./ProductList3";
import { LinearGradient } from "expo-linear-gradient";
import MenuIcon, { FavIcon } from "../../constants/icons/commonIcons";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import React from "react";
import LikeButton from "../../components/common/likeButton";


interface StoreCard4Props {
  storeData: {
    id: string;
    domain: string;
    catalogs: any[]; // Replace with real type if available
    descriptor: {
      name: string;
      images: string[];
      symbol: string;
    };
    address: {
      street: string;
    };
    geoLocation: {
      lat: number;
      lng: number;
    };
    calculated_max_offer: {
      percent: number;
    };
    distance?: number;
    time_to_ship_in_hours?: {
      avg: number;
    };
  };
  categoryFiltered: any; // Replace `any` with appropriate type
  foodDetails: any;
  handleOpenPress: () => void;
  index: number;
}

const StoreCard4: React.FC<StoreCard4Props> = ({
  storeData,
  categoryFiltered,
  foodDetails,
  handleOpenPress,
  index,
}) => {
  if (!storeData) {
    return null;
  }
  const {
    descriptor: { name, images, symbol },
    domain,
    id,
    catalogs,
    address: { street },
    geoLocation: { lat, lng },
    calculated_max_offer: { percent },
    distance,
    time_to_ship_in_hours,
  } = storeData;

  const { avg: tts_avg } = time_to_ship_in_hours || {};
  const dist_in_km = distance ? distance / 1000 : 0;
  const avg_delivery_speed = 25; // in kmph
  const delivery_time_hrs = Number(dist_in_km / avg_delivery_speed).toFixed(1);
  const total_tts = tts_avg ? tts_avg + delivery_time_hrs : delivery_time_hrs;

  return (
    <TouchableOpacity
      onPress={() => router.push(`../(tabs)/home/productListing/${id}`)}
      style={styles.container}
    >
      <TouchableOpacity style={styles.menu}>
        <MenuIcon />
      </TouchableOpacity>
      <TouchableOpacity style={styles.fav}>
        <LikeButton color="white" vendorId={id} />
      </TouchableOpacity>
      <View>
        <ProductList3
          categoryFiltered={categoryFiltered}
          storeId={id}
          catalogs={catalogs}
          foodDetails={foodDetails}
          handleOpenPress={handleOpenPress}
          index={index}
        />
      </View>
      <View style={styles.storeDetails}>
        <View style={styles.subDetails1}>
          <Text style={styles.brandText}>{name}</Text>
          <Text style={styles.locationText}>{street}</Text>
        </View>
        <View style={styles.subDetails2}>
          <View style={styles.rating}>
            <Text style={{ fontSize: 12, fontWeight: "500" }}>4.2</Text>
            <FontAwesome name="star" size={12} color="#fbbf24" />
          </View>
          {dist_in_km && (
            <Text style={styles.locationText}>
              {Number(dist_in_km).toFixed(1)} Km
            </Text>
          )}

          <LinearGradient
            colors={["#CDF8A2", "white"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.time}
          >
            <MaterialIcons name="access-time" size={14} color="#5CAB7D" />

            <Text style={{ fontSize: 10, color: "#666464" }}>
              {total_tts} hrs
            </Text>
          </LinearGradient>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: "5%",
    marginTop: "5%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 2,
    backgroundColor: "white",
    flexDirection: "column",
    borderRadius: 15,
    shadowRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  storeDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  subDetails1: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
  },
  subDetails2: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
    alignItems: "flex-end",
  },
  brandText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  locationText: {
    fontSize: 10,
    color: "#979393",
  },
  time: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    justifyContent: "flex-end",
    marginTop: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    justifyContent: "flex-end",
    marginTop: 1,
  },

  discountText: {
    fontSize: 8,
    color: "#00BC66",
  },
  menu: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 5,
  },
  fav: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 5,
  },
});

export default StoreCard4;
