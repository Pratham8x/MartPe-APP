// LocationBar.tsx

import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import { router } from "expo-router";
import { getAddress } from "../../utility/location";
import Feather from "react-native-vector-icons/Feather";

const LocationBar = () => {
  const [pinCode, setPinCode] = useState("");
  const [streetName, setStreetName] = useState("");
  const [cityName, setCityName] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const getcityName = async (latitude, longitude) => {
    try {
      // get address from revgeocode data
      const response = await getAddress(latitude, longitude);
      console.log(response.data.items[0].address);

      // get address from open street map data
      // const responses = await getAddressOpenStreetMap(latitude, longitude);
      // console.log(responses.data.address.postcode);

      // process revgeocode data for address
      const address = response?.data?.items[0]?.address;

      // set address fields from the data
      if (address && address?.street) setStreetName(address.street);
      if (address && address?.city) setCityName(address.city);
      if (address && address?.postalCode) setPinCode(address.postalCode);

      // set the combined delivery address
      const deliveryAddress = [streetName, cityName, pinCode].join(", ");
      setDeliveryAddress(deliveryAddress);
    } catch (error) {
      console.error("Error during geocoding with API:", error);
    }
  };

  const getUserLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    } else {
      console.log("Permission to access location was approved");
    }
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });
    const { latitude, longitude } = location?.coords || {};
    getcityName(latitude, longitude);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => router.push("/address/SavedAddresses")}
      style={styles.container}
    >
      {/* location symbol */}
      {/* <View style={styles.locationIcon}>
            <Svg
              // xmlns="http://www.w3.org/2000/svg"
              width={12}
              height={16}
              fill="none"
            >
              <Path
                fill="#000"
                d="M6 0C2.687 0 0 2.508 0 5.6 0 9.8 6 16 6 16s6-6.2 6-10.4C12 2.508 9.313 0 6 0Zm0 7.6c-1.183 0-2.143-.896-2.143-2s.96-2 2.143-2c1.183 0 2.143.896 2.143 2s-.96 2-2.143 2Z"
              />
            </Svg>
          </View> */}
      {/* delivery address text */}
      <View style={{ padding: 0 }}>
        <Text style={styles.deliveryNowStyle}>Deliver Now</Text>
        <Text style={styles.deliveryAddressStyle}>
          {deliveryAddress ? deliveryAddress : "Select Location"}{" "}
          <Feather name="chevron-down" size={15} color="#303030" />
        </Text>
        {/* chevron-down */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    gap: 1,
  },
  deliveryNowStyle: {
    fontSize: 12,
    color: "#8f8f90",
  },
  deliveryAddressStyle: {
    color: "#303030",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LocationBar;
