import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Header } from "../../app/address/SavedAddresses";
import { AddressTypeDropdown, InputField } from "../../app/address/AddNewAddress";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { GetAddressById, UpdateAddress } from "../../gql/api/user";
import { useLocalSearchParams } from "expo-router";

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const EditAddress: React.FC = () => {
  const { addressId } = useLocalSearchParams();

  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  const [addressInput, setAddressInput] = useState({
    updateAddressId: "",
    type: "Others",
    name: "",
    address: {
      line1: "",
      line2: "",
    },
    city: "",
    state: "",
    pincode: "",
    directions: "",
    isDefault: false,
    landmark: "",
    locality: "",
    receiver_phone: "", // Take from routing params
    geoLocation: {
      lat: 12.95706,
      lng: 77.22374,
    },
  });

  function toggleDropdown() {
    setIsDropdownExpanded((prev) => !prev);
  }

  const handleInputChange = (field: string, value: string) => {
    setAddressInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const autoCompleteAddress = (data: any, details: any) => {
    setAddressInput((prev) => ({
      ...prev,
      address: {
        line1: data.structured_formatting.main_text,
        line2: data.structured_formatting.secondary_text,
      },
      geoLocation: details.geometry.location,
      landmark: assignFromResponse("landmark", details).trim(),
      locality: assignFromResponse("locality", details).trim(),
      state: assignFromResponse("administrative_area_level_1", details).trim(),
      city: assignFromResponse("administrative_area_level_3", details).trim(),
      pincode: assignFromResponse("postal_code", details).trim(),
    }));
  };

  const assignFromResponse = (typeName: string, details: any) => {
    let value = "";
    details.address_components.forEach((component: any) => {
      if (component.types.includes(typeName)) {
        value += component.long_name + " ";
      }
    });
    return value;
  };

  const fetchAddresses = async (addressId: string) => {
    try {
      const response = await GetAddressById({ addressId });
      const address = response?.getAddressById as any;
      setAddressInput(address);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      Alert.alert("Error", "Failed to fetch addresses. Please try again.");
    }
  };

  useEffect(() => {
    fetchAddresses(addressId);
  }, []);

  const validateInputs = () => {
    const pincodePattern = /^\d{6}$/;
    const phonePattern = /^\d{10}$/;
    const isPincodeValid = pincodePattern.test(addressInput.pincode);
    const isPhoneNumberValid = phonePattern.test(addressInput.receiver_phone);
    return isPincodeValid && isPhoneNumberValid;
  };

  const updateAddress = async () => {
    if (validateInputs()) {
      try {
        addressInput.updateAddressId = addressId;
        const response = await UpdateAddress({ addressInput });
        Alert.alert("Success", "Remove alert and navigate to Saved addresses");
      } catch (error) {
        console.error("Error adding address:", error);
        Alert.alert(
          "☹️ Type cannot be empty!",
          "Please select an address type and try again."
        );
      }
    } else {
      Alert.alert(
        "Invalid inputs! :(",
        "Please ensure the following : \n\n1. Pincode is 6 digits long \n2. Phone number is 10 digits long"
      );
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Header title="Edit address" />
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.contentContainer}>
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 5 }}>
            Type
            <Text
              style={{
                color: "red",
                fontWeight: "300",
              }}
            >
              *
            </Text>
          </Text>
          <AddressTypeDropdown
            isDropdownExpanded={isDropdownExpanded}
            toggleDropdown={toggleDropdown}
            addressInput={addressInput}
            handleInputChange={handleInputChange}
          />
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 5 }}>
            Flat/Apartment/Building
            <Text
              style={{
                color: "red",
                fontWeight: "300",
              }}
            >
              *
            </Text>
          </Text>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.inputField }}
            placeholder={"Flat/Apartment/Building"}
            fetchDetails={true}
            onPress={(data, details) => {
              autoCompleteAddress(data, details);
            }}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
              components: "country:in",
            }}
            listEmptyComponent={
              <View
                style={{
                  flex: 1,
                  elevation: 3,
                  backgroundColor: "#ffffff",
                  padding: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#777777",
                    fontWeight: "600",
                  }}
                >
                  ☹️ No Results.!
                </Text>
              </View>
            }
          />
          <InputField
            placeholder="Address"
            value={addressInput.address.line2}
            onChangeText={(value) =>
              handleInputChange("address", {
                ...addressInput.address,
                line2: value,
              })
            }
          />
          <InputField
            placeholder="Landmark"
            value={addressInput.landmark}
            onChangeText={(value) => handleInputChange("landmark", value)}
          />
          <InputField
            placeholder="Locality"
            value={addressInput.locality}
            onChangeText={(value) => handleInputChange("locality", value)}
          />
          <InputField
            placeholder="Directions to reach"
            value={addressInput.directions}
            onChangeText={(value) => handleInputChange("directions", value)}
          />
          <InputField
            placeholder="City"
            value={addressInput.city}
            onChangeText={(value) => handleInputChange("city", value)}
          />
          <InputField
            placeholder="State"
            value={addressInput.state}
            onChangeText={(value) => handleInputChange("state", value)}
          />
          <InputField
            placeholder="Phone Number"
            value={addressInput.receiver_phone}
            onChangeText={(value) => handleInputChange("receiver_phone", value)}
          />
          <InputField
            placeholder="Pincode"
            value={addressInput.pincode}
            onChangeText={(value) => handleInputChange("pincode", value)}
          />
          <TouchableOpacity style={styles.addButton} onPress={updateAddress}>
            <Text style={styles.buttonText}>Update Address</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  contentContainer: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "center",
  },
  inputField: {
    padding: 10,
    borderWidth: 1,
    fontSize: 18,
    borderRadius: 7,
    borderColor: "#d6d6d6",
    marginBottom: 10,
  },
  addButton: {
    borderWidth: 1,
    borderColor: "#00BC66",
    borderRadius: 7,
    padding: 10,
    backgroundColor: "#00BC66",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "600",
  },
});
