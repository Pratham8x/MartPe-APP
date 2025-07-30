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
} from "react-native";
import {
  categoryData,
  getCategoryBackground,
  getCategoryColor,
} from "../../../constants/categories";
import * as Location from "expo-location";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useDeliveryStore from "../../../state/deliveryAddressStore";
import { getAddress } from "../../../utility/location";

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
    router.push("../../address/SavedAddresses");
  };

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
                      >
                        <Text style={styles.menuText}>Privacy Policy</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.menuItem, styles.menuItemBorder]}
                      >
                        <Text style={styles.menuText}>Contact Us</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.menuItem}>
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
            <Ionicons
              name="location-sharp"
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
                  onPress={() => router.push(`../categories/${item.link}`)}
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
          {/* This is where other content would go */}
          <Text style={styles.sectionTitle}>Featured Content</Text>
          <Text style={styles.sectionSubtext}>
            More content will be added here
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
    marginHorizontal: -16, // cancel out parent's padding
  },
  logo: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 20, // Add left margin to logo
  },
  locationTxt: {
    color: "white",
    //fontweight: "bold",
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
    marginLeft:-1,
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
    paddingVertical: 14,
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
    marginTop: 20,
  },
  catCard: {
    width: 70,
    alignItems: "center",
    marginRight: 16,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  iconEmoji: {
    fontSize: 24,
  },
  iconImg: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  catLabel: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  whiteSection: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  sectionSubtext: {
    fontSize: 14,
    color: "#666",
  },
});
