import React from "react";
import { ScrollView, View } from "react-native";
import HeaderTabs from "./HeaderTabs";
import DropdownHeader from "./DropdownHeader";
import PLPFooter from "./PLPFooter";

interface Descriptor {
  images: string[];
  name: string;
  symbol: string;
}

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
  non_veg: boolean | null;
  price: {
    maximum_value: number;
    offer_percent: number | null;
    offer_value: number | null;
    value: number;
  };
  quantity: {
    available: {
      count: number;
    };
    maximum: {
      count: number;
    };
  };
  provider_id: string;
  veg: boolean;
}

interface PLPFnBProps {
  descriptor: Descriptor;
  catalog: CatalogItem[];
  dropdownHeaders: string[];
  vendorAddress: string;
  buttonTitles: string[];
  street: string;
  fssaiLiscenseNo: string;
  providerId: string | string[];
  handleOpenModal: () => void;
  searchString: string;

  foodDetails: (data: any) => void;
}

const PLPFnB: React.FC<PLPFnBProps> = ({
  descriptor,
  catalog,
  dropdownHeaders,
  vendorAddress,
  buttonTitles,
  street,
  fssaiLiscenseNo,
  providerId,
  handleOpenPress,
  foodDetails,
  searchString,
}) => {
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={{ paddingHorizontal: 10 }}>
        <HeaderTabs buttonTitles={buttonTitles} />
        <DropdownHeader
          dropdownHeaders={dropdownHeaders}
          dropdownData={catalog}
          providerId={providerId}
          handleOpenPress={handleOpenPress}
          foodDetails={foodDetails}
          searchString={searchString}
        />
      </View>
      <PLPFooter
        vendorName={descriptor.name}
        outletLocation={street}
        vendorAddress={vendorAddress}
        fssaiLiscenseNo={fssaiLiscenseNo}
      />
    </ScrollView>
  );
};

export default PLPFnB;
