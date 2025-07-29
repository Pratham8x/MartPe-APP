import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CostContainer from "./CostContainer";

const OrderItems = ({
  items,
  orderId,
  breakup,
  itemsTotal,
  grandTotal,
  showButtons = true,
  status,
}) => {
  console.log("inside orderItems", items);
  const renderItem = ({ item }) => {
    const {
      id,
      details: {
        descriptor: { name, symbol },
      },
      price,
      quantity,
    } = item;

    return (
      <View style={styles.itemContainer} key={id}>
        <View style={styles.itemDescContainer}>
          <View style={styles.itemImgContainer}>
            <Image source={{ uri: symbol }} style={styles.productImage} />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.name} numberOfLines={2}>
              {name}
            </Text>
            <View style={styles.itemPriceInfoContainer}>
              <Text style={styles.itemPriceText}>
                ₹{" "}
                {Number(price)
                  .toFixed(2)
                  .replace(/\.?0+$/, "")}
              </Text>
              <Text style={styles.itemPriceText}>x</Text>
              <Text style={styles.itemPriceText}>{quantity}</Text>
              <Text style={styles.itemTotalCostText}>
                ₹{" "}
                {Number(price * quantity)
                  .toFixed(2)
                  .replace(/\.?0+$/, "")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      {items && (
        <View style={styles.itemsContainer}>
          <Text
            style={{ paddingVertical: 10, fontWeight: "500", fontSize: 14 }}
          >
            Items in the order ({items?.length})
          </Text>
          <View style={{ minHeight: 2, marginBottom: 10 }}>
            <FlashList
              data={items}
              renderItem={renderItem}
              estimatedItemSize={83}
            />
          </View>
        </View>
      )}
      {/* all items and total */}
      {/* <View style={styles.itemsTotalContainer}>
        <Text style={styles.itemsTotalText}>Total:</Text>
        <Text style={styles.itemsTotalCostText}>₹ {calculateTotalCost()}</Text>
      </View> */}
      <CostContainer
        breakup={breakup}
        itemsTotal={itemsTotal}
        grandTotal={grandTotal}
      />
      {showButtons && (
        <View style={{ flex: 1, flexDirection: "row", marginVertical: 10 }}>
          {/* add more items button */}
          <TouchableOpacity
            style={styles.addMoreContainer}
            onPress={() => {
              status === "completed" || status === "cancelled"
                ? router.push("/(tabs)/support")
                : router.push({
                    pathname: "/(tabs)/orders/cancel/[cancel]",
                    params: { id: orderId },
                  });
            }}
          >
            {/* <AntDesign name="plus" size={16} color="black" /> */}
            <Text style={styles.addMoreItemsText}>
              {status === "completed" || status === "cancelled"
                ? "Help & Support"
                : "Cancel Order"}
            </Text>
          </TouchableOpacity>

          {/* checkout button */}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/orders/[order]",
                  params: { id: orderId },
                })
              }
            >
              <Text style={styles.checkoutButtonText}>
                {status === "completed" || status === "cancelled"
                  ? "View Details"
                  : "Track Order"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    marginHorizontal: 10,
    fontWeight: "500",
  },
  horizontalBar: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },
  itemsContainer: {
    // shadowColor: "rgba(0,0,0,0.5)",
    // elevation: 2,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    // zIndex: 5,
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  itemDescContainer: {
    flexDirection: "row",
    flex: 3,
    alignItems: "center",
  },
  itemImgContainer: {
    // shadowColor: "rgba(0,0,0,0.5)",
    // elevation: 5,
    // borderWidth: 1,
    // borderColor: "#e9ecef",
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  productImage: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    width: 50,
    height: 50,
    borderRadius: 8,
    objectFit: "contain",
  },
  itemDetails: {
    justifyContent: "center",
    maxWidth: 100,
  },
  name: {
    fontSize: 14,
  },
  itemPriceText: {
    fontSize: 12,
    color: "#666",
    marginRight: 10,
  },
  cartItemQuantityContainer: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: "500",
    color: "#00BC66",
  },
  totalItemCostContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  itemsTotalCostText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  itemTotalCostText: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
  },
  addMoreContainer: {
    flex: 1,
    flexDirection: "row",
    // marginVertical: 12,
    // shadowColor: "rgba(0,0,0,0.5)",
    // elevation: 2,
    // shadowRadius: 5,
    // backgroundColor: "#f8f9fa",
    backgroundColor: "#e8e8e8",
    borderRadius: 50,
    paddingVertical: 12,
    // paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  itemsTotalContainer: {
    borderTopWidth: 1,
    borderColor: "#e9ecef",
    flexDirection: "row",
    marginVertical: 5,
    // shadowColor: "rgba(0,0,0,0.5)",
    // elevation: 2,
    // shadowRadius: 5,
    // backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPriceInfoContainer: {
    flex: 1,
    flexDirection: "row",
  },
  // addMoreContainers: {
  //   flexDirection: "column",
  //   marginVertical: 12,
  //   shadowColor: "rgba(0,0,0,0.5)",
  //   elevation: 5,
  //   shadowRadius: 5,
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   padding: 15,
  //   margin: 5,
  //   justifyContent: "space-between",
  //   alignItems: "center",
  // },
  addMoreItemsText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
    paddingLeft: 5,
  },
  moreItemsText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  total: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 5,
  },
  itemsTotalText: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailsContainer: {
    paddingVertical: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  showMoreButton: {
    alignItems: "center",
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalScrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
  },
  closeModalButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // gap: 10,
    // marginTop: 20,
  },
  checkoutButton: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#208b3a",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#208b3a",
    width: "100%",
  },
  checkoutButtonText: {
    fontWeight: "900",
    fontSize: 14,
    color: "#fff",
  },
});

export default OrderItems;
