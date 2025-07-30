import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
// import Geocoder from 'react-native-geocoding';
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { Colors, Fonts } from "../../../theme";
import { Entypo } from "@expo/vector-icons";

import Loader from "../../../components/common/Loader";
import ImageComp from "../../../components/common/ImageComp";
import Search from "../../../components/common/Search";
import OfferCard from "../../../components/Landing Page/OfferCard";
import useUserDetails from "../../../hook/useUserDetails";
import {
  categoryData,
  fashionCategoryData,
  electronicsCategoryData,
  foodCategoryData,
  groceriesCategoryData,
  homeAndDecorCategoryData,
  personalCareCategoryData,
  getCategoryColor,
  getCategoryBackground,
} from "../../../constants/categories";
import { initCart } from "../../../state/state-init/init-cart";
import useDeliveryStore from "../../../state/deliveryAddressStore";
import { getAddress } from "../../../utility/location";
import { useHomePageData } from "../../../gql/api/homePage";
import { useQueryClient } from "@tanstack/react-query";
import { initOrder } from "../../../state/state-init/init-order";
import { initFavorite } from "../../../state/state-init/init-favorites";
import { init } from "@graphql-codegen/cli";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const renderItem = ({ item, index }: { item: Product; index: number }) => {
  // Check if this is an even index, if not return null to skip rendering
  if (index % 2 !== 0) return null;

  // Get the next item in the array
  const nextItem = foodCategoryData[index + 1];

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
          router.push(`/(tabs)/home/result/${item.name}`);
        }}
        style={styles.item}
      >
<Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      {nextItem && (
        <View style={styles.item}>
          <Image source={{ uri: nextItem.image }} style={styles.image} />
          <Text style={styles.name}>{nextItem.name}</Text>
        </View>
      )}
    </View>
  );
};

const renderItemGrocery = ({ item, index } : { item: Product; index: number }) => {
  // Check if this is an even index, if not return null to skip rendering
  if (index % 2 !== 0) return null;

  // Get the next item in the array
  const nextItem = groceriesCategoryData[index + 1];

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() => {
          router.push(`/(tabs)/home/result/${item.name}`);
        }}
        style={styles.item}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
      {nextItem && (
        <View style={styles.item}>
          <Image source={{ uri: nextItem.image }} style={styles.image} />
          <Text style={styles.name}>{nextItem.name}</Text>
        </View>
      )}
    </View>
  );
};

