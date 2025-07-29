import React from "react";
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

interface FilterHeaderProps {
  closeFilter: () => void;
}

const FilterHeader = ({ closeFilter }) => {
  return (
    <View
      style={{
        height: "10%",
        paddingHorizontal: Dimensions.get("screen").width * 0.05,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#968D8D",
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "700" }}>Filter</Text>
      <Pressable onPress={closeFilter}>
        <AntDesign
          name="close"
          size={18}
          style={{ fontWeight: "600" }}
          color="black"
        />
      </Pressable>
    </View>
  );
};

export default FilterHeader;
