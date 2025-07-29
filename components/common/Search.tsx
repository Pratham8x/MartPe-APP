import React, { useState, useEffect } from "react";

import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

import useDeliveryStore from "../../state/deliveryAddressStore";
import { router } from "expo-router";
import { BackArrow } from "../../constants/icons/tabIcons";

interface SearchProps {
  placeholder: string;
  showBackArrow?: boolean;
  showLocation?: boolean;
  domain?: string | string[];
  domainColor?: string;
}

const searchTexts = ["grocery", "biryani", "clothing", "electronics"];

const Search: React.FC<SearchProps> = ({
  placeholder,
  showBackArrow,
  showLocation = true,
  domain,
  domainColor,
}) => {
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);

  const [searchTextIndex, setSearchTextIndex] = useState(0);
  const [placeHolderText, setPlaceHolderText] = useState(placeholder);
  useEffect(() => {
    const interval = setInterval(() => {
      setSearchTextIndex((searchTextIndex + 1) % searchTexts.length);
    }, 3000); // Change index every 3 seconds
    return () => clearInterval(interval);
  }, [searchTextIndex]);

  useEffect(() => {
    switch (domain) {
      case "ONDC:RET11":
        setPlaceHolderText("Search for food & beverages");
        break;
      case "ONDC:RET10":
        setPlaceHolderText("Search for groceries");
        break;
      case "ONDC:RET12":
        setPlaceHolderText(" Search for clothing & accessories");
        break;
      case "ONDC:RET13":
        setPlaceHolderText(" Search for personal care & beauty");
        break;
      case "ONDC:RET14":
        setPlaceHolderText("Search for electronics");
        break;
      case "ONDC:RET16":
        setPlaceHolderText("Search for home & kitchen");
        break;
      default:
        setPlaceHolderText("Search for products");
        break;
    }
  }, [domain]);

  return (
    <View
      style={{
        ...styles.headerContainer,
        backgroundColor: domainColor ? `${domainColor}95` : "#fff",
      }}
    >
      {showLocation && (
        <TouchableOpacity
          onPress={() => router.push("/address/SavedAddresses")}
          style={styles.locationRow}
        >
          <View style={{ padding: 0 }}>
            <Text style={styles.deliveryNowStyle}>
              Delivering to {selectedDetails?.name}
            </Text>
            <Text style={styles.deliveryAddressStyle}>
              {selectedDetails?.city
                ? `${selectedDetails?.city}, ${selectedDetails?.state}, ${selectedDetails?.pincode}`
                : "Select Location"}
              <Feather name="chevron-down" size={15} color="#303030" />
            </Text>
            {/* chevron-down */}
          </View>
        </TouchableOpacity>
      )}

      {/* search bar */}
      <View style={styles.searchRow}>
        {showBackArrow && (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <BackArrow />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.searchContainer}
          // onPress={() => router.push('/search')}
        >
          {/* search icon */}
          <TouchableOpacity style={styles.searchIcon}>
            <Feather name="search" size={20} color="#303030" />
          </TouchableOpacity>
          <TextInput
            onFocus={() =>
              router.push({
                pathname: "/search",
                params: {
                  domain: domain,
                  placeHolder: placeHolderText,
                },
              })
            }
            placeholder={
              placeholder
                ? placeholder
                : `Search for ${searchTexts[searchTextIndex]}`
            }
            style={styles.searchText}
            // selectionColor="#303030"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 10, // Added padding
  },
  deliveryNowStyle: {
    fontSize: 12,
    color: "#8f8f90",
  },
  deliveryAddressStyle: {
    color: "#303030",
    fontSize: 16,
    fontWeight: "bold",
  },
  locationRow: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10, // Added margin
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  locationIcon: {
    marginRight: Dimensions.get("screen").width * 0.01,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    // borderColor: "#C7C4C4",
    // borderWidth: 1,
    alignItems: "center",
    borderRadius: 10,
    height: 50,
    marginTop: 10,
    // paddingHorizontal: 15,

    backgroundColor: "#f8f9fa",
    // paddingVertical: 5,
    // marginLeft: 10, // Added margin
  },
  searchIcon: {
    marginLeft: 12.5,
    // borderWidth: 1,
    // borderColor: "#000",
  },
  searchText: {
    flex: 1,
    fontSize: 15,
    color: "#303030",
    marginHorizontal: 12.5,
    // borderWidth: 1,
    // borderColor: "#000",
  },
  backButton: {
    paddingVertical: 15,
    paddingLeft: 10,
    paddingRight: 20,
    marginTop: 10,
  },
  // Add more styles as needed...
});
