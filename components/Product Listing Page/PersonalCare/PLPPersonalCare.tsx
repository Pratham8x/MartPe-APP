import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import HorizontalNavbar from "../Grocery/HorizontalNavbar";
import PersonalCareCardContainer from "./PersonalCareCardContainer";

interface CatalogItem {
  bpp_id: string;
  bpp_uri: string;
  catalog_id: string;
  category_id: string;
  descriptor: {
    images: string[];
    long_desc: string;
    name: string;
    short_desc: string;
    symbol: string;
  };
  id: string;
  location_id: string;
  non_veg: any;
  price: {
    maximum_value: number;
    offer_percent: any;
    offer_value: any;
    value: number;
  };
  provider_id: string;
  quantity: {
    available: any;
    maximum: any;
  };
  veg: any;
}

interface PLPPersonalCareProps {
  catalog: CatalogItem[];
  sidebarTitles: string[];
  providerId: string | string[];
  searchString: string;
}

const PLPPersonalCare: React.FC<PLPPersonalCareProps> = ({
  catalog,
  sidebarTitles,
  providerId,
  searchString,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const buttons = [
    {
      title: "Bath & Body",
      image: require("../../../assets/bpcHeaderImage1.png"),
    },
    {
      title: "Feminine Care",
      image: require("../../../assets/bpcHeaderImage2.png"),
    },
    {
      title: "Fragnance",
      image: require("../../../assets/bpcHeaderImage3.png"),
    },
    {
      title: "Hair Care",
      image: require("../../../assets/bpcHeaderImage4.png"),
    },
    {
      title: "Oral Care",
      image: require("../../../assets/bpcHeaderImage5.png"),
    },
    {
      title: "Make Up",
      image: require("../../../assets/bpcHeaderImage6.png"),
    },
    {
      title: "Skin Care",
      image: require("../../../assets/bpcHeaderImage1.png"),
    },

    {
      title: "Bath & Body",
      image: require("../../../assets/bpcHeaderImage1.png"),
    },
    {
      title: "Feminine Care",
      image: require("../../../assets/bpcHeaderImage2.png"),
    },
    {
      title: "Fragnance",
      image: require("../../../assets/bpcHeaderImage3.png"),
    },
    {
      title: "Hair Care",
      image: require("../../../assets/bpcHeaderImage4.png"),
    },
    {
      title: "Oral Care",
      image: require("../../../assets/bpcHeaderImage5.png"),
    },
    {
      title: "Make Up",
      image: require("../../../assets/bpcHeaderImage6.png"),
    },
    {
      title: "Skin Care",
      image: require("../../../assets/bpcHeaderImage1.png"),
    },
  ];

  return (
    <View>
      {/* <SidebarNavigation
      domainColor="rgba(255, 211, 237, 1)"
        sidebarTitles={sidebarTitles}
        onSelectCategory={handleCategorySelect}
      /> */}
      <HorizontalNavbar
        navbarTitles={buttons}
        domainColor="rgba(255, 211, 237, 1)"
      />

      <PersonalCareCardContainer
        searchString={searchString}
        providerId={providerId}
        catalog={catalog}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PLPPersonalCare;
