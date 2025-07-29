import { useRef, FC, ReactNode } from "react";
import { Animated, Pressable } from "react-native";
import { useCartStore } from "../../state/useCartStore";
import { useToast } from "react-native-toast-notifications";

interface DynamicButtonProps {
  children: ReactNode;
  isNewItem?: boolean;
  isUpdated?: boolean;
  storeId?: string;
  itemId?: string;
  quantity?: number;
  customizations?: [
    {
      id: string;
    }
  ];
  disabled?: boolean;
}

const DynamicButton: FC<DynamicButtonProps> = ({
  children,
  isNewItem,
  isUpdated,
  storeId,
  itemId,
  quantity,
  customizations,
  disabled = false,
  // onPressItem,
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const toast = useToast();
  const { addItem, updateItem, removeItem } = useCartStore();
  const animatePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.8,
      speed: 15,
      useNativeDriver: true,
    }).start();
  };

  const animatePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 2,
      tension: 150,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = async () => {
    try {
      if (isNewItem) {
        await addItem(storeId, itemId, 1, customizations);
        // toast.show("New item added to cart", {
        //   type: " success ",
        //   placement: "bottom",
        //   duration: 3000,
        //   animationType: "slide-in",
        // });
        // confettiFire();
      } else if (isUpdated && quantity > 0) {
        await updateItem(storeId, itemId, quantity);
      } else if (isUpdated) {
        await removeItem(storeId, itemId);
      } else {
        console.log("This is a normal item");
      }
    } catch (error) {
      console.error("Error updating cart item:", error.message);
    }

    // onPressItem();
    animatePressOut();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPressIn={animatePressIn}
        onPressOut={animatePressOut}
        onPress={disabled ? () => {} : handlePress}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default DynamicButton;
