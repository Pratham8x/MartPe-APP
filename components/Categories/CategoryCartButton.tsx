import React, { useState } from "react";
import { View, Text } from "react-native";
import DynamicButton from "../common/DynamicButton";

const CategoryCartButton = () => {
  const [itemCount, setItemCount] = useState(0);
  const increment = () => itemCount < 5 && setItemCount(itemCount + 1);
  const decrement = () => itemCount > 0 && setItemCount(itemCount - 1);

  return (
    <View>
      {itemCount == 0 ? (
        <DynamicButton
          storeId={storeId}
          itemId={id}
          quantity={1}
          isNewItem={true}
          onPressItem={increment}
        >
          <View style={styles.add}>
            <Image source={require("../../assets/plus.png")} />
          </View>
        </DynamicButton>
      ) : (
        <View style={styles.incrementButton}>
          <DynamicButton
            storeId={storeId}
            itemId={id}
            quantity={itemCount}
            onPressItem={decrement}
            isUpdated={true}
          >
            <View style={styles.add}>
              <Text>-</Text>
            </View>
          </DynamicButton>
          <Text>{itemCount}</Text>
          <DynamicButton
            storeId={storeId}
            itemId={id}
            quantity={itemCount}
            onPressItem={increment}
            isUpdated={true}
          >
            <View style={styles.add}>
              <Text>+</Text>
            </View>
          </DynamicButton>
        </View>
      )}
    </View>
  );
};

export default CategoryCartButton;
