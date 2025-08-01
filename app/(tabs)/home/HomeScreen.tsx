import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  categoryData,
  foodCategoryData,
  groceriesCategoryData,
  fashionCategoryData,
  personalCareCategoryData,
  electronicsCategoryData,
  homeAndDecorCategoryData,
} from "../../../constants/categories";
import * as Location from "expo-location";
import { Ionicons, Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useDeliveryStore from "../../../state/deliveryAddressStore";
import OfferCard from "../../../components/Landing Page/OfferCard";
import { getAddress } from "../../../utility/location";

const windowWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const router = useRouter();
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);
  const addDeliveryDetail = useDeliveryStore(
    (state) => state.addDeliveryDetail
  );

  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function initHomePage() {
      await askForLocationPermissions();
    }
    initHomePage();
  }, []);

  const askForLocationPermissions = async (): Promise<void> => {
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

  const getCityName = async (
    latitude: number,
    longitude: number
  ): Promise<void> => {
    try {
      const response = await getAddress(latitude, longitude);
      const address = response?.data?.items[0]?.address;
      addDeliveryDetail({
        addressId: null,
        city: address?.city || null,
        state: address?.state || null,
        fullAddress: `${address?.street || ""}, ${address?.city || ""}, ${
          address?.postalCode || ""
        }`,
        name: "Current Location",
        isDefault: false,
        pincode: address?.postalCode || null,
        lat: latitude,
        lng: longitude,
        streetName: address?.street || null,
      });
    } catch (error) {
      console.error("Error during geocoding with API:", error);
    }
  };

  const getUserLocationDetails = async (): Promise<void> => {
    try {
      if (!location) return;
      const { latitude, longitude } = location?.coords || {};
      await getCityName(latitude, longitude);
    } catch (error) {
      console.error(`Error in fetching the user location details`, error);
    }
  };

  useEffect(() => {
    if (location) {
      getUserLocationDetails();
    }
  }, [location]);

  const handleLocationPress = () => {
    router.push("../address/SavedAddresses");
  };

  // Render functions for category sections
  const renderFoodCategories = ({ item, index }) => {
    if (index % 2 !== 0) return null;
    const nextItem = foodCategoryData[index + 1];

    return (
      <View style={styles.categoryRow}>
        <TouchableOpacity
          onPress={() => router.push(`/(tabs)/home/result/${item.name}`)}
          style={styles.categoryItem}
        >
          <Image source={{ uri: item.image }} style={styles.categoryImage} />
          <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
        {nextItem && (
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/home/result/${nextItem.name}`)}
            style={styles.categoryItem}
          >
            <Image
              source={{ uri: nextItem.image }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>{nextItem.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderGroceryCategories = ({ item, index }) => {
    if (index % 2 !== 0) return null;
    const nextItem = groceriesCategoryData[index + 1];

    return (
      <View style={styles.categoryRow}>
        <TouchableOpacity
          onPress={() => router.push(`/(tabs)/home/result/${item.name}`)}
          style={styles.categoryItem}
        >
          <Image source={{ uri: item.image }} style={styles.categoryImage} />
          <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
        {nextItem && (
          <TouchableOpacity
            onPress={() => router.push(`/(tabs)/home/result/${nextItem.name}`)}
            style={styles.categoryItem}
          >
            <Image
              source={{ uri: nextItem.image }}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>{nextItem.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Red Header Section */}
        <View style={styles.redSection}>
          {/* Location */}
          <TouchableOpacity
            style={styles.locationRow}
            onPress={handleLocationPress}
          >
            <FontAwesome6
              name="location-pin-lock"
              size={18}
              color="white"
              style={{ marginRight: 16 }}
            />
            <Text style={styles.deliveryTxt}>Delivering to</Text>
            {!selectedDetails?.city ? (
              <ActivityIndicator
                size="small"
                color="white"
                style={{ marginHorizontal: 6 }}
              />
            ) : (
              <>
                <Text style={styles.locationTxt} numberOfLines={1}>
                  {selectedDetails.city}
                  {selectedDetails.pincode
                    ? `, ${selectedDetails.pincode}`
                    : ""}
                </Text>
                <Entypo name="chevron-down" size={18} color="white" />
              </>
            )}
          </TouchableOpacity>

          {/* Search Bar */}
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => router.push("../search")}
          >
            <Ionicons name="search" size={20} color="#555" />
            <Text style={styles.searchPlaceholder}>Search for Food</Text>
          </TouchableOpacity>

          {/* Categories */}
          <FlatList
            data={categoryData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.catList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.catCard}
                onPress={() => router.push(`./categories/${item.link}`)}
              >
                <Image source={item.image} style={styles.iconImg} />
                <Text style={styles.catLabel} numberOfLines={1}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* White Content Section */}
        <View style={styles.whiteSection}>
      {/* Groceries Section */}
<View style={styles.section}>
  <View style={styles.sectionHeaderWithLine}>
    <View style={styles.headerLine} />
    <Text style={styles.sectionTitleCentered}>Groceries</Text>
    <View style={styles.headerLine} />
  </View>
  <FlatList
    data={groceriesCategoryData}
    renderItem={({ item }) => (
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
        style={styles.categoryItem}
      >
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryName}>{item.name}</Text>
      </TouchableOpacity>
    )}
    keyExtractor={(item) => item.id.toString()}
    horizontal
    snapToAlignment="start"
    snapToInterval={windowWidth / 2}
    decelerationRate="fast"
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.categoryList}
  />
</View>


          {/* Explore Categories Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderWithLine}>
              <View style={styles.headerLine} />
              <Text style={styles.sectionTitleCentered}>
                Explore Food Categories
              </Text>
              <View style={styles.headerLine} />
            </View>
            <FlatList
              data={foodCategoryData}
              renderItem={renderFoodCategories}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              snapToAlignment="start"
              snapToInterval={windowWidth / 2}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
            />
          </View>

          {/* Grocery Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderWithLine}>
              <View style={styles.headerLine} />
              <Text style={styles.sectionTitleCentered}>Fresh Groceries</Text>
              <View style={styles.headerLine} />
            </View>
            <FlatList
              data={groceriesCategoryData}
              renderItem={renderGroceryCategories}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              snapToAlignment="start"
              snapToInterval={windowWidth / 2}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryList}
            />
          </View>

          {/* Fashion Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Shop for Fashion</Text>
            </View>
            <View style={styles.twoColumnGrid}>
              {fashionCategoryData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.gridCard,
                    index % 2 === 0
                      ? styles.gridCardLeft
                      : styles.gridCardRight,
                  ]}
                  onPress={() =>
                    router.push(`/(tabs)/home/result/${item.name}`)
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.gridCardImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.gridCardLabel}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Personal Care Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderWithLine}>
              <View style={styles.headerLine} />
              <Text style={styles.sectionTitleCentered}>Personal Care</Text>
              <View style={styles.headerLine} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.personalCareContainer}>
                {personalCareCategoryData.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.personalCareCard}>
                    <View style={styles.personalCareImageContainer}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.personalCareImage}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.personalCareTitle}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Electronics Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Search for Electronics</Text>
            </View>
            <View style={styles.twoColumnGrid}>
              {electronicsCategoryData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.gridCard,
                    index % 2 === 0
                      ? styles.gridCardLeft
                      : styles.gridCardRight,
                  ]}
                  onPress={() =>
                    router.push(`/(tabs)/home/result/${item.name}`)
                  }
                >
                  <Image
                    source={{ uri: item.image }}
                    style={styles.gridCardImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.gridCardLabel}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Home & Decor Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderWithLine}>
              <View style={styles.headerLine} />
              <Text style={styles.sectionTitleCentered}>Home & Decor</Text>
              <View style={styles.headerLine} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.homeDecorContainer}>
                {homeAndDecorCategoryData.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.homeDecorCard}>
                    <View style={styles.homeDecorImageContainer}>
                      <Image
                        source={{ uri: item.image }}
                        style={styles.homeDecorImage}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.homeDecorTitle}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Footer Section */}
          <View style={styles.footerSection}>
            <Text style={styles.footerTitle}>Made With ❤️</Text>
            <Text style={styles.footerSubtitle}>In Bengaluru</Text>
            <Text style={styles.footerDescription}>
              Your one-stop marketplace for everything you need
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7c5462",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  redSection: {
    backgroundColor: "#ff3c41",
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  deliveryTxt: {
    color: "white",
    fontSize: 14,
    marginHorizontal: 6,
    marginLeft: -12,
  },
  locationTxt: {
    color: "white",
    fontSize: 14,
    marginRight: 4,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 12,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#555",
  },
  catList: {
    marginTop: 13,
  },
  catCard: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
    width: 70,
  },
  iconImg: {
    width: 60,
    height: 50,
    resizeMode: "contain",
  },
  catLabel: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  whiteSection: {
    backgroundColor: "#f5f2f2",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  sectionHeaderWithLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 1,
  },
  sectionTitleCentered: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5A5555",
    marginHorizontal: 15,
  },
  headerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#5A5555",
  },
  categoryList: {
    alignItems: "center",
  },
  categoryRow: {
    margin: 5,
    flexDirection: "column",
    alignItems: "center",
  },
  categoryItem: {
    margin: 5,
    flexDirection: "column",
    alignItems: "center",
  },
  categoryImage: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.24,
    resizeMode: "contain",
  },
  categoryName: {
    marginTop: -9,
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  // Two Column Grid Styles
  twoColumnGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  gridCard: {
    width: "48%",
    marginBottom: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gridCardLeft: {
    marginRight: "2%",
  },
  gridCardRight: {
    marginLeft: "2%",
  },
  gridCardImage: {
    width: "100%",
    height: 120,
  },
  gridCardLabel: {
    padding: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  // Personal Care Section
  personalCareContainer: {
    flexDirection: "row",
    paddingLeft: 16,
  },
  personalCareCard: {
    marginRight: 12,
    alignItems: "center",
    marginTop:10

  },
  personalCareImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  personalCareImage: {
    width: 50,
    height: 50,
  },
  personalCareTitle: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    fontWeight: "500",
    maxWidth: 80,

  },
  // Home & Decor Section
  homeDecorContainer: {
    flexDirection: "row",
    paddingLeft: 16,
  },
  homeDecorCard: {
    marginRight: 12,
    alignItems: "center",
    marginTop:14
    
  },
  homeDecorImageContainer: {
    width: 200,
    height: 200,
    backgroundColor: "#f5eaee",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 10,
  },
  homeDecorImage: {
    width: 200,
    height: 150,
  },
  homeDecorTitle: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    fontWeight: "500",
    maxWidth: 90,
  },
  // Footer Section
  footerSection: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
    borderRadius: 16,
  },
  footerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#303030",
    marginBottom: 8,
  },
  footerSubtitle: {
    fontSize: 20,
    fontWeight: "300",
    color: "#303030",
    marginBottom: 12,
  },
  footerDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default HomeScreen;
