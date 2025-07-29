import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import Dropdown from "./Dropdown";
import { Entypo } from "@expo/vector-icons";

interface Descriptor {
  images: string[];
  name: string;
  symbol: string;
}

interface Price {
  maximum_value: number;
  offer_percent: number | null;
  offer_value: number | null;
  value: number;
}

interface CatalogItem {
  bpp_id: string;
  bpp_uri: string;
  catalog_id: string;
  category_id: string;
  descriptor: Descriptor;
  id: string;
  location_id: string;
  non_veg: boolean | null;
  price: Price;
  provider_id: string;
  veg: boolean;
  provider: {
    id: string;
  };
}

interface DropdownHeaderProps {
  dropdownHeaders: string[];
  dropdownData: CatalogItem[];
  providerId: string;
  searchString: string;
  handleOpenModal: () => void;
  foodDetails: (data: any) => void;
}

const DropdownHeader: React.FC<DropdownHeaderProps> = ({
  dropdownHeaders,
  dropdownData,
  providerId,
  handleOpenPress,
  foodDetails,
  searchString,
}) => {
  // For toggling the dropdowns
  const [dropdownStates, setDropdownStates] = useState(
    dropdownHeaders.reduce((acc, header) => {
      acc[header] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleDropdown = (header: string) => {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [header]: !prevStates[header],
    }));
  };

  // For getting the count of items in each category
  const getCountForCategory = (category: string) => {
    const filteredItems = dropdownData.filter(
      (item) => item.category_id === category
    );
    return filteredItems.length;
  };

  return (
    <View>
      {dropdownHeaders.map((item, idx) => {
        const headerTitle = item
          .replace(/_/g, " ")
          .replace(/\b\w/g, (c) => c.toLowerCase())
          .replace(/^\w/, (c) => c.toUpperCase());
        return (
          <View key={idx} style={{}}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                ...styles.categoriesHeader_container,
                borderWidth: dropdownStates[item] ? 0 : 0.5,
                // paddingVertical: dropdownStates[item] ? 10 : 20,
              }}
              onPress={() => toggleDropdown(item)}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.headerText}>
                  {headerTitle + " (" + getCountForCategory(item) + ")"}
                </Text>

                {dropdownStates[item] ? (
                  <Entypo name="chevron-small-up" size={24} color="black" />
                ) : (
                  <Entypo name="chevron-small-down" size={24} color="black" />
                )}
              </View>
            </TouchableOpacity>
            {dropdownStates[item] && (
              <Dropdown
                data={
                  dropdownData.filter(
                    (dropdownItem) => dropdownItem.category_id === item
                  ) || []
                }
                key={idx}
                isVisible={true}
                providerId={providerId}
                handleOpenPress={handleOpenPress}
                foodDetails={foodDetails}
                searchString={searchString}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesHeader_container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    borderColor: "#D0D0D0",
    borderRadius: 5,
  },
  headerText: {
    fontSize: 13,
    fontWeight: "900",
  },
  itemCountText: {
    fontSize: 14,
    fontWeight: "900",
    marginLeft: 10,
  },
});

export default DropdownHeader;
