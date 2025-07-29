import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useCartStore } from "../../../state/useCartStore";
import DynamicButton from "../../common/DynamicButton";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

interface PLPCardProps {
  veg: boolean;
  itemName: string;
  offerPrice: number;
  originalPrice: number;
  rating: number;
  itemImg: string;
  id: string;
  providerId: string;
  maxLimit: number;
  handleOpenModal: () => void;
  foodDetails: (data: any) => void;
  shortDesc: string;
  longDesc: string;
}

const PLPCard: React.FC<PLPCardProps> = ({
  veg,
  itemName,
  offerPrice,
  shortDesc,
  longDesc,
  originalPrice,
  rating,
  itemImg,
  id,
  providerId,
  maxLimit,
  handleOpenPress,
  foodDetails,
}) => {
  const allCarts = useCartStore((state) => state.allCarts);
  const cart = allCarts.find((cart) => cart.store.id === providerId);
  const item = cart?.items?.find((item) => item?.itemId === id);
  const itemCount = item?.quantity | 0;

  const discount = (
    ((originalPrice - offerPrice) / originalPrice) *
    100
  ).toFixed(0);

  const discountPercentage = parseInt(discount, 10);

  return (
    <View style={styles.plpCard_container}>
      <View style={styles.plpCard_content}>
        {/* item header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* veg or non-veg icon */}
          {veg ? (
            // <Image source={require("../../../assets/VegIcon.png")} />
            <MaterialCommunityIcons
              name="circle-box-outline"
              size={20}
              color="green"
            />
          ) : (
            // <Image source={require("../../../assets/nonVegIcon.png")} />
            <MaterialCommunityIcons
              name="circle-box-outline"
              size={20}
              color="red"
            />
          )}
          {/*  item name */}
          <Text style={styles.itemName}>
            {itemName.length > 20 ? itemName.slice(0, 20) + "..." : itemName}{" "}
          </Text>
        </View>

        {/* item details */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: 120,
          }}
        >
          {/* rating icon */}
          <FontAwesome
            name="star"
            size={14}
            color="#fbbf24"
            style={{ marginRight: 3 }}
          />
          {/* rating */}
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            {rating}
          </Text>

          {/* dot */}
          <Text style={{ color: "#848080", fontSize: 8, marginHorizontal: 2 }}>
            {" \u25CF"}
          </Text>

          {/* price */}
          <Text style={styles.price}>
            <FontAwesome name="rupee" size={10} color="#030303" />
            <Text style={{ marginLeft: 5 }}>{offerPrice}</Text>
            {discountPercentage >= 1 && (
              <>
                <Text style={styles.strikedOffText}>₹ {originalPrice}</Text>
                <Text style={{ color: "#1DA578" }}>
                  {discountPercentage}% off
                </Text>
              </>
            )}
          </Text>
        </View>

        {/* more details */}
        <View>
          <TouchableOpacity
            onPress={() => {
              handleOpenPress();
              foodDetails({
                images: itemImg,
                name: itemName,
                discount: discountPercentage,
                price: offerPrice,
                short_desc: shortDesc,
                storeId: providerId,
                itemId: id,
                maxQuantity: maxLimit,
                maxPrice: originalPrice,
                visible: true,
                long_desc: longDesc,
              });
              console.log("foodDetails", itemImg);
            }}
            style={styles.moreDetailsButton}
          >
            <Text style={{ color: "#030303", fontSize: 10 }}>More details</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={14}
              color="#030303"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ alignItems: "center", width: "35%" }}>
        <Image source={{ uri: itemImg }} style={styles.cardImg} />
        {itemCount == 0 ? (
          <View style={styles.buttonGroup}>
            <DynamicButton
              storeId={providerId}
              itemId={id}
              quantity={1}
              isNewItem={true}
            >
              <View style={styles.add}>
                <Text style={{ color: "#0e8910", fontWeight: "bold" }}>
                  Add
                </Text>
                <MaterialCommunityIcons name="plus" size={20} color="#0e8910" />
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
              <MaterialCommunityIcons name="minus" size={20} color="red" />
            </DynamicButton>
            <Text>{itemCount}</Text>
            {itemCount < maxLimit ? (
              <DynamicButton
                storeId={providerId}
                itemId={id}
                quantity={itemCount + 1}
                isUpdated={true}
              >
                <MaterialCommunityIcons name="plus" size={20} color="green" />
              </DynamicButton>
            ) : (
              <DynamicButton
                storeId={providerId}
                itemId={id}
                quantity={itemCount + 1}
                isUpdated={true}
                disabled={true}
              >
                <MaterialCommunityIcons
                  disabled={true}
                  name="plus"
                  size={20}
                  color="green"
                />
              </DynamicButton>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default PLPCard;

const styles = StyleSheet.create({
  plpCard_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "#9B9B9B",
    marginBottom: 10,
    marginHorizontal: 10,
  },
  plpCard_content: {
    flex: 1,
  },
  itemName: {
    marginLeft: 5,
    fontWeight: "900",
    fontSize: 14,
  },
  price: {
    fontWeight: "900",
    marginLeft: 5,
    color: "#030303",
    fontSize: 14,
  },
  strikedOffText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginLeft: 20,
    color: "#808080",
    fontWeight: "normal",
  },
  starImg: {
    width: 15,
    height: 15,
    marginLeft: 20,
  },
  moreDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#ABA9A9",
    borderRadius: 50,
    paddingVertical: 3,
    paddingHorizontal: 10,
    width: 90,
    marginTop: 30,
  },
  cardImg: {
    width: "100%",
    height: 100,
    borderRadius: 5,
  },
  addButton: {
    paddingVertical: 3,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    marginTop: -10,
    elevation: 5,
  },
  buttonText: {
    fontWeight: "900",
    color: "#00BC66",
    paddingHorizontal: 20,
  },
  itemCountBox: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 3,
    alignItems: "center",
    borderColor: "#D0D0D0",
  },
  itemCount: {
    fontWeight: "900",
    fontSize: 14,
    textAlign: "center",
    paddingHorizontal: 12,
  },
  itemCountChangeButton: {
    paddingHorizontal: 10,
    borderColor: "#D0D0D0",
  },
  incrementDecrementButtonText: {
    fontWeight: "900",
    fontSize: 18,
  },
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "white",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    elevation: 5,
  },
  add: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowRadius: 5,
  },

  qtyBtn: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 2,
    paddingHorizontal: 12,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
