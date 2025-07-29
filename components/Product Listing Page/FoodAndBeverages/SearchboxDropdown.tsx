import React from "react";
import { View, StyleSheet } from "react-native";
import SearchboxDropdownItem from "./SearchboxDropdownItem";

interface SearchboxDropdownProps {
  suggestions: Array<{
    image: string;
    name: string;
    id: string;
    search: (text: string) => void;
  }>;
}

const SearchboxDropdown: React.FC<SearchboxDropdownProps> = ({
  suggestions,
  search,
}) => (
  <View style={styles.dropdownContainer}>
    {suggestions.map((item, index) => (
      <SearchboxDropdownItem search={search} key={index} item={item} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 10,
    zIndex: 10,
  },
});

export default SearchboxDropdown;
