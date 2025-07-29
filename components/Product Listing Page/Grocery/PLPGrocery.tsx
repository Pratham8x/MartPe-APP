import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import GroceryCardContainer from "./GroceryCardContainer";
import HorizontalNavbar from "./HorizontalNavbar";

interface PLPGroceryProps {
  providerId: string;
  searchString: string;
  sidebarTitles: string[];
  catalog: {
    category_id: string;
    descriptor: {
      name: string;
    };
    price: {
      value: number;
    };
  }[];
}

const PLPGrocery: React.FC<PLPGroceryProps> = ({
  sidebarTitles,
  catalog,
  providerId,
  searchString,
}) => {
  const [selectedCategoryDemo, setSelectedCategoryDemo] = useState<
    string | null
  >(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategoryDemo(category);
  };

  const buttons = [
    {
      title: "Fruits & Vegetables",
      titleAlternative: "Fruits and Vegetables",
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
  ];

  return (
    <View>
      <HorizontalNavbar
        navbarTitles={buttons}
        onFilterSelect={handleCategorySelect}
        domainColor="rgba(240, 255, 197, 1)"
      />
      <GroceryCardContainer
        catalog={catalog}
        searchString={searchString}
        selectedCategory={selectedCategoryDemo}
        providerId={providerId}
      />
    </View>
  );
};

export default PLPGrocery;

const styles = StyleSheet.create({
  groceryContainer: {},
});
