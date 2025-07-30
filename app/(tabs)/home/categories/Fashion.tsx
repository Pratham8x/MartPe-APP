import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";

import OfferCard3 from "../../../../components/Categories/OfferCard3";
import StoreCard2 from "../../../../components/Categories/StoreCard2";
import { useGraphQLQuery } from "../../../../gql/queries/useGraphql/useGraphql";
import Search from "../../../../components/common/Search";
import { fashionCategoryData } from "../../../../constants/categories";
import Loader from "../../../../components/common/Loader";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { getDomainPageData } from "../../../../gql/api/domainPage";
import useDeliveryStore from "../../../../state/deliveryAddressStore";
import FilterCard from "../../../../components/search/filterCard";
import { useHideTabBarStore } from "../../../../state/hideTabBar";
import { filters, offerData, deliveryData } from "../../../../constants/filters";
import { Feather } from "@expo/vector-icons";
const domain = "ONDC:RET12";

function Fashion() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const setHideTabBar = useHideTabBarStore((state) => state.setHideTabBar);
  const [filterSelected, setFilterSelected] = useState({
    category: [],
    offers: 0,
    delivery: 100,
  });
  const [activeFilter, setActiveFilter] = useState<string>("");
  const screenWidth = Dimensions.get("window").width;
  const containerHeight = 200;
  const [bottonSheetIndex, setBottonSheetIndex] = useState(-1);
  const [storesData, setStoresData] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedAddress = useDeliveryStore((state) => state.selectedDetails);
  const payload = {
    domain: domain,
    // radius: 15000,
    loc: {
      lat: selectedAddress?.lat,
      lng: selectedAddress?.lng,
    },
    cityCode: "std:80",
  };
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

  const renderSubCategories = () => {
    return fashionCategoryData.slice(0, 4).map((subCategory) => (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(tabs)/home/result/[search]",
            params: { search: subCategory.name, domainData: "ONDC:RET12" },
          });
        }}
        style={styles.subCategory}
        key={subCategory.id}
      >
        <Image
          source={{ uri: subCategory?.image }}
          style={styles.subCategoryImage}
        />
        <LinearGradient
          colors={["black", "rgba(0, 0, 0, 0.1)"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          style={styles.subCategoryTextContainer}
        >
          <Text style={styles.subCategoryText}>{subCategory?.name}</Text>
        </LinearGradient>
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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Search
            placeholder="Search to style your wardrobe.."
            showBackArrow={true}
            domain="ONDC:RET12"
            showLocation={false}
          />
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          // contentContainerStyle={styles.sliderContent}
          // showsHorizontalScrollIndicator={false}
        >
          {offersData?.map((data, index) => (
            <OfferCard3 offerData={data} key={index} />
          ))}
        </ScrollView>

        <View>
          <View style={styles.subHeading}>
            <View style={styles.line} />
            <Text style={styles.subHeadingText}>Explore by Category</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.subCategories}>{renderSubCategories()}</View>
          <View style={styles.subHeading}>
            <View style={styles.line} />
            <Text style={styles.subHeadingText}>Outlets Near me</Text>
            <View style={styles.line} />
          </View>
          <ScrollView
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              marginTop: 10,
            }}
            horizontal
          >
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
                        (filter.name === "Offers" &&
                          filterSelected.offers > 0) ||
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
                            filter.name === "Offers"
                              ? 0
                              : filterSelected.offers,
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
          </ScrollView>
          {filteredStores?.map((storeData) => (
            <StoreCard2
              categoryFiltered={filterSelected?.category}
              key={storeData.id}
              storeData={storeData}
            />
          ))}
        </View>
      </ScrollView>
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

export default Fashion;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  subCategories: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  subCategory: {
    position: "relative",
    margin: 2,
    height: 170,
    width: 90,
  },
  subCategoryText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    textTransform: "uppercase",
    flex: 1,
  },
  subCategoryTextContainer: {
    position: "absolute",
    bottom: 0,
    width: 90,
    textTransform: "uppercase",
  },
  subCategoryImage: {
    width: 90,
    height: 170,
    objectFit: "cover",
  },
  subHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  subHeadingText: {
    fontSize: 14,
    fontWeight: "500",
  },
  viewMoreButton: {
    flexDirection: "row",
    paddingLeft: 8,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#898989",
    marginTop: 10,
  },
  viewMoreButtonText: {
    color: "#FB9191",
    fontSize: 12,
    fontWeight: "500",
  },
});
