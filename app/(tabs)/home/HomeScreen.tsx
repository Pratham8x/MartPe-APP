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
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  categoryData,
  getCategoryBackground,
  getCategoryColor,
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
import { getAddress } from "../../../utility/location";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
  const [showMenu, setShowMenu] = useState(false);
  const [drawerView, setDrawerView] = useState<
    "main" | "categories" | "help" | null
  >(null);

  const toggleMenu = () => {
    if (showMenu) {
      setDrawerView(null);
      setShowMenu(false);
    } else {
      setDrawerView("main");
      setShowMenu(true);
    }
  };

  const openSubMenu = (view: "main" | "categories" | "help") =>
    setDrawerView(view);
  const goBack = () => setDrawerView("main");

  const handleCategoryPress = (categoryLink: string) => {
    setShowMenu(false);
    router.push(`../categories/${categoryLink}`);
  };

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
      // get address from rev geocode data
      const response = await getAddress(latitude, longitude);
      console.log(
        "rev-geocoded address response:",
        response?.data?.items[0]?.address
      );
      // process rev geocode data for address
      const address = response?.data?.items[0]?.address;
      // set the global state
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
        await getUserLocationDetails();
        console.log("selectedDetails?.city", selectedDetails?.city);
      }
    }
    revGeoCodeLocationData();
  }, [location]);

  const handleLocationPress = () => {
    router.push("../address/SavedAddresses");
  };

  // Render functions for category sections
  const renderFoodCategories = ({ item , index }) => {
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
            <Image source={{ uri: nextItem.image }} style={styles.categoryImage} />
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
            <Image source={{ uri: nextItem.image }} style={styles.categoryImage} />
            <Text style={styles.categoryName}>{nextItem.name}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderOfferCard = () => (
    <View style={styles.offerSection}>
      <View style={styles.offerCard}>
        <View style={styles.offerContent}>
          <Text style={styles.offerTitle}>🎉 Special Offers</Text>
          <Text style={styles.offerSubtext}>Get up to 50% off on selected items</Text>
          <TouchableOpacity style={styles.offerButton}>
            <Text style={styles.offerButtonText}>Explore Deals</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.offerImageContainer}>
          <Text style={styles.offerEmoji}>🛒</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Red Header Section */}
        <View style={styles.redSection}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>Martpe</Text>

            <View>
              <TouchableOpacity onPress={toggleMenu}>
                <Entypo
                  name="menu"
                  size={28}
                  color="white"
                  style={{ marginRight: 20 }}
                />
              </TouchableOpacity>

              {showMenu && (
                <View style={styles.menuDropdown}>
                  {drawerView !== "main" && (
                    <TouchableOpacity
                      onPress={goBack}
                      style={styles.backButton}
                    >
                      <Ionicons
                        name="arrow-back"
                        size={18}
                        color="#666"
                        style={styles.menuIcon}
                      />
                      <Text style={styles.backText}>Back</Text>
                    </TouchableOpacity>
                  )}

                  {/* MAIN MENU */}
                  {drawerView === "main" && (
                    <>
                      <View style={styles.menuHeader}></View>
                      <TouchableOpacity
                        onPress={() => openSubMenu("categories")}
                        style={[styles.menuItem, styles.menuItemBorder]}
                      >
                        <Text style={styles.menuText}>Categories</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => openSubMenu("help")}
                        style={styles.menuItem}
                      >
                        <Text style={styles.menuText}>Help</Text>
                      </TouchableOpacity>
                    </>
                  )}

                  {/* CATEGORIES */}
                  {drawerView === "categories" && (
                    <>
                      <View style={styles.menuHeader}></View>
                      {categoryData.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          onPress={() => handleCategoryPress(item.link)}
                          style={[styles.menuItem, styles.menuItemBorder]}
                        >
                          <Image
                            source={{ uri: item.image }}
                            style={{ width: 20, height: 20, marginRight: 12 }}
                          />
                          <Text style={styles.menuText}>{item.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </>
                  )}

                  {/* HELP */}
                  {drawerView === "help" && (
                    <>
                      <View style={styles.menuHeader}></View>
                      <TouchableOpacity
                        style={[styles.menuItem, styles.menuItemBorder]}
                      >
                        <Text style={styles.menuText}>About Us</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.menuItem, styles.menuItemBorder]}
                        onPress={() => router.push("../../(aux)/privacy-policy")}
                      >
                        <Text style={styles.menuText}>Privacy Policy</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.menuItem, styles.menuItemBorder]}
                      >
                        <Text style={styles.menuText}>Contact Us</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuItem}
                        onPress={() => router.push("../../(aux)/terms-and-conditions")}
                        >
                        <Text style={styles.menuText}>Terms & Conditions</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              )}
            </View>
          </View>

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

          {/* —— Categories —— */}
          <FlatList
            data={categoryData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.catList}
            renderItem={({ item }) => {
              const bg = getCategoryBackground(item.name);
              const fg = getCategoryColor(item.name);
              return (
                <TouchableOpacity
                  style={styles.catCard}
                  onPress={() => router.push(`./categories/${item.link}`)}
                >
                  <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
                    <Image
                      source={{ uri: item.image }}
                      style={[styles.iconImg, { tintColor: fg }]}
                    />
                  </View>
                  <Text style={styles.catLabel} numberOfLines={1}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {/* White Content Section */}
        <View style={styles.whiteSection}>
          {/* Offer Cards Section */}
          {renderOfferCard()}

          {/* Quick Access Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Quick Access</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.quickAccessGrid}>
              <TouchableOpacity style={styles.quickAccessItem}>
                <View style={styles.quickAccessIcon}>
                  <Ionicons name="flash" size={24} color="#ff3c41" />
                </View>
                <Text style={styles.quickAccessText}>Flash Sale</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAccessItem}>
                <View style={styles.quickAccessIcon}>
                  <Ionicons name="gift" size={24} color="#ff3c41" />
                </View>
                <Text style={styles.quickAccessText}>Coupons</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAccessItem}>
                <View style={styles.quickAccessIcon}>
                  <Ionicons name="heart" size={24} color="#ff3c41" />
                </View>
                <Text style={styles.quickAccessText}>Wishlist</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickAccessItem}>
                <View style={styles.quickAccessIcon}>
                  <Ionicons name="time" size={24} color="#ff3c41" />
                </View>
                <Text style={styles.quickAccessText}>Orders</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Trending Near You Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Trending Near You</Text>
  
            </View>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.trendingContainer}>
                {[1, 2, 3, 4].map((item, index) => (
                  <TouchableOpacity key={index} style={styles.trendingCard}>
                    <View style={styles.trendingImagePlaceholder}>
                      <Text style={styles.trendingEmoji}>🍕</Text>
                    </View>
                    <Text style={styles.trendingTitle}>Popular Restaurant</Text>
                    <Text style={styles.trendingSubtitle}>2.5 km away</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={12} color="#FFD700" />
                      <Text style={styles.ratingText}>4.5</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView> */}
          </View>

          {/* Explore Categories Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeaderWithLine}>
              <View style={styles.headerLine} />
              <Text style={styles.sectionTitleCentered}>Explore Food Categories</Text>
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
            <View style={styles.sectionHeaderWithLine}>
              <View style={styles.headerLine} />
              <Text style={styles.sectionTitleCentered}>Style Your Wardrobe</Text>
              <View style={styles.headerLine} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.fashionContainer}>
                {fashionCategoryData.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.fashionCard}>
                    <Image 
                      source={{ uri: item.image }} 
                      style={styles.fashionImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.fashionTitle}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
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
            <View style={styles.sectionHeaderWithLine}>
              <View style={styles.headerLine} />
              <Text style={styles.sectionTitleCentered}>Electronics</Text>
              <View style={styles.headerLine} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.electronicsContainer}>
                {electronicsCategoryData.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.electronicsCard}>
                    <View style={styles.electronicsImageContainer}>
                      <Image 
                        source={{ uri: item.image }} 
                        style={styles.electronicsImage}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.electronicsTitle}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
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

export default HomeScreen;

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
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
    backgroundColor: "#c7393e",
    paddingTop: 10,
    paddingBottom: 15,
    fontStyle: "italic",
    marginHorizontal: -16,
  },
  logo: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 20,
  },
  locationTxt: {
    color: "white",
    fontSize: 14,
    marginRight: 4,
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
  menuDropdown: {
    position: "absolute",
    top: 23,
    right: 42,
    backgroundColor: "#fff",
    width: 180,
    borderRadius: 1,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
    zIndex: 1000,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginLeft: 12,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    backgroundColor: "#fafafa",
  },
  backText: {
    fontSize: 15,
    color: "#666",
    fontWeight: "500",
    marginLeft: 8,
  },
  menuHeader: {
    paddingVertical: 1,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  menuIcon: {
    width: 22,
    textAlign: "center",
  },
  catList: {
    marginTop: 13,
  },
  catCard: {
    width: 50,
    alignItems: "center",
    marginRight: 16,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(21, 10, 10, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(11, 10, 10, 0.1)",
    shadowColor: "#94de9bd6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 3,
  },
  iconImg: {
    width: 40,
    height: 50,
    resizeMode: "contain",
  },
  catLabel: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  whiteSection: {
    backgroundColor: "#f5f2f2",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  // New styles for enhanced sections
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
  seeAllText: {
    fontSize: 14,
    color: "#ff9130",
    fontWeight: "500",
  },
  // Offer Section
  offerSection: {
    marginBottom: 24,
  },
  offerCard: {
    backgroundColor: "#ff3c41",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  offerSubtext: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
    marginBottom: 12,
  },
  offerButton: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  offerButtonText: {
    color: "#ff3c41",
    fontSize: 14,
    fontWeight: "600",
  },
  offerImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  offerEmoji: {
    fontSize: 30,
  },
  // Quick Access
  quickAccessGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAccessItem: {
    alignItems: "center",
    flex: 1,
  },
  quickAccessIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  quickAccessText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
  // Trending Section
  trendingContainer: {
    flexDirection: "row",
    paddingLeft: 16,
  },
  trendingCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  trendingImagePlaceholder: {
    width: "100%",
    height: 80,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  trendingEmoji: {
    fontSize: 32,
  },
  trendingTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  trendingSubtitle: {
    fontSize: 10,
    color: "#666",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 10,
    color: "#666",
    marginLeft: 2,
  },
  // Section Headers with Lines
  sectionHeaderWithLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  sectionTitleCentered: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#5A5555",
    marginHorizontal: 16,
  },
  headerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#5A5555",
    fontWeight: "bold",
  },
  // Category Lists
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
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    resizeMode: "contain",
  },
  categoryName: {
    marginTop: windowWidth * 0.01,
    color: "black",
    fontSize: 12,
    textAlign: "center",
  },
  // Fashion Section
  fashionContainer: {
    flexDirection: "row",
    paddingLeft: 16,
  },
  fashionCard: {
    marginRight: 12,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  fashionImage: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    borderRadius: 12,
    marginBottom: 8,
  },
  fashionTitle: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    fontWeight: "500",
  },
  // Personal Care Section
  personalCareContainer: {
    flexDirection: "row",
    paddingLeft: 16,
  },
  personalCareCard: {
    marginRight: 12,
    alignItems: "center",
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
  // Electronics Section
  electronicsContainer: {
    flexDirection: "row",
    paddingLeft: 16,
  },
  electronicsCard: {
    marginRight: 12,
    alignItems: "center",
  },
  electronicsImageContainer: {
    width: 90,
    height: 90,
    backgroundColor: "white",
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
  electronicsImage: {
    width: 70,
    height: 70,
  },
  electronicsTitle: {
    fontSize: 12,
    color: "black",
    textAlign: "center",
    fontWeight: "500",
    maxWidth: 90,
  },
  // Home & Decor Section
  homeDecorContainer: {
    flexDirection: "row",
    paddingLeft: 16,
  },
  homeDecorCard: {
    marginRight: 12,
    alignItems: "center",
  },
  homeDecorImageContainer: {
    width: 90,
    height: 90,
    backgroundColor: "white",
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
    width: 70,
    height: 70,
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