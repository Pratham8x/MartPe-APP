import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { FlashList } from "@shopify/flash-list";
import { BackArrow } from "../../../constants/icons/commonIcons";
import { useRouter } from "expo-router";
import { widthPercentageToDP } from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import { useOrderStore } from "../../../state/useOrderStore";
import OrderCard from "../../../components/OrderStatus/OrderCard";

const Orders = () => {
  const allOrders = useOrderStore((state) => state.allOrders);
  const router = useRouter();
  const animation = useRef(null);
  const [filter, setFilter] = useState("live"); // "live", "delivered", or "cancelled"

  // Filter orders based on the current filter state
  const filteredOrders = allOrders.filter((order) => {
    if (filter === "delivered") {
      return order?.order_status.toLowerCase() === "completed";
    } else if (filter === "cancelled") {
      return order?.order_status.toLowerCase() === "cancelled";
    } else {
      // "live" filter
      return (
        order?.order_status.toLowerCase() !== "completed" &&
        order?.order_status.toLowerCase() !== "cancelled"
      );
    }
  });

  if (allOrders.length === 0)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          paddingBottom: 30,
        }}
      >
        {/* Orders text */}
        <View
          style={{
            backgroundColor: "#fff",
            width: widthPercentageToDP(100),
            alignItems: "center",
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderColor: "#eee",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#000" }}>
            Orders
          </Text>
        </View>

        {/* Empty cart lottie */}
        <View style={styles.animationContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: widthPercentageToDP("90"),
              backgroundColor: "#fff",
            }}
            source={require("../../../assets/lottiefiles/empty_orders.json")}
          />
        </View>

        {/* Your cart is empty */}
        <View style={{ height: 50, alignItems: "center" }}>
          <Text style={{ color: "#909095", fontWeight: "600", fontSize: 20 }}>
            No Orders found!
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={() => router.push({ pathname: "/(tabs)/home" })}
          style={{
            backgroundColor: "#030303",
            width: widthPercentageToDP("90"),
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 50,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 20 }}>
            Start Shopping
          </Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <BackArrow
            onPress={() => {
              router.back();
            }}
          />
          <Text style={styles.titleText}>Your Order(s)</Text>
        </View>
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filter, filter === "live" && styles.activeFilter]}
            onPress={() => setFilter("live")}
          >
            <Text style={[styles.text, filter === "live" && styles.activeText]}>
              LIVE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filter,
              filter === "delivered" && styles.activeFilter,
            ]}
            onPress={() => setFilter("delivered")}
          >
            <Text
              style={[styles.text, filter === "delivered" && styles.activeText]}
            >
              DELIVERED
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filter,
              filter === "cancelled" && styles.activeFilter,
            ]}
            onPress={() => setFilter("cancelled")}
          >
            <Text
              style={[styles.text, filter === "cancelled" && styles.activeText]}
            >
              CANCELLED
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {filteredOrders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>
            {filter === "cancelled" &&
              "You haven't cancelled any orders yet :)"}
            {filter === "delivered" &&
              "Looking forward to your first delivery !"}
            {filter !== "delivered" &&
              filter !== "cancelled" &&
              "No live orders?\n Browse our products and fill your cart today !"}
          </Text>
        </View>
      ) : (
        <FlashList
          data={filteredOrders.reverse()} // Reversed so that newer orders appear first
          renderItem={({ item }) => (
            <>
              <OrderCard order={item} />
            </>
          )}
          estimatedItemSize={83}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecef",
    paddingTop: 120,
  },
  title: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  titleText: { fontSize: 22, fontWeight: "bold" },
  header: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 100,
    backgroundColor: "white",
  },
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  filters: {
    display: "flex",
    flexDirection: "row",
    // gap: 10,
    justifyContent: "center",
    alignItems: "center",
    // padding: 10,
    backgroundColor: "rgba(255, 81, 81, 0.15)",
    margin: 12,

    borderRadius: 10,
  },
  filter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    // backgroundColor: "rgba(255, 0, 0, 0.15)",
  },
  activeFilter: {
    backgroundColor: "#FF5151",
    borderColor: "#FF5151",
    borderRadius: 10,
  },
  activeText: {
    color: "white",
  },
  text: {
    fontSize: 12,
    letterSpacing: 1,
    fontWeight: "500",
    color: "black",
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
  },
  noOrdersText: {
    fontSize: 18,
    fontWeight: "500",
    // color: "#909095",
    textAlign: "center",
  },
});

export default Orders;
