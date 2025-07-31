import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";

import OfferCard3 from "../../../../components/Categories/OfferCard3";
import { getDomainPageData } from "../../../../gql/api/domainPage";
import Search from "../../../../components/common/Search";
import { foodCategoryData } from "../../../../constants/categories";
import Loader from "../../../../components/common/Loader";

import StoreCard4 from "../../../../components/Categories/StoreCard4";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Carousel from "react-native-reanimated-carousel";
import useUserDetails from "../../../../hook/useUserDetails";
import useDeliveryStore from "../../../../state/deliveryAddressStore";
import { Entypo } from "@expo/vector-icons";
import FilterCard from "../../../../components/search/filterCard";
import { useHideTabBarStore } from "../../../../state/hideTabBar";
import { filters, offerData, deliveryData } from "../../../../constants/filters";
import FoodDetailsComponent from "../../../../components/ProductDetails/FoodDetails";

const domain = "ONDC:RET11";
const screenWidth = Dimensions.get("window").width;

function Food() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const setHideTabBar = useHideTabBarStore((state) => state.setHideTabBar);
  const [filterSelected, setFilterSelected] = useState({
    category: [],
    offers: 0,
    delivery: 100,
  });
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
  const containerHeight = 200;
  const [storesData, setStoresData] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [activeFilter, setActiveFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [bottonSheetIndex, setBottonSheetIndex] = useState(-1);

  const { userDetails, getUserDetails } = useUserDetails();
  const selectedAddress = useDeliveryStore((state) => state.selectedDetails);
  
  const payload = {
    domain: domain,
    loc: {
      lat: selectedAddress?.lat,
      lng: selectedAddress?.lng,
    },
    cityCode: "std:80",
  };

  useEffect(() => {
    getUserDetails();
  }, [getUserDetails]);

  const snapPoints = useMemo(() => ["30%", "40%", "50%", "60%", "75%"], []);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };
  
  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };
  
  const handleCollapsePress = () => {
    bottomSheetRef.current?.collapse();
  };
  
  const snapeToIndex = (index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  };

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

  // Fetch domain data
  useEffect(() => {
    async function domainDataFetch() {
      try {
        const response = await getDomainPageData(payload);
        const { getDomainPageData: data } = response || {};
        const { stores, offers } = data || {};
        
        if (stores) {
          const filteredStores = stores.filter(
            (obj: any) => Object.keys(obj).length > 0
          );
          setStoresData(filteredStores);
        }
        
        if (offers) {
          const filteredOffers = offers.filter(
            (obj: any) => Object.keys(obj).length > 0
          );
          setOffersData(filteredOffers);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching domain data:", error);
        setIsLoading(false);
      }
    }
    domainDataFetch();
  }, []);

  // Flatten the catalogs from each store into a single array
  const allCatalogs = storesData?.flatMap((store: any) => store?.catalogs || []) || [];

  // Extract unique category_id values
  const uniqueCategoryIds = Array.from(
    new Set(allCatalogs?.map((catalog: any) => catalog?.category_id).filter(Boolean))
  ).map((category_id, index) => ({
    id: index + 1,
    label: category_id,
    value: category_id,
  }));

  const renderSubCategories = () => {
    return foodCategoryData.slice(0, 8)?.map((subCategory: any) => (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(tabs)/home/result/[search]",
            params: { search: subCategory?.name, domainData: domain },
          });
        }}
        style={styles.subCategory}
        key={subCategory?.id}
      >
        <View style={styles.subCategoryImage}>
          <Image
            source={{
              uri: subCategory?.image,
            }}
            resizeMode="contain"
            style={{ width: 80, height: 60 }}
          />
        </View>
        <Text style={styles.subCategoryName}>{subCategory?.name}</Text>
      </TouchableOpacity>
    ));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!storesData && !offersData) {
    return <Text style={{ color: "black" }}>No data available</Text>;
  }

  const filteredStores = storesData.filter((store: any) => {
    const meetsCategoryCriteria =
      filterSelected.category.length === 0 ||
      (store.catalogs && store.catalogs.some((catalog: any) =>
        filterSelected.category.includes(catalog.category_id)
      ));
    
    const meetsOfferCriteria =
      filterSelected.offers === 0 ||
      (store.calculated_max_offer?.percent >= filterSelected.offers);
    
    const meetsDeliveryCriteria =
      filterSelected.delivery === 100 ||
      (store?.time_to_ship_in_hours?.avg !== undefined && 
       store.time_to_ship_in_hours.avg <= filterSelected.delivery);

    return meetsCategoryCriteria && meetsOfferCriteria && meetsDeliveryCriteria;
  });

  const getFilterDisplayText = (filterName: string) => {
    switch (filterName) {
      case "Category":
        return "Category " + (filterSelected.category.length > 0
          ? `(${filterSelected.category.length})`
          : "");
      case "Offers":
        return filterSelected.offers > 0
          ? filterSelected.offers + "% and above"
          : "Offers";
      case "Delivery":
        return filterSelected.delivery < 100
          ? filterSelected.delivery + " or min "
          : "Delivery";
      default:
        return filterName;
    }
  };

  const isFilterActive = (filterName: string) => {
    switch (filterName) {
      case "Category":
        return filterSelected.category.length > 0;
      case "Offers":
        return filterSelected.offers > 0;
      case "Delivery":
        return filterSelected.delivery < 100;
      default:
        return false;
    }
  };

  const resetFilter = (filterName: string) => {
    setFilterSelected(prev => ({
      ...prev,
      category: filterName === "Category" ? [] : prev.category,
      offers: filterName === "Offers" ? 0 : prev.offers,
      delivery: filterName === "Delivery" ? 100 : prev.delivery,
    }));
  };

  const hasActiveFilters = () => {
    return filterSelected.category.length > 0 ||
           filterSelected.delivery !== 100 ||
           filterSelected.offers !== 0;
  };

  return (
    <View style={{ flex: 1 }}>
      {/* domain search bar */}
      <View style={styles.headerContainer}>
        <Search
          placeholder="Search for food.."
          showBackArrow={true}
          showLocation={false}
          domain={domain}
        />
      </View>

      <ScrollView style={styles.container}>
        {/* food offer cards */}
        {offersData && offersData?.length > 0 ? (
          <Carousel
            loop
            width={screenWidth}
            height={containerHeight}
            autoPlay={true}
            data={offersData}
            scrollAnimationDuration={1000}
            autoPlayInterval={5000}
            renderItem={({ item, index }) => (
              <OfferCard3 offerData={item} key={index} />
            )}
          />
        ) : null}

        {/* explore food categories */}
        <View style={{ backgroundColor: "#fff", paddingBottom: 50 }}>
          {/* section header: {userDetails?.firstName} what's on your mind */}
          <View style={styles.subHeading}>
            <Text style={styles.subHeadingText}>
              {userDetails && userDetails?.firstName
                ? `${userDetails?.firstName}, whats on your mind ?`
                : "Whats on your mind ?"}
            </Text>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/home/allCategories",
                  params: { category: "food" },
                });
              }}
            >
              <Text
                style={{ color: "#FF9130", fontSize: 14, fontWeight: "500" }}
              >
                See all
                <Entypo name="chevron-small-right" size={14} color="#FF9130" />
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* section items: domain subcategories */}
          <View style={styles.subCategories}>{renderSubCategories()}</View>

          {/* Filter Bar */}
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <ScrollView
              style={{
                flexDirection: "row",
                marginVertical: Dimensions.get("screen").width * 0.02,
                position: "relative",
                marginHorizontal: Dimensions.get("screen").width * 0.03,
              }}
              horizontal
            >
              {filters.map((filter, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor: isFilterActive(filter.name) ? "black" : "#EEEEEE",
                    backgroundColor: "white",
                    borderRadius: 100,
                    paddingHorizontal: Dimensions.get("screen").width * 0.03,
                    paddingVertical: Dimensions.get("screen").width * 0.015,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: Dimensions.get("screen").width * 0.01,
                    flexDirection: "row",
                  }}
                  onPress={() => {
                    handleOpenPress();
                    setActiveFilter(filter?.name);
                    setIsFilterVisible(true);
                    setFoodDetails({ ...foodDetails, visible: false });
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "600" }}>
                    {getFilterDisplayText(filter.name)}
                  </Text>

                  <Pressable
                    style={{
                      display: isFilterActive(filter.name) ? "flex" : "none",
                      marginLeft: 5,
                    }}
                    onPress={() => resetFilter(filter.name)}
                  >
                    <Feather name="x" size={16} color="black" />
                  </Pressable>
                </TouchableOpacity>
              ))}
              
              {hasActiveFilters() && (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "#F13A3A",
                    backgroundColor: "white",
                    borderRadius: 100,
                    paddingHorizontal: Dimensions.get("screen").width * 0.03,
                    paddingVertical: Dimensions.get("screen").width * 0.01,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: Dimensions.get("screen").width * 0.03,
                  }}
                  onPress={() => {
                    setFilterSelected({
                      category: [],
                      offers: 0,
                      delivery: 100,
                    });
                  }}
                >
                  <Text style={{ color: "#F13A3A" }}>Reset</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
          
          <View style={styles.subHeading}>
            <Text style={styles.subHeadingText}>
              {storesData?.length > 0
                ? `Explore ${filteredStores?.length} Restaurants nearby`
                : "No Nearby Restaurants Found"}
            </Text>
          </View>
          
          {/* restaurants info */}
          <View
            style={{
              marginVertical: 10,
              height: "100%",
              backgroundColor: "#f8f9fa",
            }}
          >
            {filteredStores.map((storeData, index) => (
              <StoreCard4
                categoryFiltered={filterSelected?.category}
                key={storeData?.id}
                storeData={storeData}
                foodDetails={setFoodDetails}
                handleOpenPress={handleOpenPress}
                index={index}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* bottom sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={bottonSheetIndex}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        backgroundStyle={{
          backgroundColor: "#fff",
          borderRadius: 20,
        }}
        backdropComponent={renderBackdrop}
      >
        {isFilterVisible && !foodDetails.visible && (
          <FilterCard
            options={filters}
            activeOption={activeFilter}
            selectOption={setFilterSelected}
            categoryData={uniqueCategoryIds}
            filterSelected={filterSelected}
            offerData={offerData}
            deliveryData={deliveryData}
            setActiveOption={setActiveFilter}
            closeFilter={handleClosePress}
          />
        )}
        {foodDetails?.visible && (
          <FoodDetailsComponent foodDetails={foodDetails} />
        )}
      </BottomSheet>
    </View>
  );
}

export default Food;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  headerContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 5,
  },
  subCategories: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginVertical: 5,
    rowGap: 5,
  },
  subCategory: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
  },
  subCategoryImage: {},
  subHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  subHeadingText: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
    marginVertical: 10,
  },
  subCategoryName: {
    fontWeight: "400",
    fontSize: 12,
  },
});