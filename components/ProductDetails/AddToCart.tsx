import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import DynamicButton from "../common/DynamicButton";
import { useCartStore } from "../../state/useCartStore";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

interface AddToCartProps {
  price: number;
  storeId: string;
  itemId: string;
  maxLimit: number;
}

const { width, height } = Dimensions.get("window");

const AddToCart: FC<AddToCartProps> = ({
  price,
  storeId,
  itemId,
  maxLimit,
}) => {
  const allCarts = useCartStore((state) => state.allCarts);
  const cart = allCarts.find((cart) => cart.store.id === storeId);
  const item = cart?.items?.find((item) => item?.itemId === itemId);
  const itemCount = item?.quantity | 0;

  console.log("added item count", itemCount);

  return (
    <View style={styles.container}>
      {itemCount == 0 ? (
        <DynamicButton
          isNewItem={true}
          storeId={storeId}
          itemId={itemId}
          quantity={1}
        >
          <View
            style={{
              backgroundColor: "#0e8910",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: width * 0.05,
              paddingVertical: width * 0.03,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
                marginRight: 10,
              }}
            >
              Add to Cart
            </Text>
            {/* <FontAwesome name="rupee" size={20} color="#fff" />
            <Text style={{ fontWeight: "900", fontSize: 25, color: "#fff" }}>
              {" "}
              {price}
            </Text> */}
          </View>
        </DynamicButton>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {/* increment button */}
          <DynamicButton
            isUpdated={true}
            isNewItem={false}
            storeId={storeId}
            quantity={itemCount - 1}
            itemId={itemId}
          >
            <View
              style={{
                ...styles.itemCountChangeButton,
              }}
            >
              {/* <Text style={styles.incrementDecrementButtonText}>-</Text> */}
              <MaterialIcons name="remove-circle" size={30} color="red" />
            </View>
          </DynamicButton>

          {/* middle text */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              maxWidth: 100,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              columnGap: 2,
            }}
          >
            <FontAwesome name="rupee" size={8} color="#030303" />
            <Text style={{ fontSize: 20, fontWeight: "900" }}>
              {itemCount * price}
            </Text>
            <Text>
              ({itemCount > 1 ? `${itemCount} items` : `${itemCount} item`})
            </Text>
          </View>

          {itemCount < maxLimit ? (
            <DynamicButton
              isUpdated={true}
              isNewItem={false}
              storeId={storeId}
              quantity={itemCount + 1}
              itemId={itemId}
            >
              <View
                style={{
                  ...styles.itemCountChangeButton,
                }}
              >
                <MaterialIcons name="add-circle" size={30} color="green" />
              </View>
            </DynamicButton>
          ) : (
            <DynamicButton
              isUpdated={true}
              isNewItem={false}
              storeId={storeId}
              quantity={itemCount + 1}
              itemId={itemId}
              disabled={true}
            >
              <View
                style={{
                  ...styles.itemCountChangeButton,
                  // borderLeftWidth: 1,
                  // opacity: 0.5,
                }}
              >
                <MaterialIcons name="add-circle" size={24} color="#0e8910" />
              </View>
            </DynamicButton>
          )}
        </View>
      )}
    </View>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    // paddingVertical: width * 0.02,
    // marginHorizontal: width * 0.05,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  incrementDecrementButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#FB3E44",
    color: "white",
    paddingVertical: 5,
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
    fontWeight: "500",
    color: "#000",
  },
  itemCountChangeButton: {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 12,
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
