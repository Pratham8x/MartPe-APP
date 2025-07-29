import React, { useEffect, useRef, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import { BackArrow } from "../../../constants/icons/commonIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOrderStore } from "../../../state/useOrderStore";
import { MaterialIcons } from "@expo/vector-icons";
import VerticalStepIndicator from "../../../components/OrderStatus/VerticalStepIndicator";
import { Rating } from "react-native-ratings";
import OrderItems from "../../../components/OrderStatus/OrderItems";
import { orderStateMap } from "../../../components/OrderStatus/orderStateMap";
import { getUserDetails } from "../../../hook/useUserDetails";
//import { DotIndicator } from 'react-native-indicators';
import { stat } from "fs";

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

const status_ws_url = "wss://api-sandbox.martpe.in/api/v1/user/status";

const Order = () => {
  const { id } = useLocalSearchParams();
  const order = useOrderStore((state) => state.allOrders).find(
    (order) => order.id === id
  );
  const [itemsTotal, setItemsTotal] = useState(0);
  const [breakup, setBreakup] = useState<breakupT | null>(null);
  const [newItems, setNewItems] = useState([]);
  const [status, setStatus] = useState(order?.order_status.toLowerCase());
  const [fulfillments, setFulfillments] = useState(order?.fulfillments);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatus = async () => {
    try {
      setIsLoading(true);
      const { userId } = JSON.parse(await getUserDetails());
      console.log(`userId: ${userId}`);
      const statusCallBody = {
        message: {
          userId: userId,
          orderId: id,
        },
      };
      console.log("inside handleStatus - statusCallBody: ", statusCallBody);
      const ws = new WebSocket(status_ws_url);
      console.log("inside handleStatus web socket");
      ws.onopen = () => {
        console.log("Connection Established!");
        ws.send(JSON.stringify(statusCallBody));
      };

      ws.onmessage = (event: WebSocketMessageEvent) => {
        const response = JSON.parse(event.data);
        console.log("status response", JSON.stringify(response));
        if (response?.data) {
          setStatus(response?.data?.order_status.toLowerCase());
          setFulfillments(response?.data?.fulfillments);
          setIsLoading(false);
          if (response.data.error) {
            Alert.alert(
              "Sorry, cannot update status right now :(",
              `${response.error}`,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                  onPress: () => {
                    router.back();
                  },
                },
              ]
            );
          }
          console.log(
            "inside handleStatus web socket onmessage",
            response.data
          );

          ws.close();
        }

        if (response.error) {
          Alert.alert(
            "Sorry, cannot update status right now :(",
            `${response.error}`,
            [
              {
                text: "Cancel",
                style: "cancel",
                onPress: () => {
                  router.back();
                },
              },
            ]
          );

          ws.close();
        }
      };

      ws.onclose = () => {
        console.log("Connection Closed!");
        setIsLoading(false);
      };

      ws.onerror = (e: any) => {
        console.log("WS Error", e);
        ws.close();
      };
    } catch (error) {
      console.log(error);
    }
  };

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

  const router = useRouter();
  console.log("order", JSON.stringify(order));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <TouchableOpacity style={styles.backIcon}>
            <BackArrow
              onPress={() => {
                router.back();
              }}
            />
          </TouchableOpacity>
          <Text style={styles.titleText}>Order Details</Text>
        </View>
        {!(status === "cancelled" || status === "completed") && (
          <TouchableOpacity
            style={styles.refreshButtonIcon}
            onPress={handleStatus}
          >
            <MaterialIcons
              {...({
                name: "update",
                color: "#000",
                size: 25,
              } as any)}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.orderDetails}>
        <ScrollView>
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
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
              >
                <Text style={{ color: "#208b3a", fontSize: 10 }}>
                  {orderStateMap[order?.order_status.toLowerCase()]?.message}{" "}
                </Text>
                {(order?.order_status.toLowerCase() === "created" ||
                  order?.order_status.toLowerCase() === "accepted") && (
                  <Text style={{ fontSize: 10 }}>
                    on {order?.placed_at?.slice(0, 10)}
                  </Text>
                )}
                {order?.order_status.toLowerCase() === "completed" && (
                  <Text style={{ fontSize: 10 }}>
                    on {order?.completed_at?.slice(0, 10)}
                  </Text>
                )}
                {order?.order_status.toLowerCase() === "cancelled" && (
                  <Text style={{ fontSize: 12 }}>
                    on {order?.cancelled_at?.slice(0, 10)}
                  </Text>
                )}
                {/* {order?.order_status.toLowerCase() === "in-progress" && (
                <Text
                style={{ color: "#848080", fontSize: 8, marginHorizontal: 4 }}
                >
                  {" \u25CF"}
                  </Text>
              )} */}

                {/* <Text
                style={{
                  color: "#848080",
                  fontSize: 8,
                  marginHorizontal: 4,
                }}
              >
              {" \u25CF"}
              </Text>
              <Text style={{ fontSize: 12 }}>10:30 AM</Text> */}
              </View>
            </View>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              {/* <View style={styles.titleContainer}>
            <Text style={styles.title}>Contacting the seller..</Text>
          </View> */}
              <DotIndicator color="black" size={8} />
            </View>
          ) : status === "cancelled" ? (
            <View
              style={{
                marginVertical: 20,
                flexDirection: "column",
              }}
            >
              <Text style={{ fontSize: 12, color: "#F13A3A" }}>
                This order has been cancelled by{" "}
                {order.cancellation.cancelled_by}.
              </Text>

              <Text style={{ fontSize: 12, color: "#666", marginTop: 5 }}>
                <Text style={{ fontWeight: "600" }}>
                  You cancelled this order. Why?
                </Text>
              </Text>
              <Text style={{ fontSize: 12, color: "#666" }}>
                {order.cancellation.reason.reason}
              </Text>
            </View>
          ) : (
            <VerticalStepIndicator
              status={status}
              fulfillments={fulfillments}
              placed_at={order?.placed_at}
              completed_at={order?.completed_at}
              cancelled_at={order?.cancelled_at}
            />
          )}
          <OrderItems
            items={newItems}
            orderId={order?.id}
            breakup={breakup}
            itemsTotal={itemsTotal}
            grandTotal={order?.quote?.price?.value}
            showButtons={false}
            status={order?.order_status.toLowerCase()}
          />
        </ScrollView>
        <View style={styles.ratingContainer}>
          <Text style={{ fontSize: 14 }}>Rate your order:</Text>
          <Rating
            // showRating
            type="custom"
            ratingColor="#F13A3A"
            ratingBackgroundColor="#c8c7c8"
            // fractions={2}
            tintColor="white"
            // style={{  gap: 10 }}
            ratingTextColor="#000"
            imageSize={22}
            startingValue={3}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.addMoreButton}
            onPress={() => {
              router.push(` /(tabs)/support`);
            }}
          >
            {/* <AntDesign name="plus" size={16} color="black" /> */}
            <Text style={styles.addMoreItemsText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Invoice</Text>
            <MaterialIcons
              {...({
                name: "file-download",
                color: "#fff",
                size: 14,
              } as any)}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgba(251, 238, 238, 0.5)",
    backgroundColor: "white",
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  backIcon: {
    paddingHorizontal: 15,
  },
  title: {
    backgroundColor: "white",

    flexDirection: "row",
    alignItems: "center",
    // gap: 10,
  },
  titleText: { fontSize: 20, fontWeight: "bold" },
  refreshButton: {},
  refreshButtonIcon: {
    // elevation: 2,
    marginRight: 10,
    backgroundColor: "white",
    // backgroundColor: "#e8e8e8",
    // padding: 8,
    // borderColor: "#999999",
    // borderWidth: 0.2,
    // borderRadius: 10,
  },
  orderDetails: {
    flex: 1,
    // height: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderColor: "#e9ecef",
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "space-between",
    // borderWidth: 0.2,
    // borderColor: "rgba(0,0,0,0.)",
  },
  sellerInfoContainer: {
    flexDirection: "row",
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
    fontSize: 12,
    maxWidth: 200,
    fontWeight: "500",
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

  loadingContainer: {
    backgroundColor: "white",
    padding: 15,
    margin: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderColor: "#e9ecef",
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 15,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    // gap: 10,
    // marginTop: 20,
  },
  addMoreButton: {
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
    marginHorizontal: 5,
    justifyContent: "center",
    alignSelf: "center",
  },
  addMoreItemsText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "500",
    paddingLeft: 5,
  },
  checkoutButton: {
    flex: 1,
    flexDirection: "row",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    // paddingHorizontal: 10,
    marginHorizontal: 5,
    alignSelf: "center",
    backgroundColor: "#208b3a",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#208b3a",
    gap: 5,
  },
  checkoutButtonText: {
    fontWeight: "600",
    fontSize: 12,
    color: "#FFFFFF",
  },
});
export default Order;
