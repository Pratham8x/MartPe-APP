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
import { LinearGradient } from "expo-linear-gradient";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import StoreCard from "../../../../components/Categories/StoreCard";
import OfferCard2 from "../../../../components/Categories/Offercard2";
import Search from "../../../../components/common/Search";
import { personalCareCategoryData } from "../../../../constants/categories";
import Loader from "../../../../components/common/Loader";
import { getDomainPageData } from "../../../../gql/api/domainPage";
import useUserDetails from "../../../../hook/useUserDetails";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useDeliveryStore from "../../../../state/deliveryAddressStore";
import { widthPercentageToDP } from "react-native-responsive-screen";
import FilterCard from "../../../../components/search/filterCard";
import { useHideTabBarStore } from "../../../../state/hideTabBar";
import { filters, offerData, deliveryData } from "../../../../constants/filters";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
const domain = "ONDC:RET13";
const domainColor = "#FF4B9C";
const domainBorderColor = `${domainColor}80`;
const payload = {
  domain: domain,
  loc: {
    lat: 22.31,
    lng: 73.16,
  },
  cityCode: "std:80",
};

function PersonalCare() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const setHideTabBar = useHideTabBarStore((state) => state.setHideTabBar);
  const [filterSelected, setFilterSelected] = useState({
    category: [],
    offers: 0,
    delivery: 100,
  });

  const [bottonSheetIndex, setBottonSheetIndex] = useState(-1);
  const [filterApplied, setFilterApplied] = useState<string>("");
  const screenWidth = Dimensions.get("window").width;
  const containerHeight = 200;
  const [storesData, setStoresData] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { userDetails, getUserDetails } = useUserDetails();

  useEffect(() => {
    getUserDetails();
  }, []);
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
  console.log("unique catalogs lengths", allCatalogs?.length);

  // Extract unique category_id values
  const uniqueCategoryIds = Array.from(
    new Set(allCatalogs?.map((catalog) => catalog?.category_id))
  ).map((category, index) => ({
    id: index + 1,
    label: category,
    value: category,
  }));

  const renderSubCategories = () => {
    return personalCareCategoryData.slice(0, 8).map((subCategory) => (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "(tabs)/home/result/[search]",
            params: { search: subCategory.name, domainData: domain },
          });
        }}
        style={styles.subCategory}
        key={subCategory.id}
      >
        <LinearGradient
          colors={["#FDBAE2", "rgba(255, 146, 211, 0)"]}
          style={styles.subCategoryImage}
        >
          <Image
            source={{ uri: subCategory.image }}
            resizeMode="contain"
            style={{
              width: widthPercentageToDP(20),
              height: widthPercentageToDP(20),
            }}
          />
        </LinearGradient>
        <Text style={styles.subCategoryName}>{subCategory.name}</Text>
      </TouchableOpacity>
    ));
  };

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
    <View style={styles.container}>
      {/* domain search bar */}
      <View style={styles.headerContainer}>
        <Search
          placeholder="Search for beauty products.."
          showBackArrow={true}
          showLocation={false}
          domain={domain}
          domainColor={domainColor}
        />
      </View>
      <ScrollView style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          // contentContainerStyle={styles.sliderContent}
          // showsHorizontalScrollIndicator={false}
        >
          {offersData?.map((data, index) => (
            <OfferCard2 offerData={data} key={index} />
          ))}
        </ScrollView>
        <LinearGradient
          colors={[`${domainColor}95`, "rgba(255, 255, 255, 1)"]}
          style={{ paddingVertical: 12 }}
        />
        <View>
          <Text style={styles.subHeadingText}>
            {userDetails && userDetails?.firstName
              ? `Hey ${userDetails?.firstName}, `
              : " "}
            Explore the world of beauty
          </Text>
          <View style={styles.subCategories}>{renderSubCategories()}</View>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/(tabs)/home/allCategories",
                params: { category: "personalCare" },
              });
            }}
            style={styles.viewMoreButton}
          >
            <Text style={styles.viewMoreButtonText}>View More</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={12}
              color={domainColor}
            />
          </TouchableOpacity>

          {/* Stores near me */}
          <View style={styles.subHeading}>
            <Text style={styles.subHeadingText}>
              {filteredStores?.length > 0
                ? `Explore ${filteredStores?.length} Stores Near me`
                : "No Nearby Stores Found"}
            </Text>
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
          <View>
            {storesData?.map((storeData) => (
              <StoreCard
                categoryFiltered={filterSelected?.category}
                key={storeData?.id}
                storeData={storeData}
              />
            ))}
          </View>
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

export default PersonalCare;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    // paddingVertical: 10,
  },
  subCategories: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginVertical: 10,
    marginHorizontal: 5,
    rowGap: 10,
    // gap: 5,
  },
  subCategory: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
  },
  subCategoryImage: {
    marginBottom: 4,
    paddingTop: 30,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
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
    color: domainColor,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "capitalize",
    marginVertical: 10,
  },
  subCategoryName: {
    textAlign: "center",
    textTransform: "capitalize",
    fontWeight: "400",
    fontSize: 10,
    maxWidth: 100,
  },
  viewMoreButton: {
    flexDirection: "row",
    paddingLeft: 8,
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 2,
    marginVertical: 10,
    borderRadius: 20,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: domainBorderColor,
  },
  viewMoreButtonText: {
    color: domainColor,
    fontSize: 12,
    fontWeight: "500",
  },
});
