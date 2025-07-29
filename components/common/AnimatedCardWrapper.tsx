import React, { useState } from "react";
import { Animated, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface BouncyCardWrapperProps {
  children: React.ReactNode;
  onPress?: (navigation: any) => void;
}

const BouncyCardWrapper = ({ children, onPress }) => {
  const navigation = useNavigation();
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (onPress) {
      onPress(navigation);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default BouncyCardWrapper;
