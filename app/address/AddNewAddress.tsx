import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { Header } from "./SavedAddresses";
import { AddNewUserAddress } from "../../gql/api/user";
import axios from "axios";
import useUserDetails from "../../hook/useUserDetails";
import { router } from "expo-router";
import Type from "../../components/address/type";

interface AddressInput {
  type: "Others" | "Home" | "Work" | "FriendsAndFamily";
  name: string;
  address: {
    line1: string;
    line2: string;
  };
  city: string;
  state: string;
  pincode: string;
  directions: string;
  isDefault: boolean;
  landmark: string;
  locality: string;
  receiverPhone: string;
  geoLocation: {
    lat: number;
    lng: number;
  };
}

interface InputFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}

interface AddressTypeDropdownProps {
  isDropdownExpanded: boolean;
  toggleDropdown: () => void;
  addressInput: AddressInput;
  handleInputChange: (field: string, value: any) => void;
}

const AddNewAddress: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { userDetails, getUserDetails } = useUserDetails();

  const [addressInput, setAddressInput] = useState<AddressInput>({
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
    receiverPhone: "",
    geoLocation: {
      lat: 0,
      lng: 0,
    },
  });

  useEffect(() => {
    getUserDetails().then(() => {
      setIsLoading(false);
      // Update receiverPhone after userDetails is loaded
      setAddressInput(prev => ({
        ...prev,
        receiverPhone: userDetails?.phoneNumber || "",
      }));
    });
   // console.log("token Fetched", userDetails?.bearerToken);
  }, []);

  const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);
  function toggleDropdown() {
    setIsDropdownExpanded((prev) => !prev);
  }
  const [gpsDropdownExpanded, setGpsDropdownExpanded] = useState(false);
  function handleGpsDropdown() {
    setGpsDropdownExpanded((prev) => !prev);
  }

  const handleInputChange = (field: string, value: any) => {
    setAddressInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const assignFromResponse = (typeName: string, details: any): string => {
    let value = "";
    if (details?.address_components) {
      details.address_components.forEach((component: any) => {
        if (component.types && component.types.includes(typeName)) {
          value += component.long_name + " ";
        }
      });
    }
    return value;
  };

  const autoCompleteAddress = (data: any, details: any) => {
    if (data && details) {
      setAddressInput((prev) => ({
        ...prev,
        address: {
          line1: data.structured_formatting?.main_text || "",
          line2: data.structured_formatting?.secondary_text || "",
        },
        geoLocation: details.geometry?.location || { lat: 0, lng: 0 },
        landmark: assignFromResponse("landmark", details).trim(),
        locality: assignFromResponse("locality", details).trim(),
        state: assignFromResponse("administrative_area_level_1", details).trim(),
        city: assignFromResponse("administrative_area_level_3", details).trim(),
        pincode: assignFromResponse("postal_code", details).trim(),
      }));
    }
  };

  const validateInputs = (): boolean => {
    const pincodePattern = /^\d{6}$/;
    const phonePattern = /^\d{10}$/;
    const isPincodeValid = pincodePattern.test(addressInput.pincode);
    const isPhoneNumberValid = phonePattern.test(addressInput.receiverPhone);
    return isPincodeValid && isPhoneNumberValid;
  };

  const handleAddAddress = async () => {
    if (validateInputs()) {
      try {
        const response = await AddNewUserAddress({ addressInput });
        router.push("/address/SavedAddresses");
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

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Insufficient permissions");
        Alert.alert("Error", "Insufficient permissions to access location");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      getcityName(latitude, longitude);
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Error", "Failed to fetch location");
    }
  };

  const getcityName = async (latitude: number, longitude: number) => {
    const apiKey = "t7wBcKS6d2rJ9ZLDFCZt4rGOwBhqP_9QFJE8rfxuVdk";
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apiKey=${apiKey}`;

    try {
      const url_Response = await axios.get(url);
      const addressData = url_Response?.data?.items?.[0]?.address;
      
      if (addressData) {
        setAddressInput((prev) => ({
          ...prev,
          address: {
            line1: addressData.label || "",
            line2: addressData.label || "",
          },
          city: addressData.city || "",
          state: addressData.state || "",
          pincode: addressData.postalCode || "",
          locality: `${addressData.street || ""}, ${addressData.district || ""}`.trim(),
          geoLocation: {
            lat: latitude,
            lng: longitude,
          },
        }));
      }
      console.log("User Address : ", addressInput);
    } catch (error) {
      console.error("Error during geocoding with HERE API:", error);
      return null;
    }
  };

  const handleTypeChange = (value: string) => {
    setAddressInput((prev) => ({
      ...prev,
      type: value as "Others" | "Home" | "Work" | "FriendsAndFamily",
    }));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header title="Add new address" />
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.contentContainer}>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.inputField }}
            placeholder="Search for street, area, etc."
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
                  style={{ fontSize: 16, color: "#777777", fontWeight: "600" }}
                >
                  ☹️ No Results.!
                </Text>
              </View>
            }
          />
          <TouchableOpacity
            onPress={getLocation}
            style={{
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "green" }}>
              <MaterialCommunityIcons size={16} name="crosshairs-gps" /> Use
              current location
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#d9d9d9",
                borderRadius: 5,
                flex: 1,
                height: 1,
              }}
            />
            <Text
              style={{ fontWeight: "600", marginHorizontal: 10, fontSize: 16 }}
            >
              OR
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#d9d9d9",
                borderRadius: 5,
                flex: 1,
                height: 1,
              }}
            />
          </View>
          <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 5 }}>
            Save as
            <Text
              style={{
                color: "red",
                fontWeight: "300",
              }}
            >
              *
            </Text>
          </Text>
          <Type saveAs={handleTypeChange} />

          <InputField
            placeholder="Name"
            value={addressInput.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />

          <InputField
            placeholder="Receiver's Phone"
            value={addressInput.receiverPhone}
            onChangeText={(value) => handleInputChange("receiverPhone", value)}
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
            placeholder="Pincode"
            value={addressInput.pincode}
            onChangeText={(value) => handleInputChange("pincode", value)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
            <Text style={styles.buttonText}>Add address</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export const AddressTypeDropdown: React.FC<AddressTypeDropdownProps> = ({
  isDropdownExpanded,
  toggleDropdown,
  addressInput,
  handleInputChange,
}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
          borderWidth: 1,
          borderColor: "#d6d6d6",
          marginBottom: !isDropdownExpanded ? 10 : 0,
        }}
      >
        <TouchableOpacity
          onPress={toggleDropdown}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingRight: 10,
          }}
        >
          <Text
            style={{
              ...styles.dropdownItem,
              flex: 1,
              borderBottomWidth: 0,
              color: !addressInput.type ? "#999999" : "black",
            }}
          >
            {!addressInput.type
              ? "Select type"
              : addressInput.type === "FriendsAndFamily"
              ? "Friends & Family"
              : addressInput.type}
          </Text>
          {isDropdownExpanded ? (
            <Image source={require("../../assets/upArrow.png")} />
          ) : (
            <Image source={require("../../assets/dropdownArrow.png")} />
          )}
        </TouchableOpacity>
      </View>
      {isDropdownExpanded && (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#d6d6d6",
            borderRadius: 7,
            marginBottom: 10,
            elevation: 3,
            backgroundColor: "#ffffff",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              handleInputChange("type", "Home");
              toggleDropdown();
            }}
          >
            <Text style={styles.dropdownItem}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleInputChange("type", "Work");
              toggleDropdown();
            }}
          >
            <Text style={styles.dropdownItem}>Work</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleInputChange("type", "FriendsAndFamily");
              toggleDropdown();
            }}
          >
            <Text style={styles.dropdownItem}>Friends & Family</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleInputChange("type", "Others");
              toggleDropdown();
            }}
          >
            <Text style={styles.dropdownItem}>Others</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChangeText,
}) => {
  const requiredFields = ["Type", "City", "State", "Pincode"];
  return (
    <View>
      <Text style={{ fontWeight: "600", fontSize: 16, marginBottom: 5 }}>
        {placeholder}
        {requiredFields.includes(placeholder) && (
          <Text
            style={{
              color: "red",
              fontWeight: "300",
            }}
          >
            *
          </Text>
        )}
      </Text>
      <TextInput
        placeholder={placeholder}
        style={styles.inputField}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#ffffff",
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
  dropdownItem: {
    paddingVertical: 12,
    fontSize: 16,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#d6d6d6",
  },
});

export default AddNewAddress;