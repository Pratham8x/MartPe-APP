import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import CartItems from "./CartItems";
import { useCartStore } from "../../state/useCartStore";
import useDeliveryStore from "../../state/deliveryAddressStore";
import { getDistance } from "geolib";
import { FontAwesome } from "@expo/vector-icons";

const CartCard = ({ id, store, items }) => {
  const { clearCart } = useCartStore();
  // const [closeCart, setCloseCart] = useState(false);
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);

  const distance = Number(
    (
      getDistance(
        {
          latitude: store?.geoLocation?.lat,
          longitude: store?.geoLocation?.lng,
        },
        { latitude: selectedDetails?.lat, longitude: selectedDetails?.lng }
      ) / 1000
    ).toFixed(1)
  );

  const handleCloseButton = () => {
    Alert.alert(
      "Remove Cart",
      "Are you sure you want to remove this cart and all its items?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: async () => {
            try {
              await clearCart(store.id);
            } catch (error) {
              console.error("Error deleting the cart", error.message);
            }
          },
        },
      ]
    );
  };

  if (!store || !items || items.length === 0) {
    return;
  }

  // console.log("Items:", items);
  // console.log("Store",store);

  return (
    // !closeCart && (
    <View style={styles.container}>
      {/* seller info container */}
      <View style={styles.sellerInfoContainer}>
        <Image
          source={{ uri: store.descriptor.symbol }}
          style={styles.sellerLogo}
        />
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerName}>{store?.descriptor?.name}</Text>
          {store?.address?.street && (
            <Text style={styles.sellerLocation}>{store?.address?.street}</Text>
          )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={styles.time}>
              <Text style={{ fontSize: 12 }}>{distance} Km</Text>
              <Text style={{ color: "#848080", fontSize: 12 }}>
                {" \u25CF"}
              </Text>
              <Text style={{ fontSize: 12, color: "green" }}>
                {((distance / 35).toFixed(0) === "0"
                  ? (distance / 35) * 60
                  : distance / 35
                ).toFixed(0)}{" "}
                {(distance / 35).toFixed(0) === "0" ? "min" : "hr"}
              </Text>
              {/* <Image source={require("../../assets/time-green.png")} /> */}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.closeIcon} onPress={handleCloseButton}>
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
      </View>
      {/* cart items */}
      <CartItems cartID={id} storeId={store.id} items={items} />
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
    fontSize: 18,
    // marginBottom: 1,
    maxWidth: 200,
    fontWeight: "bold",
  },
  sellerLocation: {
    color: "#767582",
    // marginBottom: 1,
  },
  locationText: {
    fontSize: 12,
    color: "#979393",
  },
  time: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
  },
  closeIcon: {
    // position: "absolute",
    // padding: 5,
    // top: 0,
    // right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginVertical: 5,
  },
  checkoutButton: {
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
  checkoutButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#FFFFFF",
  },
  addItemsButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF0000",
  },
  addItemsButtonText: {
    fontWeight: "500",
    fontSize: 14,
    color: "#FF0000",
  },
});

export default CartCard;
