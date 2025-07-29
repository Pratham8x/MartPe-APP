// CartComponent.js
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const CartBottomBar = ({
  sellerLogo,
  sellerName,
  numItems,
  totalCost,
  onCheckout,
  onDeleteCart,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image source={{ uri: sellerLogo }} style={styles.sellerLogo} />
        <View style={styles.sellerInfoContainer}>
          <Text style={styles.sellerName}>{sellerName}</Text>
          <TouchableOpacity onPress={onCheckout}>
            <Text style={styles.viewCartText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.info}>
        <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
          <Text style={{ color: "white" }}>
            {numItems} items | ₹{totalCost}
          </Text>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={onDeleteCart}>
            <Image source={require("../../assets/trash.png")} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  info: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sellerInfoContainer: {
    flexDirection: "column",
  },
  sellerLogo: {
    width: 80,
    height: 60,
    borderRadius: 10,
    marginRight: 8,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  viewCartText: { textDecorationLine: "underline", fontSize: 16 },
  cartInfoContainer: {
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  checkoutButton: {
    backgroundColor: "#1CA672",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    marginHorizontal: 8,
    alignItems: "center",
    gap: 2,
  },
  checkoutText: {
    fontWeight: "bold",
    color: "white",
  },
  deleteButton: {
    backgroundColor: "rgba(255, 0, 0, 0.15)",
    padding: 14,
    borderRadius: 10,
    marginHorizontal: 8,
  },
});

export default CartBottomBar;
