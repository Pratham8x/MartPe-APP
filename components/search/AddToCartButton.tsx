import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import DynamicButton from "../common/DynamicButton";
import { useCartStore } from "../../state/useCartStore";
interface AddToCartButtonProps {
  storeId: string;
  itemId: string;
  maxQuantity: number | string;
}

const { width, height } = Dimensions.get("window");

const AddToCartButton: FC<AddToCartButtonProps> = ({
  storeId,
  itemId,
  maxQuantity,
}) => {
  const allCarts = useCartStore((state) => state.allCarts);
  const cart = allCarts.find((cart) => cart.store.id === storeId);
  const item = cart?.items?.find((item) => item?.itemId === itemId);
  const itemCount = item?.quantity | 0;

  return (
    <View>
      {itemCount === 0 ? (
        <DynamicButton
          // onPressItem={increment}
          storeId={storeId}
          itemId={itemId}
          isNewItem={true}
        >
          <View
            style={{
              ...styles.addButton,
              paddingVertical: 6.5,
            }}
          >
            <Text style={styles.buttonText}>ADD</Text>
          </View>
        </DynamicButton>
      ) : (
        <View style={{ ...styles.addButtonNext }}>
          <DynamicButton
            isUpdated={true}
            isNewItem={false}
            storeId={storeId}
            quantity={itemCount - 1}
            itemId={itemId}
            // onPressItem={decrement}
          >
            <View style={{ ...styles.itemCountChangeButton }}>
              <Text style={styles.incrementDecrementButtonText}>-</Text>
            </View>
          </DynamicButton>

          <Text style={styles.itemCount}>{itemCount}</Text>
          <DynamicButton
            isUpdated={true}
            isNewItem={false}
            storeId={storeId}
            itemId={itemId}
            quantity={itemCount + 1}
          >
            <View style={{ ...styles.itemCountChangeButton }}>
              <Text style={styles.incrementDecrementButtonText}>+</Text>
            </View>
          </DynamicButton>
        </View>
      )}
    </View>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "white",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.04,
    borderRadius: 4,
    elevation: 2,
  },
  addButtonNext: {
    backgroundColor: "white",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: width * 0.02,
    borderRadius: 4,
    elevation: 2,
  },

  itemCountChangeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.09,
    height: width * 0.09,
    borderColor: "green",
  },
  buttonText: {
    color: "green",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  incrementDecrementButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "green",
  },
  itemCount: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
