// BottomSheetComponent.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

const BottomSheetComponent = ({
  productName,
  productDetails,
  isVisible,
  onClose,
}) => {
  return (
    <BottomSheet
      index={isVisible ? 0 : -1}
      snapPoints={["45%", "90%"]}
      onClose={onClose}
    >
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{productName}</Text>
        <Text>{productDetails}</Text>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default BottomSheetComponent;
