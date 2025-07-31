import React, { useState, useEffect, useMemo, useRef } from "react";
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
import { LinearGradient } from "expo-linear-gradient";

import StoreCard from "../../../../components/Categories/StoreCard";
import OfferCard2 from "../../../../components/Categories/Offercard2";
import Search from "../../../../components/common/Search";
import { getDomainPageData } from "../../../../gql/api/domainPage";
import { groceriesCategoryData } from "../../../../constants/categories";
import Loader from "../../../../components/common/Loader";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import useDeliveryStore from "../../../../state/deliveryAddressStore";
import { Entypo } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";
import Carousel from "react-native-reanimated-carousel";
import OfferCard3 from "../../../../components/Categories/OfferCard3";
import FilterCard from "../../../../components/search/filterCard";
import { useHideTabBarStore } from "../../../../state/hideTabBar";
import { filters, offerData, deliveryData } from "../../../../constants/filters";
import { Feather } from "@expo/vector-icons";
const domain = "ONDC:RET10";

function Grocery() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const setHideTabBar = useHideTabBarStore((state) => state.setHideTabBar);
  const [filterSelected, setFilterSelected] = useState({
    category: [],
    offers: 0,
    delivery: 100,
  });
  const screenWidth = Dimensions.get("window").width;
  const containerHeight = 200;
  const [storesData, setStoresData] = useState([]);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [offersData, setOffersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bottonSheetIndex, setBottonSheetIndex] = useState(-1);
  const [filterApplied, setFilterApplied] = useState<string>("");

  const selectedAddress = useDeliveryStore((state) => state.selectedDetails);
  const payload = {
    domain: domain,
    loc: {
      lat: selectedAddress?.lat,
      lng: selectedAddress?.lng,
    },
    // radius: 15000,
    cityCode: "std:80",
  };

  const snapPoints = useMemo(() => ["30%", "40%", "50%", "60%", "70%"], []);

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
      const response = await getDomainPageData(payload);
      const { getDomainPageData: data } = response || {};
      const { stores, offers } = data || {};
      setStoresData(stores);
      setOffersData(offers);
      setIsLoading(false);
    }
    domainDataFetch();
  }, []);

  const allCatalogs = storesData?.flatMap((store) => store.catalogs);

  // Extract unique category_id values
  const uniqueCategoryIds = Array.from(
    new Set(allCatalogs?.map((catalog) => catalog?.category_id))
  ).map((category, index) => ({
    id: index + 1,
    label: category,
    value: category,
  }));

  useEffect(() => {
    console.log("unique catalogs lengths", allCatalogs?.length);
  });

  const renderSubCategories = () => {
    return groceriesCategoryData.slice(0, 6).map((subCategory) => (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(tabs)/home/result/[search]",
            params: { search: subCategory.name, domainData: domain },
          });
        }}
        style={styles.subCategory}
        key={subCategory.id}
      >
        <LinearGradient
          colors={["#E3F9BE", "rgba(231, 223, 201, 0)"]}
          style={styles.subCategoryImage}
        >
          <Image
            source={{ uri: subCategory.image }}
            resizeMode="contain"
            style={{ width: 100, height: 80 }}
          />
        </LinearGradient>
        <Text numberOfLines={1} style={styles.subCategoryName}>
          {subCategory?.name}
        </Text>
      </TouchableOpacity>
    ));
  };

  if (isLoading) {
    return <Loader />;
  }
  // if (error) {
  //   return <Text style={{ color: "black" }}>Error: {error.message}</Text>;
  // }
  if (!storesData && !offersData) {
    return <Text style={{ color: "black" }}>No data available</Text>;
  }

  const filteredStores = storesData.filter((store) => {
    const meetsCategoryCriteria =
      filterSelected.category.length == 0 ||
      store.catalogs.some((catalog) =>
        filterSelected.category.includes(catalog.category_id)
      );
    const meetsOfferCriteria =
      filterSelected.offers === 0 ||
      store.calculated_max_offer.percent >= filterSelected.offers;
    const meetsDeliveryCriteria =
      filterSelected.delivery === 100 ||
      store?.time_to_ship_in_hours?.avg <= filterSelected.delivery;

    return meetsCategoryCriteria && meetsOfferCriteria && meetsDeliveryCriteria;
  });

  return (
    <View style={{ flex: 1 }}>
      {/* domain search bar */}
      <View style={styles.headerContainer}>
        <Search
          placeholder="Search for groceries.."
          showBackArrow={true}
          showLocation={false}
          domain={domain}
        />
      </View>
      <ScrollView style={styles.container}>
        {/* grocery offer cards */}
        {offersData && offersData?.length > 0 ? (
          <Carousel
            loop
            width={screenWidth}
            height={containerHeight}
            autoPlay={true}
            data={offersData}
            scrollAnimationDuration={1000}
            autoPlayInterval={5000}
            // onSnapToItem={(index) => console.log("current index:", index)}
            renderItem={({ item, index }) => (
              <OfferCard3 offerData={item} key={index} />
            )}
          />
        ) : null}

        {/* explore grocery categories */}
        <View style={{ backgroundColor: "#fff" }}>
          {/* explore by categories */}
          <View style={styles.subHeading}>
            <Text style={styles.subHeadingText}>Explore by Categories</Text>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/(tabs)/home/allCategories",
                  params: { category: "groceries" },
                });
              }}
            >
              <Text
                style={{ color: "#FF9130", fontSize: 14, fontWeight: "500" }}
              >
                See all{" "}
                <Entypo name="chevron-small-right" size={14} color="#FF9130" />
              </Text>
            </TouchableOpacity>
          </View>

          {/* sub categories */}
          <View style={styles.subCategories}>{renderSubCategories()}</View>

          {/* stores near me */}
          <View style={styles.subHeading}>
            <Text style={styles.subHeadingText}>
              {storesData?.length > 0
                ? `Explore ${filteredStores?.length} Stores Near me`
                : "No Nearby Stores Found"}
            </Text>
          </View>

          {/* <FilterBar /> */}
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
                    borderColor:
                      (filter.name === "Category" &&
                        filterSelected.category.length > 0) ||
                      (filter.name === "Offers" && filterSelected.offers > 0) ||
                      (filter.name === "Delivery" &&
                        filterSelected.delivery < 100)
                        ? "black"
                        : "#EEEEEE",
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
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "600" }}>
                    {
                      {
                        Category:
                          "Category " +
                          (filterSelected.category.length > 0
                            ? `(${filterSelected.category.length})`
                            : ""),
                        Offers:
                          filterSelected.offers > 0
                            ? filterSelected.offers + "% and above"
                            : "Offers",
                        Delivery:
                          filterSelected.delivery < 100
                            ? filterSelected.delivery + " or min "
                            : "Delivery",
                      }[filter?.name]
                    }
                  </Text>

                  <Pressable
                    style={{
                      display:
                        (filter.name === "Category" &&
                          filterSelected.category.length > 0) ||
                        (filter.name === "Offers" &&
                          filterSelected.offers > 0) ||
                        (filter.name === "Delivery" &&
                          filterSelected.delivery < 100)
                          ? "flex"
                          : "none",
                      marginLeft: 5,
                    }}
                    onPress={() => {
                      setFilterSelected({
                        category:
                          filter.name === "Category"
                            ? []
                            : filterSelected.category,
                        offers:
                          filter.name === "Offers" ? 0 : filterSelected.offers,
                        delivery:
                          filter.name === "Delivery"
                            ? 100
                            : filterSelected.delivery,
                      });
                    }}
                  >
                    <Feather name="x" size={16} color="black" />
                  </Pressable>
                </TouchableOpacity>
              ))}
              {(filterSelected.category.length > 0 ||
                filterSelected.delivery !== 100 ||
                filterSelected.offers !== 0) && (
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
            <Text style={styles.subHeadingText}>Stores Near me</Text>
          </View>
          <View style={{ backgroundColor: "#f7f7f8" }}>
            {filteredStores?.map((storeData) => (
              <StoreCard
                categoryFiltered={filterSelected?.category}
                key={storeData?.id}
                storeData={storeData}
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
        {isFilterVisible && (
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
      </BottomSheet>
    </View>
  );
}

export default Grocery;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
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
    justifyContent: "center",
    flexWrap: "wrap",
    // marginTop: 10,
    marginHorizontal: 2,
  },
  subCategory: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 7,
    marginVertical: 10,
  },
  subCategoryName: {
    fontWeight: "400",
    fontSize: 10,
    maxWidth: 100,
  },
  subCategoryImage: {
    alignItems: "center",
    justifyContent: "flex-end",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
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
  viewMoreButton: {
    flexDirection: "row",
    paddingLeft: 8,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    borderRadius: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#898989",
  },
  viewMoreButtonText: {
    color: "#FB9191",
    fontSize: 12,
    fontWeight: "500",
  },
});
