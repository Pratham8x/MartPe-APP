import React, { FC, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import FilterHeader from "./filterHeader";
import FilterFooter from "./filterFooter";

interface OptionItem {
  label: string;
  value: any;
}

interface FilterState {
  category: string[];
  offers: number;
  delivery: number;
}

interface FilterCardProps {
  options: {
    name: string;
  }[];
  categoryData: {
    id: number;
    label: string;
    value: string;
  }[];
  selectOption: (value: FilterState) => void;
  filterSelected: FilterState;
  activeOption: string;
  offerData: OptionItem[];
  deliveryData: OptionItem[];
  setActiveOption: (value: string) => void;
  closeFilter: () => void;
}

const FilterCard: FC<FilterCardProps> = ({
  options,
  categoryData,
  selectOption,
  filterSelected,
  activeOption,
  offerData,
  deliveryData,
  setActiveOption,
  closeFilter,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterState>(filterSelected);

  useEffect(() => {
    setSelectedFilter(filterSelected);
  }, [filterSelected]);

  return (
    <>
      <FilterHeader closeFilter={closeFilter} />
      <View style={{ flexDirection: "row" }}>
        <ScrollView
          style={{
            borderRightWidth: 1,
            borderRightColor: "#968D8D",
            minWidth: "40%",
          }}
        >
          {options.map((option, index) => (
            <Pressable key={index} onPress={() => setActiveOption(option.name)}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: Dimensions.get("screen").width * 0.04,
                  backgroundColor:
                    activeOption === option.name ? "#F13A3A" : "white",
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: Dimensions.get("screen").width * 0.05,
                    color: activeOption === option.name ? "white" : "black",
                    fontWeight: "500",
                  }}
                >
                  {option.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView style={{ minHeight: "100%", minWidth: "60%" }}>
          {activeOption.toLowerCase() === "category" &&
            categoryData.map((category, index) => {
              const isSelected = selectedFilter.category.includes(category.value);
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setSelectedFilter((prev) => ({
                      ...prev,
                      category: isSelected
                        ? prev.category.filter((c) => c !== category.value)
                        : [...prev.category, category.value],
                    }))
                  }
                >
                  <View style={styles.optionRow}>
                    <Text
                      style={[
                        styles.optionText,
                        { fontWeight: isSelected ? "600" : "400" },
                      ]}
                    >
                      {category.label}
                    </Text>
                    <View
                      style={[
                        styles.checkbox,
                        {
                          borderColor: isSelected ? "#FB3E44" : "#ACAAAA",
                          backgroundColor: isSelected ? "#FB3E44" : "white",
                        },
                      ]}
                    >
                      {isSelected && <Feather name="check" size={14} color="white" />}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

          {activeOption.toLowerCase() === "offers" &&
            offerData.map((offer, index) => {
              const isSelected = selectedFilter.offers === offer.value;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setSelectedFilter((prev) => ({
                      ...prev,
                      offers: offer.value,
                    }))
                  }
                >
                  <View style={styles.optionRow}>
                    <Text
                      style={[
                        styles.optionText,
                        { fontWeight: isSelected ? "600" : "400" },
                      ]}
                    >
                      {offer.label}
                    </Text>
                    <View
                      style={[
                        styles.radio,
                        {
                          borderColor: isSelected ? "#FB3E44" : "#ACAAAA",
                        },
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

          {activeOption.toLowerCase() === "delivery" &&
            deliveryData.map((delivery, index) => {
              const isSelected = selectedFilter.delivery === delivery.value;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    setSelectedFilter((prev) => ({
                      ...prev,
                      delivery: delivery.value,
                    }))
                  }
                >
                  <View style={styles.optionRow}>
                    <Text
                      style={[
                        styles.optionText,
                        { fontWeight: isSelected ? "600" : "400" },
                      ]}
                    >
                      {delivery.label}
                    </Text>
                    <View
                      style={[
                        styles.radio,
                        {
                          borderColor: isSelected ? "#FB3E44" : "#ACAAAA",
                        },
                      ]}
                    >
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>

      <FilterFooter
        selectedFilter={selectedFilter}
        filterSelected={filterSelected}
        selectOption={selectOption}
        setSelectedFilters={setSelectedFilter}
        closeFilter={closeFilter}
      />
    </>
  );
};

export default FilterCard;

const styles = StyleSheet.create({
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Dimensions.get("screen").width * 0.05,
    marginHorizontal: Dimensions.get("screen").width * 0.05,
  },
  optionText: {
    paddingHorizontal: Dimensions.get("screen").width * 0.05,
    color: "black",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 8,
    height: 8,
    backgroundColor: "#FB3E44",
    borderRadius: 15,
  },
});
