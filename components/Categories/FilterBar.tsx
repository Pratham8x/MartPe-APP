import { View, Text, Image, StyleSheet } from "react-native";

function FilterBar() {
  return (
    <View style={styles.filters}>
      <View style={styles.filter}>
        <Text style={{ fontSize: 12 }}>Filter </Text>
        <Image
          source={require("../../assets/Filter.png")}
          // style={styles.categoryImage}
        />
      </View>
      <View style={styles.filter}>
        <Text style={{ fontSize: 12 }}>Category</Text>
        <Image
          source={require("../../assets/chevron-left.png")}
          // style={styles.categoryImage}
        />
      </View>
      <View style={styles.filter}>
        <Text style={{ fontSize: 12 }}>Offers</Text>
      </View>
      <View style={styles.filter}>
        <Text style={{ fontSize: 12 }}>Rating 4.0+</Text>
      </View>
      <View style={styles.filter}>
        <Text style={{ fontSize: 12 }}>Fast Delivery</Text>
      </View>
    </View>
  );
}

export default FilterBar;

const styles = StyleSheet.create({
  filters: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  filter: {
    flexDirection: "row",
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    fontSize: 12,
    borderColor: "#ACAAAA",
    borderWidth: 1,
    borderRadius: 20,
  },
  text: {
    color: "#363535",
  },
});
