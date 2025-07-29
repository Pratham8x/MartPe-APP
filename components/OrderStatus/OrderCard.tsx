import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import OrderItems from "./OrderItems";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import CostContainer from "./CostContainer";
import { router } from "expo-router";
import { orderStateMap } from "./orderStateMap";

type breakupT = {
  delivery: number | undefined;
  packing: number | undefined;
  convenience: number | undefined;
  discount: number | undefined;
  tax: number | undefined;
};

interface Item {
  id: string;
  price: number;
  quantity: number;
}

const OrderCard = ({ order }) => {
  const [itemsTotal, setItemsTotal] = useState(0);
  const [breakup, setBreakup] = useState<breakupT | null>(null);
  const [newItems, setNewItems] = useState([]);

  console.log("order", JSON.stringify(order));

  useEffect(() => {
    if (order) {
      let newItems: Item[] = [];
      let newItemTotal = 0;
      let delivery = 0;
      let packing = 0;
      let convenience = 0;
      let discount = 0;
      let tax = 0;
      order?.quote?.breakup?.map((item) => {
        if (item.type === "delivery") {
          delivery = Number(item?.price?.value);
        }
        if (item.type === "packing") {
          packing = Number(item?.price?.value);
        }
        if (item.type === "misc") {
          convenience = Number(item?.price?.value);
        }
        if (item.type === "discount") {
          discount = Number(item?.price?.value);
        }
        if (item.type === "tax") {
          tax = Number(item?.price?.value);
        }
        if (item.type === "item") {
          const {
            details: {
              descriptor: { name, symbol },
            },
          } = order.items.find(
            (newItem) => newItem.details.catalog_id === item.id
          );
          let updatedItem = {
            id: item.id,
            details: {
              descriptor: { name, symbol },
            },
            price:
              Number(item.details.price.value) / Number(item.quantity.count),
            quantity: item.quantity.count,
          };
          console.log("updatedItem", updatedItem);
          newItems.push(updatedItem);
          newItemTotal +=
            Number(updatedItem.price) * Number(updatedItem.quantity);
        }
      });

      setItemsTotal(newItemTotal);
      setNewItems(newItems);
      setBreakup(breakup);
    }
  }, []);

  if (!order) {
    return;
  }

  return (
    // !closeCart && (
    <View style={styles.container}>
      {/* seller info container */}
      <View style={styles.sellerInfoContainer}>
        <Image
          source={{ uri: order?.store?.descriptor?.symbol }}
          style={styles.sellerLogo}
        />
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerName}>
            {order?.store?.descriptor?.name}
          </Text>
          {order?.store?.address?.street && (
            <Text style={styles.sellerLocation}>
              {order?.store?.address?.street}
            </Text>
          )}
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#E36E00", fontSize: 10 }}>
              {orderStateMap[order?.order_status.toLowerCase()]?.message}
            </Text>
            {/* <Text
              style={{ color: "#848080", fontSize: 8, marginHorizontal: 4 }}
            >
              {" \u25CF"}
            </Text>
            <Text style={{ color: "#208b3a", fontSize: 10 }}>
              Arriving in 30 mins
            </Text> */}
          </View>
        </View>
      </View>
      {/* cart items */}
      <OrderItems
        items={newItems}
        orderId={order?.id}
        breakup={breakup}
        itemsTotal={itemsTotal}
        grandTotal={order?.quote?.price?.value}
        status={order?.order_status.toLowerCase()}
      />
    </View>
    // )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: 2,
    flex: 1,
    position: "relative",
  },
  sellerInfoContainer: {
    marginBottom: 10,
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#e9ecef",
    paddingBottom: 10,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerLogo: {
    width: 60,
    height: 60,
    // borderRadius: 8,
    marginRight: 16,
    objectFit: "contain",
    borderColor: "#e9ecef",
    borderWidth: 1,
    borderRadius: 10,
  },
  sellerName: {
    fontSize: 16,
    // marginBottom: 1,
    maxWidth: 200,
    fontWeight: "bold",
  },
  sellerLocation: {
    color: "#767582",
    fontSize: 12,
  },
  time: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  closeIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  trackButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FF0000",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF0000",
  },
  trackButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#FFFFFF",
  },
  cancelButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF5151",
  },
  cancelButtonText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#FF0000",
  },
});

export default OrderCard;
