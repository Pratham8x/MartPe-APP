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
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import FilterHeader from "./filterHeader";
import FilterFooter from "./filterFooter";
interface FilterCardProps {
  options: {
    name: string;
  }[];
  categoryData: {
    id: number;
    label: any;
    value: any;
  }[];
  selectOption: (value: any) => void;
  filterSelected: {
    category: string[];
    offers: number;
    delivery: number;
  };
  activeOption: string;
  offerData: any;
  deliveryData: any;
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
  const [selectedFilter, setSelectedFilter] = useState(filterSelected);

  useEffect(() => {
    setSelectedFilter(filterSelected);
  }, [filterSelected]);

  return (
    <>
      <FilterHeader closeFilter={closeFilter} />
      <View style={{ flexDirection: "row" }}>
        <ScrollView
          style={{
            // minHeight: "100%",
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
                    activeOption == option.name ? "#F13A3A" : "white",
                }}
              >
                <Text
                  style={{
                    paddingHorizontal: Dimensions.get("screen").width * 0.05,
                    color: activeOption == option.name ? "white" : "black",
                    fontWeight: "500",
                  }}
                >
                  {option.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <ScrollView
          style={{
            minHeight: "100%",
            minWidth: "60%",
          }}
        >
          {activeOption.toLowerCase() === "category" &&
            categoryData.map((category, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  setSelectedFilter((selected) => {
                    if (selected.category.includes(category.value)) {
                      return {
                        ...selected,
                        category: selected.category.filter(
                          (item) => item !== category.value
                        ),
                      };
                    } else {
                      return {
                        ...selected,
                        category: [...selected.category, category.value],
                      };
                    }
                  })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: Dimensions.get("screen").width * 0.05,
                    marginHorizontal: Dimensions.get("screen").width * 0.05,
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: Dimensions.get("screen").width * 0.05,
                      color: "black",
                      fontWeight: selectedFilter.category.includes(
                        category.value
                      )
                        ? "600"
                        : "400",
                    }}
                  >
                    {category.label}
                  </Text>

                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderColor: selectedFilter.category.includes(
                        category.value
                      )
                        ? "#FB3E44"
                        : "#ACAAAA",
                      borderWidth: 1.5,
                      borderRadius: 1,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: selectedFilter.category.includes(
                        category.value
                      )
                        ? "#FB3E44"
                        : "white",
                    }}
                  >
                    {selectedFilter.category.includes(category.value) && (
                      <Feather name="check" size={14} color="white" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          {activeOption.toLowerCase() === "offers" &&
            offerData.map((offer, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  setSelectedFilter({
                    ...selectedFilter,
                    offers: offer.value,
                  })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: Dimensions.get("screen").width * 0.05,
                    marginHorizontal: Dimensions.get("screen").width * 0.05,
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: Dimensions.get("screen").width * 0.05,
                      color: "black",
                      fontWeight:
                        selectedFilter.offers === offer.value ? "600" : "400",
                    }}
                  >
                    {offer.label}
                  </Text>

                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderColor:
                        selectedFilter.offers === offer.value
                          ? "#FB3E44"
                          : "#ACAAAA",
                      borderWidth: 1.5,
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedFilter.offers === offer.value && (
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: "#FB3E44",
                          borderRadius: 15,
                        }}
                      ></View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          {activeOption.toLowerCase() === "delivery" &&
            deliveryData.map((delivery, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  setSelectedFilter({
                    ...selectedFilter,
                    delivery: delivery.value,
                  })
                }
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: Dimensions.get("screen").width * 0.05,
                    marginHorizontal: Dimensions.get("screen").width * 0.05,
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: Dimensions.get("screen").width * 0.05,
                      color: "black",
                      fontWeight:
                        selectedFilter.delivery === delivery.value
                          ? "600"
                          : "400",
                    }}
                  >
                    {delivery.label}
                  </Text>

                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderColor:
                        selectedFilter.delivery === delivery.value
                          ? "#FB3E44"
                          : "#ACAAAA",
                      borderWidth: 1.5,
                      borderRadius: 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedFilter.delivery === delivery.value && (
                      <View
                        style={{
                          width: 8,
                          height: 8,
                          backgroundColor: "#FB3E44",
                          borderRadius: 15,
                        }}
                      ></View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
