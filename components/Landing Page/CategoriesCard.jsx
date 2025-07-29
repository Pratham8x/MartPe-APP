import { Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const CategoriesCard = ({ title, titleColor, bgColor, imgSrc }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.categoriesCard_container, backgroundColor: bgColor }}
    >
      <Text style={{ ...styles.categoriesCatd_title, color: titleColor }}>
        {title}
      </Text>
      {/* <View style={{ borderWidth: 1 }}> */}
      <Image
        source={require("../assets/categoriesImg.png")}
        style={styles.categoryImage}
      />
      {/* </View> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoriesCard_container: {
    width: "48%",
    paddingTop: 10,
    marginTop: 10,
    borderRadius: 7,
    height: 120,
    justifyContent: "space-between",
  },
  categoriesCatd_title: {
    fontSize: 13,
    fontWeight: "900",
    marginLeft: 10,
  },
  categoryImage: {
    width: 120,
    height: 80,
    alignSelf: "flex-end",
  },
});

export default CategoriesCard;
