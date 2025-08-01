import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../../components/address/AddressHeader";
import { InputField } from "../../app/address/AddNewAddress";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { fetchAddress } from "../../components/address/fetchAddress";
import { updateAddress as updateAddressAPI } from "../../components/address/updateAddress";
import { useLocalSearchParams, router } from "expo-router";
import Type from "../../components/address/type";

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

interface AddressInput {
  type: 'Home' | 'Work' | 'FriendsAndFamily' | 'Other';
  name: string;
  phone: string;
  gps: {
    lat: number;
    lon: number;
  };
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  building?: string;
}

interface AddressType {
  id: string;
  type: 'Home' | 'Work' | 'FriendsAndFamily' | 'Other';
  name: string;
  phone: string;
  gps: {
    lat: number;
    lon: number;
  };
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  building?: string;
  isDefault?: boolean;
}

const EditAddress: React.FC = () => {
  const { addressId } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [authToken, setAuthToken] = useState<string>(""); // You'll need to get this from your auth system

  const [addressInput, setAddressInput] = useState<AddressInput>({
    type: 'Home',
    name: "",
    phone: "",
    gps: {
      lat: 0,
      lon: 0,
    },
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    building: "",
  });

  const [originalAddress, setOriginalAddress] = useState<AddressInput | null>(null);

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
    return value.trim();
  };

  const autoCompleteAddress = (data: any, details: any) => {
    if (data && details) {
      const streetNumber = assignFromResponse("street_number", details);
      const route = assignFromResponse("route", details);
      
      setAddressInput((prev) => ({
        ...prev,
        houseNo: streetNumber || "",
        street: route || data.structured_formatting?.main_text || "",
        building: data.structured_formatting?.secondary_text || "",
        gps: {
          lat: details.geometry?.location?.lat || 0,
          lon: details.geometry?.location?.lng || 0,
        },
        state: assignFromResponse("administrative_area_level_1", details),
        city: assignFromResponse("locality", details) || 
              assignFromResponse("administrative_area_level_2", details),
        pincode: assignFromResponse("postal_code", details),
      }));
    }
  };

  const fetchAddressDetails = async (addressId: string) => {
    try {
      setIsLoading(true);
      
      if (!authToken) {
        Alert.alert("Error", "Authentication token is missing. Please login again.");
        router.back();
        return;
      }

      // Fetch all addresses and find the specific one
      const addressesData = await fetchAddress(authToken);
      
      if (addressesData && Array.isArray(addressesData)) {
        const foundAddress = addressesData.find((addr: AddressType) => addr.id === addressId);
        
        if (foundAddress) {
          const formattedAddress: AddressInput = {
            type: foundAddress.type || 'Home',
            name: foundAddress.name || "",
            phone: foundAddress.phone || "",
            gps: {
              lat: foundAddress.gps?.lat || 0,
              lon: foundAddress.gps?.lon || 0,
            },
            houseNo: foundAddress.houseNo || "",
            street: foundAddress.street || "",
            city: foundAddress.city || "",
            state: foundAddress.state || "",
            pincode: foundAddress.pincode || "",
            building: foundAddress.building || "",
          };
          
          setAddressInput(formattedAddress);
          setOriginalAddress(formattedAddress);
        } else {
          Alert.alert("Error", "Address not found");
          router.back();
        }
      } else {
        Alert.alert("Error", "Failed to fetch address details");
        router.back();
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      Alert.alert("Error", "Failed to fetch address details. Please try again.");
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (addressId && authToken) {
      fetchAddressDetails(addressId as string);
    }
  }, [addressId, authToken]);

  // You'll need to set up auth token management
  useEffect(() => {
    const getAuthToken = async () => {
      // TODO: Get the auth token from your authentication system
      // const token = await AsyncStorage.getItem('authToken');
      // setAuthToken(token || "");
      
      // For now, you'll need to set this up properly
      setAuthToken("your-auth-token-here");
    };
    getAuthToken();
  }, []);

  const validateInputs = (): boolean => {
    const errors: string[] = [];

    if (!addressInput.type) {
      errors.push("Please select an address type");
    }
    if (!addressInput.name.trim()) {
      errors.push("Name is required");
    }
    if (!addressInput.phone.trim()) {
      errors.push("Phone number is required");
    } else if (!/^\d{10}$/.test(addressInput.phone)) {
      errors.push("Phone number must be 10 digits");
    }
    if (!addressInput.street.trim()) {
      errors.push("Street address is required");
    }
    if (!addressInput.city.trim()) {
      errors.push("City is required");
    }
    if (!addressInput.state.trim()) {
      errors.push("State is required");
    }
    if (!addressInput.pincode.trim()) {
      errors.push("Pincode is required");
    } else if (!/^\d{6}$/.test(addressInput.pincode)) {
      errors.push("Pincode must be 6 digits");
    }

    if (errors.length > 0) {
      Alert.alert("Validation Error", errors.join("\n"));
      return false;
    }
    return true;
  };

  const hasChanges = (): boolean => {
    if (!originalAddress) return true;
    return JSON.stringify(addressInput) !== JSON.stringify(originalAddress);
  };

  const handleUpdateAddress = async () => {
    if (!validateInputs()) return;

    if (!hasChanges()) {
      Alert.alert("No Changes", "No changes detected to save.");
      return;
    }

    if (!authToken) {
      Alert.alert("Error", "Authentication token is missing. Please login again.");
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateAddressAPI(
        authToken,
        addressInput.type,
        addressInput.name,
        addressInput.phone,
        addressInput.gps,
        addressInput.houseNo,
        addressInput.street,
        addressInput.city,
        addressInput.state,
        addressInput.pincode,
        addressInput.building
      );

      if (result) {
        Alert.alert("Success", "Address updated successfully!", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      } else {
        Alert.alert("Error", "Failed to update address. Please try again.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      Alert.alert("Error", "Failed to update address. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleTypeChange = (value: string) => {
    // Map the display name back to the API value
    let apiValue: 'Home' | 'Work' | 'FriendsAndFamily' | 'Other';
    switch (value) {
      case 'Friends & Family':
        apiValue = 'FriendsAndFamily';
        break;
      case 'Home':
        apiValue = 'Home';
        break;
      case 'Work':
        apiValue = 'Work';
        break;
      default:
        apiValue = 'Other';
        break;
    }
    
    setAddressInput((prev) => ({
      ...prev,
      type: apiValue,
    }));
  };

  const handleCancel = () => {
    if (hasChanges()) {
      Alert.alert(
        "Discard Changes",
        "You have unsaved changes. Are you sure you want to go back?",
        [
          {
            text: "Stay",
            style: "cancel",
          },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => router.back(),
          },
        ]
      );
    } else {
      router.back();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#01884B" />
        <Text style={styles.loadingText}>Loading address details...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header title="Edit Address" />

      <ScrollView 
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Address Search Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Update Address</Text>
            <GooglePlacesAutocomplete
              styles={{ 
                textInput: styles.searchInput,
                listView: styles.searchResults,
                row: styles.searchResultRow,
                description: styles.searchResultText,
              }}
              placeholder="Search for new address..."
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
                <View style={styles.noResultsContainer}>
                  <MaterialCommunityIcons name="map-search" size={40} color="#ccc" />
                  <Text style={styles.noResultsText}>No results found</Text>
                </View>
              }
              renderLeftButton={() => (
                <MaterialCommunityIcons 
                  name="magnify" 
                  size={20} 
                  color="#666" 
                  style={styles.searchIcon} 
                />
              )}
            />
          </View>

          {/* Address Type Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              Address Type <Text style={styles.required}>*</Text>
            </Text>
            <Type saveAs={handleTypeChange} initialValue={addressInput.type} />
          </View>

          {/* Personal Details Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <InputField
              placeholder="Full Name"
              value={addressInput.name}
              onChangeText={(value) => handleInputChange("name", value)}
              required
            />
            <InputField
              placeholder="Phone Number"
              value={addressInput.phone}
              onChangeText={(value) => handleInputChange("phone", value)}
              keyboardType="phone-pad"
              required
            />
          </View>

          {/* Address Details Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Address Details</Text>
            <InputField
              placeholder="House/Flat No."
              value={addressInput.houseNo}
              onChangeText={(value) => handleInputChange("houseNo", value)}
            />
            <InputField
              placeholder="Street Address"
              value={addressInput.street}
              onChangeText={(value) => handleInputChange("street", value)}
              required
            />
            <InputField
              placeholder="Building/Apartment"
              value={addressInput.building || ""}
              onChangeText={(value) => handleInputChange("building", value)}
            />
            <View style={styles.rowContainer}>
              <View style={styles.halfWidth}>
                <InputField
                  placeholder="City"
                  value={addressInput.city}
                  onChangeText={(value) => handleInputChange("city", value)}
                  required
                />
              </View>
              <View style={styles.halfWidth}>
                <InputField
                  placeholder="Pincode"
                  value={addressInput.pincode}
                  onChangeText={(value) => handleInputChange("pincode", value)}
                  keyboardType="numeric"
                  required
                />
              </View>
            </View>
            <InputField
              placeholder="State"
              value={addressInput.state}
              onChangeText={(value) => handleInputChange("state", value)}
              required
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={handleCancel}
              disabled={isSaving}
            >
              <MaterialCommunityIcons name="close" size={20} color="#666" />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.updateButton, isSaving && styles.updateButtonDisabled]} 
              onPress={handleUpdateAddress}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <MaterialCommunityIcons name="content-save" size={20} color="#fff" />
              )}
              <Text style={styles.updateButtonText}>
                {isSaving ? "Updating..." : "Update Address"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Changes Indicator */}
          {hasChanges() && (
            <View style={styles.changesIndicator}>
              <MaterialCommunityIcons name="information" size={16} color="#FF6B35" />
              <Text style={styles.changesText}>You have unsaved changes</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  backButton: {
    padding: 4,
    borderRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    padding: 16,
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  required: {
    color: "#E74C3C",
    fontSize: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    paddingLeft: 45,
  },
  searchIcon: {
    position: "absolute",
    left: 16,
    top: 12,
    zIndex: 1,
  },
  searchResults: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
  },
  searchResultRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchResultText: {
    fontSize: 14,
    color: "#333",
  },
  noResultsContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  noResultsText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  updateButton: {
    flex: 1,
    backgroundColor: "#01884B",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#01884B",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  updateButtonDisabled: {
    backgroundColor: "#ccc",
    shadowOpacity: 0,
    elevation: 0,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  changesIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF3E0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#FFE0B2",
  },
  changesText: {
    color: "#FF6B35",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
});