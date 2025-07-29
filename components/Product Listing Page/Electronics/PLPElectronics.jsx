import { StyleSheet, View } from "react-native";
import { useState } from "react";
import HorizontalNavbar from "../Grocery/HorizontalNavbar";
import PersonalCareCardContainer from "../PersonalCare/PersonalCareCardContainer";

const PLPElectronics = ({
  catalog,
  sidebarTitles,
  providerId,
  searchString,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const buttons = [
    {
      title: "Audio",
      image: require("../../../assets/electronicsHeaderImage1.png"),
    },
    {
      title: "Camera",
      image: require("../../../assets/electronicsHeaderImage2.png"),
    },
    {
      title: "Computer Peripherals",
      image: require("../../../assets/electronicsHeaderImage3.png"),
    },
    {
      title: "Desktop & Laptop",
      image: require("../../../assets/electronicsHeaderImage4.png"),
    },
    {
      title: "Earphone",
      image: require("../../../assets/electronicsHeaderImage5.png"),
    },
    {
      title: "Gaming",
      image: require("../../../assets/electronicsHeaderImage6.png"),
    },
    {
      title: "Headphone",
      image: require("../../../assets/electronicsHeaderImage7.png"),
    },

    {
      title: "Mobile Phone",
      image: require("../../../assets/electronicsHeaderImage8.png"),
    },
    {
      title: "Accessories",
      image: require("../../../assets/electronicsHeaderImage9.png"),
    },
    {
      title: "Smart Watches",
      image: require("../../../assets/electronicsHeaderImage10.png"),
    },
  ];

  return (
    <View>
      <HorizontalNavbar
        navbarTitles={buttons}
        domainColor="rgba(255, 232, 232, 1)"
      />
      <PersonalCareCardContainer
        providerId={providerId}
        searchString={searchString}
        catalog={catalog}
      />
    </View>
  );
};

export default PLPElectronics;
