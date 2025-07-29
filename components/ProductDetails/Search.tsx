import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LeftArrow } from "./SVG";

interface CatalogItem {
  descriptor: {
    name: string;
    images: string[];
  };
}

interface SearchProps {
  catalog: CatalogItem[];
}

const Search: React.FC<SearchProps> = ({ catalog }) => {
  const { width, height } = Dimensions.get("window");
  return (
    <View style={styles.headerContainer}>
      <LeftArrow />
      <View style={{ alignItems: "center", flexDirection: "row" }}></View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for dishes, clothing, groceries..."
          style={{
            height: 50,
            borderColor: "white",
            borderWidth: 2,
            borderRadius: 10,
            width: width * 0.6,
            paddingHorizontal: 20,
            paddingLeft: 10,

            color: "#8E8A8A",
            textAlign: "left",
            flex: 1,
          }}
          selectionColor="#8E8A8A"
          placeholderTextColor="#8E8A8A"
        />
        <TouchableOpacity style={styles.icon}></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    width: "100%",
  },
  headerContainer: {
    paddingHorizontal: 16,
    width: "100%",
    flexDirection: "row",
    paddingVertical: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 10,
    width: "100%",
  },
  headerIcon: {
    color: "black",
    marginLeft: 15,
    fontSize: 25,
  },
  headerLeftIcon: {
    color: "black",
    marginRight: 15,
    fontSize: 25,
  },

  searchContainer: {
    flexDirection: "row",
    borderColor: "#C7C4C4",
    borderWidth: 2,
    alignItems: "center",
    borderRadius: 13,
    marginTop: 10,
    marginHorizontal: 10,
    width: "90%",
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  icon: {
    paddingRight: 20,
  },
  recentSearchContainer: {
    // Style for the recent search container
    padding: 16,
  },
  recentSearchHeader: {
    // Style for the recent search header
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  recentSearchItem: {
    // Style for each recent search item
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  recentSearchText: {
    // Style for the recent search text
    fontSize: 16,
  },
});

export default Search;
