import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface DropdownComponentProps {
  dataDrop: [];
  onFilterSelect: any;
  placeHolderText: string;
}

const DropdownComponent = ({ dataDrop, onFilterSelect, placeHolderText }) => {
  const [value, setValue] = useState(null);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={dataDrop}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeHolderText}
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        setValue(item.value);
        onFilterSelect(item);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    // height: 50,
    backgroundColor: "white",
    borderRadius: 100,
    marginLeft: 8,
    marginVertical: 5,
    // paddingVertical: 3,
    position: "relative",
    paddingHorizontal: Dimensions.get("screen").width * 0.03,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderWidth: 1,
    borderColor: "#ACAAAA",
  },

  item: {
    // minWidth: Dimensions.get("screen").width * 0.5,
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  textItem: {
    flex: 1,
    fontSize: 13,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 13,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
