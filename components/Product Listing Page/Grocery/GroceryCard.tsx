import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import DynamicButton from "../../common/DynamicButton";
import { useCartStore } from "../../../state/useCartStore";
import { FontAwesome } from "@expo/vector-icons";
import { DecrementIcon, IncrementIcon } from "../../../constants/icons/carticons";
import { Dimensions } from "react-native";

interface GroceryCardProps {
  itemName: string;
  cost: number;
  imageUrl: string;
  id: string;
  category: string;
  providerId: string;
  maxLimit: number;
}

const GroceryCard: React.FC<GroceryCardProps> = ({
  itemName,
  cost,
  imageUrl,
  id,
  category,
  providerId,
  maxLimit,
}) => {
  const allCarts = useCartStore((state) => state.allCarts);
  const cart = allCarts.find((cart) => cart.store.id === providerId);
  const item = cart?.items?.find((item) => item?.itemId === id);
  const itemCount = item?.quantity | 0;
  useEffect(() => {
    console.log(id);
  });

  return (
    <View style={styles.groceryCard}>
      <View
        style={{
          flexDirection: "column",

          width: Dimensions.get("screen").width * 0.4,
        }}
      >
        {imageUrl ? (
          <Image style={styles.groceryImage} source={{ uri: imageUrl }} />
        ) : (
          <Image
            style={styles.groceryImage}
            source={require("../../../assets/groceryImage.png")}
          />
        )}
        <Text style={styles.groceryCardTitle}>
          {itemName.length > 15 ? itemName.slice(0, 20) + "..." : itemName}
        </Text>
        <Text style={styles.weight}>10kg</Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price} numberOfLines={1}>
            <FontAwesome name="rupee" size={10} color="#030303" /> {cost}
          </Text>
        </View>
      </View>
      {itemCount == 0 ? (
        <View style={styles.buttonGroup}>
          <DynamicButton
            storeId={providerId}
            itemId={id}
            quantity={1}
            isNewItem={true}
          >
            <View style={styles.add}>
              <Image source={require("../../../assets/plus.png")} />
            </View>
          </DynamicButton>
        </View>
      ) : (
        <View style={styles.buttonGroup}>
          <DynamicButton
            storeId={providerId}
            itemId={id}
            quantity={itemCount - 1}
            isUpdated={true}
          >
            <DecrementIcon />
          </DynamicButton>
          <Text>{itemCount}</Text>
          {itemCount < maxLimit ? (
            <DynamicButton
              storeId={providerId}
              itemId={id}
              quantity={itemCount + 1}
              isUpdated={true}
            >
              <IncrementIcon />
            </DynamicButton>
          ) : (
            <DynamicButton
              storeId={providerId}
              itemId={id}
              quantity={itemCount + 1}
              isUpdated={true}
              disabled={true}
            >
              <IncrementIcon disabled={true} />
            </DynamicButton>
          )}
        </View>
      )}
    </View>
  );
};

export default GroceryCard;

const styles = StyleSheet.create({
  groceryCard: {
    marginBottom: 10,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "#fff",
    // padding: 5,
    overflow: "hidden",
  },
  groceryImage: {
    width: "100%",
    height: Dimensions.get("screen").height * 0.19,
  },
  groceryCardTitle: {
    textAlign: "left",
    fontSize: 14,
    fontWeight: "900",
    marginHorizontal: 5,
  },
  addButton: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginTop: 5,
    height: 30,
    borderWidth: 0.5,
    borderColor: "#00BC66",
  },
  buttonText: {
    fontWeight: "900",
    color: "#00BC66",
    textAlign: "center",
    fontSize: 14,
  },
  itemCountContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: "#00BC66",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "900",
    color: "#00BC66",
    paddingHorizontal: 7,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    flex: 1,
    textAlign: "center",
    borderColor: "#D0D0D0",
  },
  itemCountButtonText: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: "900",
    color: "#00BC66",
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginVertical: 5,
  },
  weight: {
    fontSize: 10,
    color: "#7D7777",
    marginHorizontal: 5,
  },
  price: {
    fontSize: 12,
    fontWeight: "900",
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  add: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 1,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },

  qtyBtn: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 2,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
