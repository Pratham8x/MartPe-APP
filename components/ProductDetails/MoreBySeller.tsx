import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ImageComp from "../common/ImageComp";
import { Discount } from "./SVG";
import { router } from "expo-router";
const { width, height } = Dimensions.get("window");
const snapInterval = width * 0.72;
interface SellerDetailsProps {
  sellerName: string;
  sellerDetails: string;
  sellerSymbol: string;
  sellerContact: string;
  products: [];
  originalId: string;
}

const MoreBySeller: FC<SellerDetailsProps> = ({ products, originalId }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>More By Seller</Text>
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={snapInterval} // Set the calculated snap interval
          decelerationRate="fast"
        >
          {products.map((product, index) => (
            <View key={index} style={{ paddingVertical: 10 }}>
              {product?.id !== originalId && (
                <TouchableOpacity
                  onPress={() => {
                    router.push(`/(tabs)/home/productDetails/${product.id}`);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    borderWidth: 0,
                    borderColor: "#BBC8D1",
                    borderRadius: 10,
                    width: width * 0.35,
                    elevation: 2,
                    marginHorizontal: width * 0.02,
                  }}
                >
                  {product?.price?.offer_percent > 0 && (
                    <View
                      style={{
                        backgroundColor: "#F13A3A",
                        width: width * 0.2,
                        borderBottomEndRadius: 50,
                        borderTopRightRadius: 50,
                        flexDirection: "row",
                        gap: 10,
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                        marginTop: 10,
                      }}
                    >
                      <Discount />
                      <Text style={{ color: "white", fontWeight: "400" }}>
                        {Math.ceil(product?.price?.offer_percent)}
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      borderColor: "#ACAAAA",
                      flexDirection: "row",
                      justifyContent: "center",
                      marginVertical: width * 0.03,
                    }}
                  >
                    <ImageComp
                      source={{
                        uri:
                          product?.descriptor?.images &&
                          product?.descriptor.images[0],
                      }}
                      imageStyle={{ height: 100, width: 100, borderRadius: 10 }}
                      resizeMode="contain"
                    />
                  </View>

                  <View style={{ marginVertical: width * 0.03 }}>
                    <Text style={{ fontWeight: "500", marginHorizontal: 10 }}>
                      {product.descriptor.name.length > 5
                        ? product.descriptor.name.slice(0, 15) + "..."
                        : product.descriptor.name}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",

                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                      }}
                    ></View>

                    <View style={{ flexDirection: "row", marginLeft: 10 }}>
                      <Text style={{ color: "black", fontSize: 12 }}>
                        ₹{Math.ceil(product?.price?.value)}
                      </Text>

                      {product.price?.offer_percent && (
                        <>
                          <Text
                            style={{
                              textDecorationLine: "line-through",
                              fontSize: 12,
                              color: "#B8B4B4",
                              marginHorizontal: 8,
                            }}
                          >
                            ₹{Math.ceil(product?.price?.maximum_value)}
                          </Text>
                          <Text style={{ color: "#00BC66", fontSize: 12 }}>
                            {Math.ceil(product.price?.offer_percent)} % off
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default MoreBySeller;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f7f3",
    flexDirection: "column",
    justifyContent: "space-between",

    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    paddingVertical: width * 0.07,
    // marginLeft: width * 0.05,
    // elevation: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginVertical: width * 0.05,
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
    fontWeight: "900",
    color: "#333",
    marginVertical: width * 0.02,
  },
  details: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#000",
    flexDirection: "column",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#607480",
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
