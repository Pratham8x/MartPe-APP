import { View, StyleSheet, Image, Text, Pressable } from "react-native";
import ProductList2 from "./ProductList2";
import { router } from "expo-router";

const data = [
  {
    id: "1",
    image: require("../../assets/shirt.png"),
    discountPercent: "50%",
    title: "Stormborn",
    desc: "Pure Cotton T-shirt",
    originalPrice: "₹60",
    discountedPrice: "₹57",
  },
  {
    id: "2",
    image: require("../../assets/shirt.png"),
    discountPercent: "50%",
    title: "Stormborn",
    desc: "Pure Cotton T-shirt",
    originalPrice: "₹60",
    discountedPrice: "₹57",
  },
  {
    id: "3",
    image: require("../../assets/shirt.png"),
    discountPercent: "50%",
    title: "Stormborn",
    desc: "Pure Cotton T-shirt",
    originalPrice: "₹60",
    discountedPrice: "₹57",
  },
  // Add more data items as needed
];

const StoreCard2 = ({ storeData, categoryFiltered }) => {
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

  return (
    <View style={{ height: 300, marginVertical: 20 }}>
      <View style={styles.containerWrapper}>
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              router.push(`/(tabs)/home/productListing/${id}`);
            }}
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
                  <Text style={styles.locationText}>{street} . 0.5 Km</Text>
                  {/* <View style={{flexDirection:'row'}}>
                    <Text style={{ fontSize: 10 }}>4.2</Text>
                    <Image source={require("../../assets/star.png")} />
                  </View> */}
                </View>
              </View>
              <View style={styles.subDetails}>
                <View style={styles.logoIcons}>
                  <Image source={require("../../assets/heart-blue.png")} />
                  <Image source={require("../../assets/more-vertical2.png")} />
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.productContainer}>
        <ProductList2 storeId={id} catalogs={catalogs} />
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
    backgroundColor: "#E9FDFD",
    height: 310,
  },
  header: {
    display: "flex",
    flexDirection: "row",
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
  subText: {
    display: "flex",
    flexDirection: "column",
  },
  locationText: {
    fontSize: 10,
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
    gap: 3,
  },
  discountText: {
    fontSize: 8,
    color: "#00BC66",
  },
  logoContainer: {
    zIndex: 2,
    width: 150,
    height: 50,
    overflow: "hidden",
  },
  logoImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  logoIcons: {
    flex: 1,
    flexDirection: "row",
  },
  productContainer: {
    top: -235,
    zIndex: 2,
  },
});

export default StoreCard2;
