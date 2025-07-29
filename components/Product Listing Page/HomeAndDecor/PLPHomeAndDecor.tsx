import React from "react";
import { StyleSheet, View } from "react-native";
import HomeAndDecorHeaderTabs from "./HomeAndDecorHeaderTabs";
import PLPCardContainer from "../Fashion/PLPCardContainer";

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

interface PLPHomeAndDecorProps {
  catalog: CatalogItem[];
}

const PLPHomeAndDecor: React.FC<PLPHomeAndDecorProps> = ({ catalog }) => {
  return (
    <View>
      <HomeAndDecorHeaderTabs />
      <PLPCardContainer domainColor="rgba(252, 225, 89, 1)" catalog={catalog} />
    </View>
  );
};

export default PLPHomeAndDecor;

const styles = StyleSheet.create({});
