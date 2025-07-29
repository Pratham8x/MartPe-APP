import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const buttons = [
  {
    title: "Fruits & Vegetables",
    image: require("../../../assets/headerImage1.png"),
  },
  {
    title: "Masala & Seasoning",
    image: require("../../../assets/headerImage2.png"),
  },
  {
    title: "Oil & Ghee",
    image: require("../../../assets/headerImage3.png"),
  },
  {
    title: "Edibles",
    image: require("../../../assets/headerImage4.png"),
  },
  {
    title: "Food Grains",
    image: require("../../../assets/headerImage5.png"),
  },
  {
    title: "Eggs & Meat",
    image: require("../../../assets/headerImage6.png"),
  },
  {
    title: "Fruits & Vegetables",
    image: require("../../../assets/headerImage1.png"),
  },
  {
    title: "Masala & Seasoning",
    image: require("../../../assets/headerImage2.png"),
  },
  {
    title: "Oil & Ghee",
    image: require("../../../assets/headerImage3.png"),
  },
  {
    title: "Edibles",
    image: require("../../../assets/headerImage4.png"),
  },
  {
    title: "Food Grains",
    image: require("../../../assets/headerImage5.png"),
  },
  {
    title: "Eggs & Meat",
    image: require("../../../assets/headerImage6.png"),
  },
  {
    title: "All",
    // image: require("../../../assets/headerImage6.png"),
  },
];

const HorizontalNavbar = ({ domainColor, navbarTitles, onFilterSelect }) => {
  const bgColor = domainColor.slice(0, -3);
  const gradientColors = [
    bgColor + "1)",
    bgColor + "0.7486)",
    bgColor + "0.1)",
  ];
  return (
    <LinearGradient
      colors={[gradientColors[0], gradientColors[1], gradientColors[2]]}
      start={[0, 0]}
      end={[0, 1]}
      style={{
        marginHorizontal: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderRadius: 10,
      }}
    >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {buttons.map((button) => (
          <TouchableOpacity
            onPress={() => onFilterSelect(button.title)}
            style={styles.horizontalNavbarButtons}
            key={button.title}
          >
            <Image style={styles.horizontalNavbarImage} source={button.image} />
            <Text style={styles.horizontalNavbarText}>
              {button.title.length > 7
                ? button.title.slice(0, 7) + "..."
                : button.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default HorizontalNavbar;

const styles = StyleSheet.create({
  horizontalNavbarButtons: {
    alignItems: "center",
    width: 65,
  },
  horizontalNavbarImage: {
    height: 50,
    width: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
  horizontalNavbarText: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 5,
  },
});
