import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchboxDropdownItemProps {
  item: {
    image: string;
    name: string;
    id: string;
  };
  search: (text: string) => void;
}

const SearchboxDropdownItem: React.FC<SearchboxDropdownItemProps> = ({
  item,
  search,
}) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`../(tabs)/home/productDetails/${item.id}`)}
      style={styles.dropdownItemContainer}
    >
      <View style={styles.dropdownItem}>
        <Image source={{ uri: item.image }} style={styles.itemImg} />
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <Image
        //source={require("../../../assets/upRightArrow.png")}
        style={styles.linkIcon}
      />
    </TouchableOpacity>
  );
};

export default SearchboxDropdownItem;

const styles = StyleSheet.create({
  dropdownItemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "900",
    marginLeft: 10,
  },
  linkIcon: {
    width: 10,
    height: 10,
  },
});
