import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useCartStore } from "../../state/useCartStore";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import { DecrementIcon, IncrementIcon } from "../../constants/icons/carticons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const CheckoutItems = ({ storeId, items }) => {
  const { removeItem, updateItem } = useCartStore();
  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      console.log("Updating quantity:", itemId, newQuantity);
      await updateItem(storeId, itemId, newQuantity);
    } catch (error) {
      console.error("Error updating the item quantity", error.message);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (items.length === 1) {
      Alert.alert("Remove Cart", "Are you sure you want to remove this cart?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: async () => {
            try {
              await removeItem(storeId, itemId);
            } catch (error) {
              console.error("Error deleting cart item:", error.message);
            }
          },
        },
      ]);
    } else {
      try {
        await removeItem(storeId, itemId);
      } catch (error) {
        console.error("Error deleting cart item:", error.message);
      }
    }
  };

  const renderItem = ({ item }) => {
    const { itemId, details, quantity, available, log, maxQuantity } = item;
    const {
      descriptor: { name, symbol },
      price: { value, maximum_value },
    } = details;
   
    return (
      <View
        style={[styles.itemContainer, !available && { opacity: 0.6 }]}
        key={itemId}
      >
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
                {Number(value)
                  .toFixed(2)
                  .replace(/\.?0+$/, "")}
              </Text>

              <Text style={styles.itemPriceText}>x {quantity}</Text>
              <Text style={styles.itemTotalCostText}>
                ₹{" "}
                {Number(value * quantity)
                  .toFixed(2)
                  .replace(/\.?0+$/, "")}
              </Text>
            </View>
            {log &&
              log.map((logItem, index) => (
                <Text style={styles.log} key={index}>
                  {logItem}
                </Text>
              ))}
          </View>
        </View>

        {/* quantity container */}

        {available ? (
          <View style={styles.cartItemQuantityContainer}>
            <TouchableOpacity
            // onPress={() => {
            //   quantity > 1
            //     ? handleQuantityChange(itemId, quantity - 1)
            //     : handleDeleteItem(itemId);
            // }}
            >
              <DecrementIcon />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>

            {quantity < maxQuantity ? (
              <TouchableOpacity
              // onPress={() =>
              //   quantity < maxQuantity &&
              //   handleQuantityChange(itemId, quantity + 1)
              // }
              >
                <IncrementIcon />
              </TouchableOpacity>
            ) : (
              <IncrementIcon disabled={true} />
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              handleDeleteItem(itemId);
            }}
          >
            <FontAwesome
              name="trash-o"
              size={20}
              color="red"
              style={{
                padding: 5,
                paddingLeft: 7,
                // paddingHorizontal: 4,
                borderWidth: 1,
                borderColor: "#e9ecef",
                borderRadius: 5,
                alignSelf: "center",
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  if (!items) return null;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.itemsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Items in the cart ({items?.length})</Text>
        </View>
        <View style={{ minHeight: 2, marginBottom: 10 }}>
          <FlashList
            data={items}
            renderItem={renderItem}
            estimatedItemSize={83}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.addMoreContainer}
          onPress={() => {
            router.push(`/(tabs)/home/productListing/${storeId}`);
          }}
        >
          <AntDesign name="plus" size={16} color="black" />
          <Text style={styles.addMoreItemsText}>Add more items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addMoreContainer}>
          <AntDesign name="file-markdown" size={16} color="black" />
          <Text style={styles.addMoreItemsText}>Appy Coupon</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 10,
  },
  title: { paddingVertical: 10, fontWeight: "500", fontSize: 14 },
  itemsContainer: {
    // shadowColor: "rgba(0,0,0,0.5)",
    // elevation: 2,
    backgroundColor: "white",
    borderRadius: 10,
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
  buttons: { flexDirection: "row", marginVertical: 10, gap: 10 },
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
  log: {
    // color: "#FF0000",
    fontSize: 8,
    fontWeight: "500",
    opacity: 0.5,
    marginVertical:2
  },
  closeIcon: {
    // position: "absolute",
    // padding: 5,
    // top: 0,
    // right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CheckoutItems;
