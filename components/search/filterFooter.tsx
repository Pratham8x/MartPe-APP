import React, { FC } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

interface filterFooterInterface {
  selectOption: (value: any) => void;

  selectedFilter: {
    category: string[];
    offers: number;
    delivery: number;
  };
  setSelectedFilters: (value: any) => void;
  closeFilter: () => void;
}

const FilterFooter: FC<filterFooterInterface> = ({
  selectedFilter,
  // filterSelected,
  selectOption,
  setSelectedFilters,
  closeFilter,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: Dimensions.get("screen").width * 0.05,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // paddingBottom: 700,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          selectOption({
            category: [],
            offers: 0,
            delivery: 100,
          });
          setSelectedFilters({
            category: [],
            offers: 0,
            delivery: 100,
          });
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "500", color: "#919191" }}>
          Clear Filters
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FB3E44",
          paddingVertical: 5,
          paddingHorizontal: Dimensions.get("screen").width * 0.08,

          borderRadius: 16,
        }}
        onPress={() => {
          selectOption(selectedFilter);
          closeFilter();
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", color: "white" }}>
          Apply
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FilterFooter;
