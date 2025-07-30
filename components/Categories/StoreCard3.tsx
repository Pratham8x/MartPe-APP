import React from "react";
import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import ProductList2 from "./ProductList2";
import { router } from "expo-router";
import LikeButton from "../../components/common/likeButton";

const StoreCard3 = ({ storeData, color, categoryFiltered }) => {
  if (!storeData) {
    return null;
  } else {
    console.log(storeData);
  }
  const {
    descriptor: { name, images, symbol },
    domain,
    id,
    catalogs,
    address: { street },
    geoLocation: { lat, lng },
    calculated_max_offer: { percent },
  } = storeData;
  const heartImages = {
    red: require("../../assets/heart-red.png"),
    yellow: require("../../assets/heart-yellow.png"),
  };
  const backgroundColors = {
    red: "#FFF6F6",
    yellow: "#FFFBEF",
  };

  return (
    <View style={{ height: 300, marginTop: 50 }}>
      <View style={styles.containerWrapper}>
        <View
          style={[
            styles.container,
            { backgroundColor: backgroundColors[color] },
          ]}
        >
          <Pressable
            onPress={() => router.push(`/(tabs)/home/productListing/${id}`)}
            style={styles.header}
          >
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: symbol }}
                // source={require("../../assets/patanjali.png")}
                style={styles.logoImage}
              />
            </View>
            <View style={styles.details}>
              <View style={styles.subDetails}>
                <Text style={styles.brandText}>{name}</Text>
                <View style={styles.subText}>
                  <Text style={styles.locationText}>
                    {street} | <Text style={{ fontSize: 10 }}>4.2</Text>
                    <Image source={require("../../assets/star.png")} /> | 0.5 Km
                  </Text>
                </View>
              </View>
              <View style={styles.subDetails}>
                <View style={styles.logoIcons}>
                  <LikeButton color="gray" vendorId={id} />
                  <Image source={require("../../assets/more-vertical2.png")} />
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.productContainer}>
        <ProductList2
          categoryFiltered={categoryFiltered}
          storeId={id}
          catalogs={catalogs}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    zIndex: 1,
  },
  container: {
    marginHorizontal: 16,
    backgroundColor: "#FFF6F6",
    height: 295,
  },
  header: {
    display: "flex",
    flexDirection: "row",
  },
  details: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    justifyContent: "space-between",
  },
  subDetails: {
    display: "flex",
    flexDirection: "column",
    padding: 5,
  },
  brandText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
  subText: {
    display: "flex",
    flexDirection: "row",
  },
  locationText: {
    fontSize: 10,
  },
  rating: {
    flexDirection: "row",
    gap: 3,
  },
  logoContainer: {
    width: 110,
    height: 70,
    top: -25,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: "white",
    zIndex: 2,
    marginLeft: 8,
    overflow: "hidden",
  },
  logoImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  logoIcons: {
    flex: 1,
    flexDirection: "row",
  },
  productContainer: {
    top: -230,
    zIndex: 2,
  },
});

export default StoreCard3;
