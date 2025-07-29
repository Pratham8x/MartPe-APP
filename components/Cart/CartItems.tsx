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
import { useState } from "react";

const CartItems = ({ cartID, storeId, items }) => {
  const { removeItem, updateItem } = useCartStore();
  const [savings, setSavings] = useState(0);
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

  const renderCartItem = ({ item }) => {
    const { itemId, details, quantity } = item;
    const {
      descriptor: { name, symbol },
      price: { value, maximum_value },
      quantity: {
        maximum: { count: maxCount },
        available: { count: avaliableCount },
      },
    } = details;
    const maxLimit = Math.min(maxCount, avaliableCount);
    let newsavings = savings + (maximum_value - value) * quantity;
    setSavings(newsavings);
    return (
      <View style={styles.itemContainer} key={itemId}>
        {/* item description container */}
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
                {maximum_value > value && (
                  <Text
                    style={[
                      styles.itemPriceText,
                      {
                        textDecorationLine: "line-through",
                        textDecorationStyle: "solid",
                        opacity: 0.5,
                      },
                    ]}
                  >
                    ₹{" "}
                    {Number(maximum_value)
                      .toFixed(2)
                      .replace(/\.?0+$/, "")}
                    {"  "}
                  </Text>
                )}
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
          </View>
        </View>

        {/* quantity container */}
        <View style={styles.cartItemQuantityContainer}>
          <TouchableOpacity
            onPress={() => {
              quantity > 1
                ? handleQuantityChange(itemId, quantity - 1)
                : handleDeleteItem(itemId);
            }}
          >
            <DecrementIcon />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>

          {quantity < maxLimit ? (
            <TouchableOpacity
              onPress={() =>
                quantity < maxLimit &&
                handleQuantityChange(itemId, quantity + 1)
              }
            >
              <IncrementIcon />
            </TouchableOpacity>
          ) : (
            <IncrementIcon disabled={true} />
          )}
        </View>
      </View>
    );
  };

  const calculateTotalCost = () => {
    return items.reduce(
      (total, item) => total + item?.details?.price?.value * item?.quantity,
      0
    );
  };

  return (
    <ScrollView style={styles.container}>
      {items && (
        <View style={styles.itemsContainer}>
          <Text
            style={{ paddingVertical: 10, fontWeight: "500", fontSize: 14 }}
          >
            Items in the cart ({items?.length})
          </Text>
          <View style={{ minHeight: 2, marginBottom: 10 }}>
            <FlashList
              data={items}
              renderItem={renderCartItem}
              estimatedItemSize={83}
            />
          </View>
        </View>
      )}

      {/* all items and total */}
      <View style={styles.priceContainer}>
        <View style={styles.row}>
          <Text style={[styles.text, styles.bold]}>Total</Text>
          <Text style={[styles.text, styles.bold]}>
            ₹ {calculateTotalCost()}
          </Text>
        </View>
        {savings > 0 && (
          <View style={[styles.row]}>
            <Text style={[styles.text]}>
              You are saving ₹
              {Number(savings)
                .toFixed(2)
                .replace(/\.?0+$/, "")}{" "}
              on this order!
            </Text>
          </View>
        )}
      </View>

      {/* buttons */}
      <View style={{ flex: 1, flexDirection: "row", marginVertical: 10 }}>
        {/* add more items button */}
        <TouchableOpacity
          style={styles.addMoreContainer}
          onPress={() => {
            router.push(`/(tabs)/home/productListing/${storeId}`);
          }}
        >
          <AntDesign name="plus" size={16} color="black" />
          <Text style={styles.addMoreItemsText}>Add more items</Text>
        </TouchableOpacity>

        {/* checkout button */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/cart/[checkout]",
                params: { id: cartID },
              })
            }
          >
            <Text style={styles.checkoutButtonText}>Check Out</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 10,
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
  itemTotalCostText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginHorizontal: 15,
  },
 priceContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#666",
  },
  bold: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
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
    marginTop: 5,
    // shadowColor: "rgba(0,0,0,0.5)",
    // elevation: 2,
    // shadowRadius: 5,
    // backgroundColor: "#f8f9fa",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  savingsContainer: {
    flexDirection: "row",
    marginBottom: 5,
    // shadowColor: "rgba(0,0,0,0.5)",
    // elevation: 2,
    // shadowRadius: 5,
    // backgroundColor: "#f8f9fa",
    paddingHorizontal: 10,
    // paddingTop: 10,
    marginHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPriceInfoContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    maxWidth: 200,
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

export default CartItems;
