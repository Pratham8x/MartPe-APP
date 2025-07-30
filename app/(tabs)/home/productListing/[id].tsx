import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import PLPBanner from "../../../../components/Product Listing Page/FoodAndBeverages/PLPBanner";
import Searchbox from "../../../../components/Product Listing Page/FoodAndBeverages/Searchbox";
import PLPGrocery from "../../../../components/Product Listing Page/Grocery/PLPGrocery";
import PLPFnB from "../../../../components/Product Listing Page/FoodAndBeverages/PLPFnB";
import PLPFashion from "../../../../components/Product Listing Page/Fashion/PLPFashion";
import PLPHomeAndDecor from "../../../../components/Product Listing Page/HomeAndDecor/PLPHomeAndDecor";
import PLPPersonalCare from "../../../../components/Product Listing Page/PersonalCare/PLPPersonalCare";
import PLPElectronics from "../../../../components/Product Listing Page/Electronics/PLPElectronics";
import { ActivityIndicator } from "react-native-paper";
import { getVendorById } from "../../../../gql/api/home/productListing";
import Loader from "../../../../components/common/Loader";
import DynamicButton from "../../../../components/common/DynamicButton";
import ImageComp from "../../../../components/common/ImageComp";
import useDeliveryStore from "../../../../state/deliveryAddressStore";
import { GetVendorByIdQuery } from "../../../../gql/graphql";
import { widthPercentageToDP } from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import { on } from "events";
import FoodDetailsComponent from "../../../../components/ProductDetails/FoodDetails";
interface Coords {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

interface UserLocation {
  coords: Coords;
  mocked?: boolean;
  timestamp: number;
}

interface Descriptor {
  images: string[];
  name: string;
  symbol: string;
}

interface Quantity {
  available: {
    count: number;
  };
  maximum: {
    count: number;
  };
}

interface CatalogItem {
  bpp_id: string;
  bpp_uri: string;
  catalog_id: string;
  category_id: string;
  descriptor: Descriptor;
  id: string;
  location_id: string;
  non_veg: boolean | null;
  price: {
    maximum_value: number;
    offer_percent: number | null;
    offer_value: number | null;
    value: number;
  };
  quantity: Quantity;
  provider_id: string;
  veg: boolean;
}

interface VendorData {
  address?: {
    area_code?: string;
    city?: string;
    locality?: string;
    state?: string;
    street?: string;
  };
  catalogs: CatalogItem[];
  descriptor: Descriptor;
  fssai_license_no?: string;
  geoLocation: {
    lat: number;
    lng: number;
    point: {
      coordinates: number[];
      type: string;
    };
  };
  storeSections: string[];
  domain: string;
  time_to_ship_in_hours: {
    avg: number;
    max: number;
    min: number;
  };
  panIndia: boolean;
  hyperLocal: boolean;
}

const PLP: React.FC = () => {
  const vendor = useLocalSearchParams();
  const animation = useRef(null);
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);
  const [foodDetails, setFoodDetails] = useState({
    images: "",
    long_desc: "",
    name: "",
    short_desc: "",
    symbol: "",
    price: "",
    storeId: "",
    maxQuantity: 0,
    itemId: "",
    visible: true,
    maxPrice: 0,
    discount: 0,
  });
  const [vendorData, setVendorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceable, setServiceable] = useState(false);
  const [searchString, setSearchString] = useState<string>("");
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleCollapsePress = () => bottomSheetRef.current?.collapse();
  const snapeToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);
  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  // will only fetch the data once after rendering
  useEffect(() => {
    async function domainDataFetch() {
      const payload = {
        getVendorByIdId: vendor.id,
      };
      const response = await getVendorById(payload);
      const { getVendorById: data } = response || {};
      console.log("selected", selectedDetails);
      setVendorData(data);
      console.log(data.address.city, selectedDetails?.city);
      checkServiceable(data);
    }
    domainDataFetch();
  }, []);

  const checkServiceable = (vendorData) => {
    // Assuming selectedDetails is globally defined
    const panIndia = vendorData?.panIndia;
    console.log("panIndia", panIndia);
    console.log("selectedDetails", selectedDetails);
    console.log("vendorData", vendorData?.address?.city);

    // Convert both cities to lowercase and trim them for a fair comparison
    const selectedCity = selectedDetails?.city?.toLowerCase().trim();
    const vendorCity = vendorData?.address?.city?.toLowerCase().trim();

    console.log("Comparing cities:", selectedCity, "vs", vendorCity);

    if (panIndia || selectedCity === vendorCity) {
      console.log("Serviceable: true");
      setIsLoading(false);
      setServiceable(true);
    } else {
      console.log("Serviceable: false");
      setIsLoading(false);
      setServiceable(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  // if (error) {
  //   return <Text style={{ color: "black" }}>Error: {error.message}</Text>;
  // }
  if (!vendorData) {
    return <Text style={{ color: "black" }}>No data available</Text>;
  }
  if (!serviceable) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          paddingBottom: 30,
        }}
      >
        <View style={styles.animationContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              // flex: 1,
              width: widthPercentageToDP("100"),
              // height: widthPercentageToDP("90"),
              backgroundColor: "#fff",
              // borderColor: "#000",
              // borderWidth: 1,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
           // source={require("../../../../assets/lottiefiles/no_store.json")}
          />
        </View>

        {/*  Your cart is empty  */}
        <View style={{ height: 50, alignItems: "center" }}>
          <Text
            style={{
              color: "#909095",
              fontWeight: "500",
              paddingHorizontal: Dimensions.get("screen").width * 0.1,
              textAlign: "center",
              // marginBottom: 20,
              // paddingBottom: 20,
              fontSize: 16,
            }}
          >
            The store is currently not serviceable in your area
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={() => router.push("/address/SavedAddresses")}
          style={{
            backgroundColor: "#030303",
            width: widthPercentageToDP("90"),
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 50,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600", fontSize: 20 }}>
            <MaterialCommunityIcons size={20} name="map-marker" />
            Change Location
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/(tabs)/home")}
          style={{
            borderColor: "#030303",
            width: widthPercentageToDP("90"),
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 50,
            alignItems: "center",
            borderWidth: 2,
            marginVertical: 10,
          }}
        >
          <Text style={{ color: "#030303", fontWeight: "600", fontSize: 20 }}>
            View other stores
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  // Banner data
  const { locality, street, city, state, area_code } =
    vendorData?.address || {};
  const vendorAddress = [locality, street, city, state, area_code]
    .filter((data) => data)
    .join(", ");

  const descriptor = vendorData?.descriptor;
  // Formatting the categories
  const storeCategories = vendorData.storeSections?.map((section) =>
    section
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toLowerCase())
      .replace(/^\w/, (c) => c.toUpperCase())
  );
  const storeSections = storeCategories?.join(", ") || "";
  const locationDetails = vendorData.geoLocation;
  // Dropdown data
  const catalog = vendorData.catalogs || [];
  function getUniqueCategories(data: CatalogItem[]) {
    return Array.from(new Set(data.map((item) => item.category_id)));
  }
  const dropdownHeaders = getUniqueCategories(catalog);
  // Footer data
  const fssaiLiscenseNo = vendorData.fssai_license_no || "";

  const buttonTitles = Array.from(
    new Set(
      vendorData.catalogs?.flatMap((button) =>
        Object.keys(button).flatMap((key) =>
          key !== "title" &&
          ["veg", "nonveg", "recommended", "topRated", "offers"].includes(
            key
          ) &&
          typeof button[key] === "boolean" &&
          button[key]
            ? key
            : []
        )
      ) || []
    )
  ).map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  const domain: string = vendorData.domain;

  // ||||||||||||||||| RENDER COMPONENTS BASED ON VENDOR DOMAIN |||||||||||||||||
  let ProductListingPage;
  switch (domain) {
    case "ONDC:RET10":
      ProductListingPage = (
        <PLPGrocery
          providerId={vendor?.id}
          catalog={catalog}
          sidebarTitles={dropdownHeaders}
          searchString={searchString}
        />
      );
      break;

    case "ONDC:RET11":
      ProductListingPage = (
        <PLPFnB
          buttonTitles={buttonTitles}
          descriptor={descriptor}
          vendorAddress={vendorAddress}
          catalog={catalog}
          dropdownHeaders={dropdownHeaders}
          street={street}
          fssaiLiscenseNo={fssaiLiscenseNo}
          providerId={vendor?.id}
          handleOpenModal={handleOpenPress}
          foodDetails={setFoodDetails}
          searchString={searchString}
          handleOpenPress={handleOpenPress}
        />
      );
      break;
    case "ONDC:RET12":
      ProductListingPage = (
        <PLPFashion headers={dropdownHeaders} catalog={catalog} />
      );
      break;
    case "ONDC:RET13":
      ProductListingPage = (
        <PLPPersonalCare
          providerId={vendor.id}
          catalog={catalog}
          sidebarTitles={dropdownHeaders}
          searchString={searchString}
        />
      );
      break;
    case "ONDC:RET14":
      // ProductListingPage = <PLPPersonalCare catalog={catalog} sidebarTitles={dropdownHeaders}/>
      ProductListingPage = (
        <PLPElectronics
          providerId={vendor.id}
          catalog={catalog}
          sidebarTitles={dropdownHeaders}
          searchString={searchString}
        />
      );
      break;
    case "ONDC:RET15":
      ProductListingPage = <Text>Create Elements for RET1</Text>;
      break;
    case "ONDC:RET16":
      ProductListingPage = <PLPHomeAndDecor catalog={catalog} />;
      break;

    default:
      ProductListingPage = <Text>Invaid Id</Text>;
      break;
  }

  const onInputChanged = (text) => {
    setSearchString(text);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#f8f9fa" }}>
        {/* store banner */}
        <PLPBanner
          address={vendorAddress}
          descriptor={descriptor}
          storeSections={storeSections}
          geoLocation={locationDetails}
          userLocation={selectedDetails}
          userAddress={selectedDetails?.fullAddress}
          vendorId={vendor.id}
        />

        {/* store search box */}
        <Searchbox
          search={onInputChanged}
          placeHolder={descriptor.name}
          catalog={catalog}
        />

        {/* plp page */}
        {ProductListingPage}
      </ScrollView>

      {/* product listing page item customization bottom sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        backgroundStyle={{ backgroundColor: "#FFFFFF" }}
        backdropComponent={renderBackdrop}
      >
        {foodDetails?.visible && (
          <FoodDetailsComponent foodDetails={foodDetails} />
        )}
      </BottomSheet>
    </View>
  );
};

export default PLP;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  stickyFooter: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
  },
  animationContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
