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
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import OfferCard3 from "../../../../components/Categories/OfferCard3";
import StoreCard3 from "../../../../components/Categories/StoreCard3";
import Search from "../../../../components/common/Search";
import { electronicsCategoryData } from "../../../../constants/categories";
import Loader from "../../../../components/common/Loader";
import { getDomainPageData } from "../../../../gql/api/domainPage";
import useDeliveryStore from "../../../../state/deliveryAddressStore";
import { useHideTabBarStore } from "../../../../state/hideTabBar";
import { filters, offerData, deliveryData } from "../../../../constants/filters";
import { Feather } from "@expo/vector-icons";
import FilterCard from "../../../../components/search/filterCard";
const screenWidth = Dimensions.get("window").width;
const domain = "ONDC:RET14";

function Electronics() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const setHideTabBar = useHideTabBarStore((state) => state.setHideTabBar);
  const [filterSelected, setFilterSelected] = useState({
    category: [],
    offers: 0,
    delivery: 100,
  });
  const containerHeight = 200;
  const [storesData, setStoresData] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
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
    return electronicsCategoryData.slice(0, 8).map((subCategory) => (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/(tabs)/home/result/[search]",
            params: {
              search: subCategory.name,
              domainData: "ONDC:RET14",
            },
          });
        }}
        style={styles.subCategory}
        key={subCategory.id}
      >
        <View style={styles.subCategoryImage}>
          <Image
            source={{ uri: subCategory.image }}
            resizeMode="contain"
            style={{ width: 80, height: 80 }}
          />
        </View>
        <Text style={styles.subHeadingText}>{subCategory.name}</Text>
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
            domain="ONDC:RET14"
            placeholder="Search for electronics.."
            showBackArrow={true}
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
            <Text style={styles.subHeadingText}>Explore New Gadgets</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.subCategories}>{renderSubCategories()}</View>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(tabs)/home/allCategories",
                params: { category: "electronics" },
              });
            }}
            style={styles.viewMoreButton}
          >
            <Text style={styles.viewMoreButtonText}>View More</Text>
            <Image
             // source={require("../assets/rightArrow.png")}
              // style={styles.categoryImage}
            />
          </TouchableOpacity>
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
            <StoreCard3
              categoryFiltered={filterSelected?.category}
              key={storeData?.id}
              storeData={storeData}
              color="red"
            />
          ))}
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        backgroundStyle={{ backgroundColor: "#FFFFFF" }}
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

export default Electronics;

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
    justifyContent: "center",
    flexWrap: "wrap",
    marginVertical: 8,
    gap: 5,
  },
  subCategory: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
  },
  subCategoryImage: {
    backgroundColor: "#FEEEEE",
    marginBottom: 5,
    borderRadius: 10,
    shadowColor: "#B1A5A5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 4,
    padding: 10,
  },
  subHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
    marginHorizontal: 10,
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
