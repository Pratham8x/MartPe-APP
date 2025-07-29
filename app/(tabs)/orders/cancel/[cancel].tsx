import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";

import { BackArrow } from "../../../../constants/icons/commonIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useOrderStore } from "../../../../state/useOrderStore";
import { orderStateMap } from "../../../../components/OrderStatus/orderStateMap";
import { getUserDetails } from "../../../../hook/useUserDetails";
import { DotIndicator } from "react-native-indicators";
import RadioGroup from "react-native-radio-buttons-group";
import { getAllReasonCodes } from "../../../../gql/api/order";
import { RadioButton } from "react-native-paper";

const cancel_ws_url = "wss://api-sandbox.martpe.in/api/v1/user/cancel";

const Cancel = () => {
  const { id } = useLocalSearchParams();
  const order = useOrderStore((state) => state.allOrders).find(
    (order) => order.id === id
  );
  const getReasonCodes = async () => {
    try {
      const reasonCodes = await getAllReasonCodes();
      setReasonCodes(
        reasonCodes?.getAllReasonCodes.map((reasonCode) => {
          const { code, reason } = reasonCode;
          return {
            label: reason,
            value: code,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching all orders:", error);
    }
  };

  const [status, setStatus] = useState(order?.order_status.toLowerCase());
  const [fulfillments, setFulfillments] = useState(order?.fulfillments);
  const [reasonCodes, setReasonCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const message =
    "This order can be cancelled before it is shipped by the seller";

  useEffect(() => {
    getReasonCodes();
  }, []);

  const handleCancel = async () => {
    if (code === "") {
      Alert.alert("Please select a reason for cancellation");
      return;
    }
    try {
      setIsLoading(true);
      const { userId } = JSON.parse(await getUserDetails());
      console.log(`userId: ${userId}`);
      const cancelCallBody = {
        message: {
          cancellationReasonCode: code,
          userId: userId,
          orderId: id,
        },
      };
      console.log("inside handleCancel - cancelCallBody: ", cancelCallBody);
      const ws = new WebSocket(cancel_ws_url);
      console.log("inside handleCancel web socket");
      ws.onopen = () => {
        console.log("Connection Established!");
        ws.send(JSON.stringify(cancelCallBody));
      };

      ws.onmessage = (event: WebSocketMessageEvent) => {
        const response = JSON.parse(event.data);
        console.log("status response", JSON.stringify(response));
        if (response?.data) {
          setStatus(response?.data?.order_status);
          setFulfillments(response?.data?.fulfillments);
          setIsLoading(false);
          if (response.data.error) {
            Alert.alert("Order cancellation failed!", `${response.error}`, [
              {
                text: "Ok",
                style: "cancel",
                onPress: () => {
                  router.back();
                },
              },
            ]);
          }
          console.log(
            "inside handleCancel web socket onmessage",
            response.data
          );

          ws.close();
        }

        if (response.error) {
          Alert.alert("Order cancellation failed!", `${response.error}`, [
            {
              text: "ok",
              style: "cancel",
              onPress: () => {
                router.back();
              },
            },
          ]);

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

  if (!order) {
    return;
  }

  const router = useRouter();
  console.log("order", JSON.stringify(order));
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <BackArrow
            onPress={() => {
              router.back();
            }}
          />
          <Text style={styles.titleText}>Order Cancellation</Text>
        </View>
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
              </View>
            </View>
          </View>
          <View>
            <View style={styles.rowTitleContainer}>
              <Text style={styles.rowTitleText}>Cancellation Policy</Text>
              <TouchableOpacity>
                <Text style={styles.viewMoreButtonText}>VIEW POLICY</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <Text style={styles.value}>{message}</Text>
            </View>
          </View>
          <View>
            <View style={styles.rowTitleContainer}>
              <Text style={styles.rowTitleText}>Reason for Cancellation</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.value}>
                Please tell us correct reason for cancellation. This information
                is only used to improve our service
              </Text>
            </View>
            <View style={styles.radioGroup}>
              {/* <RadioGroup
                radioButtons={reasonCodes}
                onPress={setCode}
                code={code}
              /> */}
              <RadioButton.Group
                onValueChange={(value) => {
                  setCode(value);
                  console.log(value);
                }}
                value={code}
              >
                {reasonCodes.map((reasonCode, index) => (
                  <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                    key={index}
                  >
                    <RadioButton value={reasonCode.value} color="green" />
                    <Text style={styles.label}>{reasonCode.label}</Text>
                  </View>
                ))}
              </RadioButton.Group>
            </View>
          </View>
        </ScrollView>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <DotIndicator color="black" size={8} />
          </View>
        ) : (
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

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCancel}
            >
              <Text style={styles.checkoutButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
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
  titleContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  titleText: { fontSize: 20, fontWeight: "bold" },
  header: {
    backgroundColor: "white",
  },
  orderDetails: {
    flex: 1,
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
  viewMoreButtonText: {
    color: "#F13A3A",
    fontSize: 12,
    fontWeight: "500",
    paddingTop: 10,
  },
  rowTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderTopWidth: 0.2,
    borderColor: "#666",
    marginTop: 20,
    justifyContent: "space-between",
  },
  rowTitleText: { paddingTop: 10, fontWeight: "500", fontSize: 14 },
  label: {
    paddingVertical: 10,
    fontSize: 12,
    maxWidth: Dimensions.get("window").width - 150,
  },

  row: {
    // marginBottom: 8,
  },
  value: {
    fontSize: 12,
    color: "#666",
  },
  radioGroup: {
    alignItems: "flex-start",
    marginVertical: 5,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    // gap: 10,
    marginTop: 20,
  },
  addMoreButton: {
    flex: 1,
    flexDirection: "row",
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
export default Cancel;
