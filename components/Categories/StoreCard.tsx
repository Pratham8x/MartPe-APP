import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import ProductList from "./ProductList";
import { router } from "expo-router";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const StoreCard = ({ storeData, categoryFiltered }) => {
  if (!storeData) {
    return null;
  } else {
    console.log("store data:", storeData);
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

  return (
    <View style={{ height: 390 }}>
      {/* store info */}
      <View style={styles.containerWrapper}>
        <TouchableOpacity
          onPress={() => router.push(`/(tabs)/home/productListing/${id}`)}
          style={styles.container}
        >
          <View style={styles.header}>
            {/* store logo */}
            <View style={styles.logoContainer}>
              <Image source={{ uri: symbol }} style={styles.logoImage} />
            </View>
            {/* store details */}
            <View style={styles.details}>
              <View style={styles.subDetails}>
                <Text style={styles.brandText}>{name}</Text>
                <Text style={styles.locationText}>{street} | 0.5 Km</Text>
                {percent > 1 && (
                  <Text style={styles.discountText}>
                    {/* <Image source={require("../../assets/discount.png")} /> */}
                    Upto {percent}% Off
                  </Text>
                )}
              </View>
              <View style={styles.subDetails}>
                <View style={styles.time}>
                  <MaterialIcons name="access-time" size={15} color="black" />
                  <Text style={{ fontSize: 12 }}>5 min</Text>
                </View>
                <View style={styles.rating}>
                  <Text style={{ fontSize: 12, fontWeight: "500" }}>4.2</Text>
                  <FontAwesome name="star" size={12} color="#fbbf24" />
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {/* store products info */}
      <View style={styles.productContainer}>
        <ProductList
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
    marginVertical: 30,
    zIndex: 1,
  },
  container: {
    // height: auto,
    // marginHorizontal: 20,
    // display: "flex",
    // borderRadius: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    // shadowRadius: 20,
    elevation: 2,
    backgroundColor: "white",
    height: 340,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  details: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    padding: 5,
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
  logoContainer: {
    width: 130,
    height: 100,
    top: -20, // +10,
    // left: 25,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#EEEEEE",
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.1,
    // shadowRadius: 20,
    elevation: 2,
    // position: "relative",
    backgroundColor: "white",
    zIndex: 2,
    marginLeft: 8,
    overflow: "hidden",
  },
  logoImage: {
    flex: 1,
    // resizeMode: "contain",
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  logoIcons: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
  },
  productContainer: {
    //   position: "absolute",
    top: -280,
    zIndex: 2,
    backgroundColor: "#f8f7f390",
  },
});

export default StoreCard;
