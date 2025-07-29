import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  Text,
} from "react-native";
import { router } from "expo-router";
import * as Location from "expo-location";
import { Colors } from "../../../theme";
import Search from "../../../components/common/Search";
import useDeliveryStore from "../../../state/deliveryAddressStore";
import { getAddress } from "../../../utility/location";
import { MaterialIcons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;

const HomeScreen: React.FC = () => {
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);
  const addDeliveryDetail = useDeliveryStore((state) => state.addDeliveryDetail);
  
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
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

  const getCityName = async (latitude: number, longitude: number): Promise<void> => {
    try {
      const response = await getAddress(latitude, longitude);
      console.log(
        "rev-geocoded address response:",
        response?.data?.items[0]?.address
      );

      const address = response?.data?.items[0]?.address;

      addDeliveryDetail({
        addressId: null,
        city: address?.city || null,
        state: address?.state || null,
        fullAddress: `${address?.street || ''}, ${address?.city || ''}, ${address?.postalCode || ''}`,
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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("../../search")}
        style={styles.headerContainer}
        activeOpacity={0.7}
      >
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={24} color={Colors.PRIMARY_COLOR} />
          <Text style={styles.searchPlaceholder}>Search for items or stores</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
  headerContainer: {
    backgroundColor: Colors.WHITE_COLOR,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GRAY_COLOR,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: '100%',
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.GRAY_COLOR,
  },
});

export default HomeScreen;