const ListItem = ({ item, navigation, location }: any) => {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    // crashlytics().log("App mounted.");
  }, []);

  useEffect(() => {
    async function fetchDistanceMatrix() {
      const origins = location; // New York, NY
      const destinations = `${item.coordinates[0]},${item.coordinates[1]}`; // Los Angeles, CA
      // const destinations = `12.837706,77.668233`;
      // console.log('destinations', destinations);
      // console.log('origins', origins);
      // Construct the API URL
      const apiUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?units=km&origins=${origins}&destinations=${destinations}&key=${GOOGLE_MAPS_API_KEY}`;

      try {
        fetch(apiUrl)
          .then((response) => response.json())
          .then((responseData) => {
            if (
              responseData?.rows?.length > 0 &&
              responseData?.rows[0]?.elements?.length > 0
            ) {
              if (responseData.rows[0]?.elements[0]?.distance) {
                setDistance(responseData.rows[0]?.elements[0].distance.text);
              }
              if (responseData.rows[0]?.elements[0]?.duration) {
                setTime(responseData.rows[0]?.elements[0].duration.text);
              }
            }
          })
          .catch((error) => {
            console.error("fetchDistanceMatrix Error fetching data:", error);
          });
      } catch (error) {
        console.error(
          "fetchDistanceMatrix Error fetching distance matrix:",
          error
        );
      }
    }
    if (location && location !== "" && item) {
      fetchDistanceMatrix();
    }
  }, [item, location]);

  return (
    <TouchableOpacity
      style={[styles.categoryCard, { width: windowWidth / 3 }]}
      onPress={() =>
        navigation.navigate("ProductListingScreen", {
          productData: item,
        })
      }
    >
      <View style={styles.imgContainer}>
        <ImageComp
          source={item.descriptor?.images && item.descriptor.images[0]}
          imageStyle={{ height: 75, aspectRatio: 1.7 }}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[styles.categoryTitle, { textAlign: "left" }]}
        numberOfLines={1}
      >
        {item.descriptor?.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <Text style={styles.placeholderText} numberOfLines={1}>
          {item.more_details?.location[0]?.address?.street}
        </Text>
        <Text style={styles.placeholderText} numberOfLines={1}>
          {distance}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const getDistances = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const dist = getDistance(
    { latitude: lat1, longitude: lon1 },
    { latitude: lat2, longitude: lon2 }
  );
  return dist / 1000; // returns distance in kilometers
};

const getStreetName = async (latitude: number, longitude: number): Promise<string | undefined> => {
  const reverseCode = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });

  console.log("EXPO-Location reverseCode response:", reverseCode[0]);
  
  const street = reverseCode[0]?.city ?? ""; // Optional chaining in case response is empty
  return street;
};


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const default_lat = 12.9649001;
const default_lng = 77.7497814;

const HomeScreen = () => {
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);
  const [streetName, setStreetName] = useState("whietfield");
  const [cityName, setCityName] = useState("bengaluru");
  const [pinCode, setPinCode] = useState("560067");
  // const [data, setData] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  // const [isLoading, setIsLoading] = useState(true);
  const addDeliveryDetail = useDeliveryStore(
    (state) => state.addDeliveryDetail
  );

  const queryClient = useQueryClient();

  // location related states
const [errorMsg, setErrorMsg] = useState<string | null>(null);
const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const { userDetails, getUserDetails } = useUserDetails();

  // gets the location only once and sets the location as a state
  useEffect(() => {
    async function initHomePage() {
      await askForLocationPermissions();
      await initCart();
      await initOrder();
      await initFavorite();
    }
    initHomePage();
  }, []);

  const askForLocationPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      setLocation(location);
    } catch (error) {
      console.error(
        "Error during the location permission and fetching:",
        error
      );
    }
  };

  if (!selectedDetails) {
    // handle to pick the location using bottom sheet
  }

  if (userDetails) {
    console.log("userDetails inside home:", userDetails);
  }

const getCityName = async (latitude: number, longitude: number): Promise<string | null> => {
  try {
    const response = await getAddress(latitude, longitude);
    console.log("rev-geocoded address response:", response?.data?.items[0]?.address);

    const address = response?.data?.items[0]?.address;

    if (address?.street) setStreetName(address.street);
    if (address?.city) setCityName(address.city);
    if (address?.postalCode) setPinCode(address.postalCode);

    setDeliveryAddress(`${address?.street}, ${address?.city}, ${address?.postalCode}`);

    addDeliveryDetail({
      addressId: null,
      city: address?.city || null,
      state: address?.state || null,
      fullAddress: `${address?.street}, ${address?.city}, ${address?.postalCode}`,
      name: "Current Location",
      isDefault: false,
      pincode: address?.postalCode || null,
      lat: latitude,
      lng: longitude,
      streetName: address?.street || null,
    });

    return address?.city ?? null; // ✅ ensure something is returned
  } catch (error) {
    console.error("Error during geocoding with API:", error);
    return null; // ✅ return something in error case too
  }
};


  const getUserLocationDetails = async () => {
    try {
      if (!location) return;
      const { latitude, longitude } = location?.coords || {};
      console.log(
        `location of the device: ${JSON.stringify(location, null, 2)}`
      );
      await getCityName(latitude, longitude);
    } catch (error) {
      console.error(`Error in fetching the user location details`, error);
    }
  };

  useEffect(() => {
    async function revGeoCodeLocationData() {
      if (location) {
        await getUserLocationDetails(); // getting billed for rev geo code call
        console.log("selectedDetails?.city", selectedDetails?.city);
      }
    }
    revGeoCodeLocationData();
  }, [location]);

  const handleHomePageDataRefresh = useCallback(
  async (selectedDetails: any) => {
    if (selectedDetails?.lat && selectedDetails?.lng) {
      // invalidate the earlier fetched home data if any and re-fetch the home page data again
      await queryClient.invalidateQueries({ queryKey: ["home-data"] });
    } else {
      console.log(
        "Not able to get the lat, lng of the user's device hence unable to provide home page data"
      );
    }
  },
  [queryClient]
);


  const payload = {
    loc: {
      lat: selectedDetails?.lat || default_lat,
      lng: selectedDetails?.lng || default_lng,
    },
    cityCode: "std:80",
  };
  console.log("REVANTH: payload before getting the home:", payload);
  const { isPending, isError, data, error } = useHomePageData(payload);

  if (isPending || !data) {
    return <Loader />;
  }

  if (isError) {
    const err_msg = `Error Occurred while fetching the Home Page Data: ${error?.message}`;
    console.log("err_msg:", err_msg);
    return (
      <>
        <Text>{err_msg}</Text>
        <TouchableOpacity
          onPress={() => handleHomePageDataRefresh(selectedDetails)}
        >
          Refresh
        </TouchableOpacity>
      </>
    );
  }

  // get user device location and then reverse geocode it to fetch the street

  return (
    <SafeAreaView style={styles.container}>
      {/* search bar component */}
      <TouchableOpacity
        onPress={() => router.push("/search")}
        style={styles.headerContainer}
      >
<Search showBackArrow={false} placeholder="Search for products, vendors..." />
      </TouchableOpacity>

      {/* Scrollable view */}
      <ScrollView  style={styles.content}>

        {/* offer cards */}
        <OfferCard items= {data?.offers && <OfferCard items={data.offers} />}
 />

        {/* Shop by Categories */}
        <ScrollView style={styles.section}>
          {/* section header */}
          <View style={styles.sectionTitleContainer}>
            {/* section header title */}
            <Text style={styles.sectionTitle}>Shop by Categories</Text>
          </View>
          
             {/* section items */}
            <View
              style={{
                marginHorizontal: windowWidth * 0.03,
                paddingVertical: 5,
              }}
            >
              <FlatList
                data={categoryData}
                numColumns={3}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.categoriesCard}
                    onPress={() =>
                      router.push(`../(tabs)/home/categories/${item.link}`)
                    }
                  >
                    <View
                      style={[
                        styles.imgContainer,
                        {
                          backgroundColor: getCategoryBackground(item.name),
                          borderRadius: 10,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryCardTitle,
                          {
                            color: getCategoryColor(item.name),
                            fontSize: 11,
                            // fontFamily: "Poppins",
                          },
                        ]}
                      >
                        {item.name == "F&B" ? "Food & Beverage" : item.name}
                      </Text>

                      <ImageComp
                        source={ item.image}
                        imageStyle={{
                          width: "100%",
                          height: undefined,
                          aspectRatio: 1.4,
                          borderBottomLeftRadius: 12,
                          borderBottomRightRadius: 12,
                        }}
                        resizeMode="cover"
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
              </View>
            </ScrollView>
        {/* Restaurants Nearby */}
           {(data?.restaurants ?? []).length > 0 ? (
          <View style={styles.section}>
            {/* section header */}
            <View style={styles.sectionTitleContainer}>
              {/* section header title */}
              <Text style={styles.sectionTitle}>Restaurants Nearby</Text>

              {/* section see all btn */}
              <TouchableOpacity
                style={{
                  // backgroundColor: "#FF890010", // "#FFF3E5",
                  // borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}
                onPress={() => router.push("/(tabs)/home/categories/Food")}
              >
                <Text
                  style={{
                    color: "#FF9130",
                    fontSize: 14,
                    fontWeight: "500",
                    // fontFamily: "Poppins",
                  }}
                >
                  See all
                  <Entypo
                    name="chevron-small-right"
                    size={14}
                    color="#bfbfc2"
                  />
                </Text>
              </TouchableOpacity>
            </View>

            {/* section items */}
            <View>
              <FlatList
                data={data?.restaurants}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      marginLeft: windowWidth * 0.05,
                      marginTop: windowHeight * 0.01,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderRadius: 10,
                        shadowColor: "black",
                        shadowOffset: {
                          width: 0,
                          height: 8,
                        },
                        shadowOpacity: 0.46,
                        shadowRadius: 11.14,

                        elevation: 4,
                        padding: 2,
                        backgroundColor: "#FFFFFF",
                      }}
                      onPress={() => {
                        router.push(`/(tabs)/home/productListing/${item.id}`),
                          console.log("passed item id", item.id);
                      }}
                    >
                      <ImageComp
                        source={ item?.descriptor?.symbol}
                        imageStyle={{
                          height: 100,
                          width: 100,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <View>
                      <Text
                        style={{
                          color: "#092635",
                          fontSize: 12,
                          fontWeight: "700",
                          marginVertical: 4,
                          // fontFamily: "Poppins",
                        }}
                      >
                        {item?.descriptor?.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#706F6F",
                            fontSize: 11,
                            // fontFamily: "Poppins",
                          }}
                        >
                          {item?.address?.locality
                            ? item?.address?.locality
                            : "Local Area"}
                        </Text>
                        <Text
                          style={{
                            color: "#706F6F",
                            textAlign: "right",
                            fontSize: 10,
                            // fontFamily: "Poppins",
                          }}
                        >
                          {(Number(item.distance) / 1000).toFixed(0)} Km
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                horizontal
              />
            </View>
          </View>
        ) : null}

        {/* Stores Nearby */}
        {(data?.stores??[]).length > 0 ? (
          <View style={styles.section}>
            {/* section header */}
            <View style={styles.sectionTitleContainer}>
              {/* section header title */}
              <Text style={styles.sectionTitle}>Stores Nearby</Text>

              {/* section see all btn */}
              <TouchableOpacity
                style={{
                  // backgroundColor: "#FF890010", // "#FFF3E5",
                  // borderRadius: 5,
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                }}
                onPress={() => router.push("/(tabs)/home/categories/Grocery")}
              >
                <Text
                  style={{
                    color: "#bfbfc2",
                    fontSize: 14,
                    fontWeight: "500",
                    // fontFamily: "Poppins",
                  }}
                >
                  See all{" "}
                  <Entypo
                    name="chevron-small-right"
                    size={14}
                    color="#FF9130"
                  />
                </Text>
              </TouchableOpacity>
            </View>
            {/* section items */}
            <View>
              <FlatList
                data={data?.stores}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  // Store Card
                  <View
                    style={{
                      marginLeft: windowWidth * 0.05,
                      marginTop: windowHeight * 0.01,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        borderRadius: 10,
                        shadowColor: "#515151",
                        shadowOffset: {
                          width: 0,
                          height: 8,
                        },
                        shadowOpacity: 0.46,
                        shadowRadius: 11.14,

                        elevation: 4,
                        padding: 2,
                        backgroundColor: "#FFFFFF",
                      }}
                      onPress={() => {
                        router.push(`/(tabs)/home/productListing/${item.id}`),
                          console.log("passed item id", item.id);
                      }}
                    >
                      <ImageComp
                        source={item.descriptor?.symbol}
                        imageStyle={{
                          height: 100,
                          width: 100,
                        }}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                    <View>
                      <Text
                        style={{
                          color: "#092635",
                          fontSize: 12,
                          fontWeight: 600,
                          marginVertical: 4,
                          // fontFamily: "Poppins",
                        }}
                      >
                        {item?.descriptor?.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "#706F6F",
                            fontSize: 11,
                            // fontFamily: "Poppins",
                          }}
                        >
                          {item?.address?.locality
                            ? item?.address?.locality
                            : "Local Area"}
                        </Text>
                        <Text
                          style={{
                            color: "#706F6F",
                            textAlign: "right",
                            fontSize: 10,
                            // fontFamily: "Poppins",
                          }}
                        >
                          {(Number(item.distance) / 1000).toFixed(1)} Km
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                horizontal
              />
            </View>
          </View>
        ) : null}

        {/* foodCategory  */}
        <View style={styles.categoryContainer}>
          {/* section title */}
          <View style={styles.categoryContainerHeader}>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
            {/* header text */}
            <Text style={styles.categoryContainerHeaderText}>
              Explore more with food
            </Text>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
          </View>

          {/* section items */}
          <View style={styles.categoryItemsContainer}>
            <FlatList
              data={foodCategoryData}
              renderItem={({ item, index }) => {
                // Check if this is an even index, if not return null to skip rendering
                if (index % 2 !== 0) return null;

                // Get the next item in the array
                const nextItem = foodCategoryData[index + 1];

                return (
                  <View style={styles.row}>
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "/(tabs)/home/result/[search]",
                          params: {
                            search: item.name,
                            domainData: "ONDC:RET11",
                          },
                        });
                      }}
                      style={styles.item}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                      <Text style={styles.name}>{item.name}</Text>
                    </TouchableOpacity>
                    {nextItem && (
                      <TouchableOpacity
                        onPress={() => {
                          router.push({
                            pathname: "/(tabs)/home/result/[search]",
                            params: {
                              search: nextItem.name,
                              domainData: "ONDC:RET11",
                            },
                          });
                        }}
                        style={styles.item}
                      >
                        <Image
                          source={{ uri: nextItem.image }}
                          style={styles.image}
                        />
                        <Text style={styles.name}>{nextItem.name}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              snapToAlignment={"start"}
              snapToInterval={windowWidth / 2}
              decelerationRate={"fast"}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          </View>
        </View>

        {/* groceryCategory  */}
        <View style={styles.categoryContainer}>
          {/* section title */}
          <View style={styles.categoryContainerHeader}>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
            {/* header text */}
            <Text style={styles.categoryContainerHeaderText}>Groceries</Text>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
          </View>

          {/* section items */}
          <View style={styles.categoryItemsContainer}>
            <FlatList
              data={groceriesCategoryData}
              renderItem={({ item, index }) => {
                if (index % 2 !== 0) return null;

                const nextItem = groceriesCategoryData[index + 1];

                return (
                  <View style={styles.row}>
                    <TouchableOpacity
                      onPress={() => {
                        router.push({
                          pathname: "/(tabs)/home/result/[search]",
                          params: {
                            search: item.name,
                            domainData: "ONDC:RET10",
                          },
                        });
                      }}
                      style={styles.item}
                    >
                      <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                      />
                      <Text style={styles.name}>{item.name}</Text>
                    </TouchableOpacity>
                    {nextItem && (
                      <TouchableOpacity
                        onPress={() => {
                          router.push({
                            pathname: "/(tabs)/home/result/[search]",
                            params: {
                              search: nextItem.name,
                              domainData: "ONDC:RET10",
                            },
                          });
                        }}
                        style={styles.item}
                      >
                        <Image
                          source={{ uri: nextItem.image }}
                          style={styles.image}
                        />
                        <Text style={styles.name}>{nextItem.name}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              snapToAlignment={"start"}
              snapToInterval={windowWidth - 10}
              decelerationRate={"fast"}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.list}
            />
          </View>
        </View>

        {/* Wardrobe  */}
        <View style={styles.categoryContainer}>
          {/* section title */}
          <View style={styles.categoryContainerHeader}>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
            {/* header text */}
            <Text style={styles.categoryContainerHeaderText}>
              Style your Wardrobe
            </Text>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
          </View>

          {/* section items */}
          <View style={styles.categoryItemsContainer}>
            {fashionCategoryData.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/(tabs)/home/result/[search]",
                      params: { search: item.name, domainData: "ONDC:RET12" },
                    });
                  }}
                  key={index}
                >
                  <View
                    style={{
                      marginHorizontal: 10,

                      backgroundColor: Colors.WHITE_COLOR,

                      padding: 10,
                    }}
                  >
                    <ImageComp
                      source={ item.image}
                      imageStyle={{
                        height: windowWidth * 0.3,
                        width: windowWidth * 0.3,
                        borderRadius: 25,
                      }}
                    />

                    <Text
                      style={{
                        color: "black",
                        textAlign: "center",

                        fontSize: 12,
                        // fontFamily: "Poppins",
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* personal care  */}
        <View style={styles.categoryContainer}>
          {/* section title */}
          <View style={styles.categoryContainerHeader}>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
            {/* header text */}
            <Text style={styles.categoryContainerHeaderText}>
              Personal Care
            </Text>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
          </View>

          {/* section items */}
          <View style={styles.categoryItemsContainer}>
            {personalCareCategoryData.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/(tabs)/home/result/[search]",
                      params: { search: item.name, domainData: "ONDC:RET13" },
                    });
                  }}
                  key={index}
                >
                  <View
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 15,
                      borderTopEndRadius: 100,
                      borderTopStartRadius: 100,
                      backgroundColor: Colors.WHITE_COLOR,
                      shadowColor: "#515151",
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: 0.41,
                      shadowRadius: 9.11,

                      elevation: 4,
                      paddingHorizontal: 10,
                      paddingVertical: 20,

                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ImageComp
                      source={item.image}
                      imageStyle={{
                        height: 50,
                        width: 50,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",

                      fontSize: 12,
                      // fontFamily: "Poppins",
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Electronics  */}
        <View style={styles.categoryContainer}>
          {/* section title */}
          <View style={styles.categoryContainerHeader}>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
            {/* header text */}
            <Text style={styles.categoryContainerHeaderText}>Electronics</Text>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
          </View>

          {/* section items */}
          <View style={styles.categoryItemsContainer}>
            {electronicsCategoryData.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/(tabs)/home/result/[search]",
                      params: { search: item.name, domainData: "ONDC:RET14" },
                    });
                  }}
                  key={index}
                >
                  <View
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 10,
                      borderRadius: 10,
                      backgroundColor: Colors.WHITE_COLOR,
                      shadowColor: "#515151",
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: 0.41,
                      shadowRadius: 9.11,

                      elevation: 4,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <ImageComp
                      source={ item.image}
                      imageStyle={{
                        height: 80,
                        width: 80,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",

                      fontSize: 12,
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* home and decor  */}
        <View style={styles.categoryContainer}>
          {/* section title */}
          <View style={styles.categoryContainerHeader}>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
            {/* header text */}
            <Text style={styles.categoryContainerHeaderText}>Home & Decor</Text>
            {/* horizontal line */}
            <View
              style={{
                backgroundColor: "#5A5555",
                flex: 1,
                height: 1,
                marginHorizontal: 10,
              }}
            />
          </View>

          {/* section items */}
          <View style={styles.categoryItemsContainer}>
            {homeAndDecorCategoryData.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    router.push({
                      pathname: "/(tabs)/home/result/[search]",
                      params: { search: item.name, domainData: "ONDC:RET16" },
                    });
                  }}
                  key={index}
                >
                  <View
                    style={{
                      marginHorizontal: 10,
                      marginVertical: 10,
                      borderRadius: 10,
                      backgroundColor: Colors.WHITE_COLOR,
                      shadowColor: "#515151",
                      shadowOffset: {
                        width: 0,
                        height: 7,
                      },
                      shadowOpacity: 0.41,
                      shadowRadius: 9.11,

                      elevation: 4,
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}
                  >
                    <ImageComp
                      source={ item.image}
                      imageStyle={{
                        height: 80,
                        width: 80,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      color: "black",
                      textAlign: "center",
                      // fontFamily: "Poppins",
                      fontSize: 12,
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        </ScrollView>

        {/* Some sort of a svg design should go here.! */}
        <ScrollView
          style={{
            backgroundColor: "#f8f9fa",
            height: windowHeight * 0.2,
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: "#303030",
              fontSize: 20,
              fontWeight: "600",
              // fontFamily: "Poppins",
            }}
          >
            Made With ❤️
          </Text>
          <Text
            style={{
              color: "#303030",
              fontSize: 24,
              fontWeight: "300",
              // fontFamily: "Poppins",
            }}
          >
            In Bengaluru
       </Text>

      </ScrollView>
    </SafeAreaView>
  );
};


export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
  headerContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  containerStyle: {
    backgroundColor: Colors.WHITE_COLOR,
    borderRadius: 10,
    borderColor: "#C7C4C4",
    borderWidth: 7,
  },
  headerIcon: {
    color: Colors.WHITE_COLOR,
    marginLeft: 15,
    fontSize: 25,
    // fontFamily: "Poppins",
  },
  row:{

  },
  content: {
    flexGrow: 1,
    backgroundColor: Colors.WHITE_COLOR,
    // padding: 16,
    // paddingBottom: 150,
    paddingTop: 10,
  },
  locationContainer: {
    paddingHorizontal: 16,
  },
  locationheader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  locationTitle: {
    // ...Fonts.mediumMontserrat(14),
    color: "black",
    lineHeight: 16,
    paddingHorizontal: 11,
  },
  locationText: {
    // ...Fonts.regular(12),
    color: Colors.WHITE_COLOR,
    lineHeight: 12,
    paddingLeft: 24,
  },
  cardOffer: {
    width: windowWidth * 0.8,
    backgroundColor: "red",

    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
  },
  section: {
    marginBottom: 10,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    marginHorizontal: windowWidth * 0.05,
    justifyContent: "space-between",
    marginVertical: windowWidth * 0.01,
  },
  sectionTitle: {
    // ...Fonts.semiBold(14),
    color: Colors.GREY_COLOR,
    fontWeight: "900",
    fontSize: 14,
    // fontFamily: "Poppins",
  },
  cardLine: {
    borderWidth: 0.5,
    borderColor: Colors.BORDER_COLOR,
    flex: 1,
  },
  categoryCard: {
    flex: 1,
    margin: windowWidth * 0.01,
  },
  categoriesCard: {
    flex: 1,
    margin: windowWidth * 0.01,
  },
  categoryCardTitle: {
    // ...Fonts.semiBold(12),
    textAlign: "left",
    padding: 5,
    paddingLeft: 7,
    fontWeight: "500",
  },
  imgContainer: {
    backgroundColor: Colors.WHITE_COLOR,
    // shadowColor: Colors.GREY_COLOR,
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    elevation: 1.5,
    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: Colors.CARD_BORDER_COLOR,
    flex: 1,
  },
  categoryTitle: {
    // ...Fonts.semiBold(12),
    color: Colors.GREY_COLOR,
    textAlign: "center",
    paddingTop: 6,
  },
  offerCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  offerTest: {
    // ...Fonts.bold(18),
    color: Colors.WHITE_COLOR,
  },
  subOfferTest: {
    // ...Fonts.semiBold(14),
    color: Colors.WHITE_COLOR,
    marginTop: 5,
  },
  tcOffer: {
    // ...Fonts.bold(20),
    color: Colors.WHITE_COLOR,
    marginTop: 5,
  },
  storeNearbyCard: {
    marginLeft: windowWidth * 0.05,
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: windowHeight * 0.01,
  },
  storeNearbyImage: {
    shadowColor: "#515151",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,

    elevation: 2,
    padding: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
  },
  placeholderText: {
    // ...Fonts.regular(10),
    color: Colors.PLACEHOLDER_COLOR,
  },
  orderNow: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginVertical: 10,
    backgroundColor: Colors.WHITE_COLOR,
    shadowColor: "#626262",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  orderNowLabel: {
    ...Fonts.semiBold(14),
  },
  statusText: {
    ...Fonts.regular(10),
    color: Colors.STATUS_COLOR,
  },
  list: {
    alignItems: "center",
  },
  item: {
    margin: 5,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: "contain",
  },
  name: {
    marginTop: windowWidth * 0.01,
    color: "black",
  },
  categoryContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: windowWidth,
    // marginVertical: windowWidth * 0.05,
    marginVertical: 5,
    // borderWidth: 1,
    // borderColor: "#000",
  },
  categoryContainerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    width: "100%",
    // borderWidth: 1,
    // borderColor: "#000",
  },
  categoryContainerHeaderText: {
    color: "#5A5555",
    marginHorizontal: windowWidth * 0.02,
    fontWeight: "bold",
    // fontFamily: "Poppins",
    fontSize: 16,
  },
  categoryItemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "#000",
  },
});
