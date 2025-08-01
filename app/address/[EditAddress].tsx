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
import { fetchAddress } from "../../components/address/fetchAddress";
import { updateAddress as updateAddressAPI } from "../../components/address/updateAddress"; // Fixed import path
import { deleteAddress as deleteAddressAPI } from "../../components/address/deleteAddress"; // Fixed import path
import { useLocalSearchParams, router } from "expo-router";
import Type from "../../components/address/type";
import useUserDetails from '../../hook/useUserDetails';

interface AddressType {
  _id: string;
  type: string,
  name: string;
  phone: string;
  gps: { lat: number; lon: number };
  houseNo: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  building?: string;
}

// Define the AddressInput type used in the component
type AddressInput = Omit<AddressType, '_id'>;

const EditAddress: React.FC = () => {
  const { addressId } = useLocalSearchParams();
  const { userDetails, isLoading: authLoading, isAuthenticated } = useUserDetails();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [addressInput, setAddressInput] = useState<AddressInput>({
    type: 'Home',
    name: "",
    phone: "",
    gps: { lat: 0, lon: 0 },
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    building: "",
  });
  const [originalAddress, setOriginalAddress] = useState<AddressInput | null>(null);

  const authToken = userDetails?.accessToken || "";

  const handleInputChange = (field: string, value: any) => {
    setAddressInput((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const fetchAddressDetails = async (id: string) => {
    try {
      setIsLoading(true);
      if (!authToken) {
        Alert.alert("Authentication Error", "Please log in to continue.");
        return router.back();
      }

      const allAddresses = await fetchAddress(authToken);
      if (!allAddresses) {
        Alert.alert("Error", "Failed to fetch addresses. Please try again.");
        return router.back();
      }

      const found = allAddresses.find((a) => a._id === id);
      if (!found) {
        Alert.alert("Error", "Address not found.");
        return router.back();
      }

      const { type, name, phone, gps, houseNo, street, city, state, pincode, building } = found;
      const formatted: AddressInput = { 
        type, 
        name, 
        phone, 
        gps, 
        houseNo, 
        street, 
        city, 
        state, 
        pincode, 
        building: building || "" 
      };
      
      setAddressInput(formatted);
      setOriginalAddress(formatted);
    } catch (e) {
      console.error("Fetch error:", e);
      Alert.alert("Error", "Failed to fetch address details.");
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !authToken) {
        Alert.alert("Authentication Required", "Please log in to continue.");
        router.back();
        return;
      }

      if (addressId) {
        fetchAddressDetails(addressId as string);
      }
    }
  }, [authLoading, isAuthenticated, authToken, addressId]);

  const validateInputs = (): boolean => {
    const errors: string[] = [];

    if (!addressInput.name.trim()) errors.push("Name is required");
    if (!addressInput.phone.trim()) errors.push("Phone is required");
    if (!/^\d{10}$/.test(addressInput.phone.replace(/\s/g, ''))) {
      errors.push("Phone must be 10 digits");
    }
    if (!addressInput.houseNo.trim()) errors.push("House/Flat number is required");
    if (!addressInput.street.trim()) errors.push("Street is required");
    if (!addressInput.city.trim()) errors.push("City is required");
    if (!addressInput.state.trim()) errors.push("State is required");
    if (!/^\d{6}$/.test(addressInput.pincode.replace(/\s/g, ''))) {
      errors.push("Pincode must be 6 digits");
    }

    if (errors.length) {
      Alert.alert("Validation Error", errors.join("\n"));
      return false;
    }
    return true;
  };

  const hasChanges = (): boolean => {
    if (!originalAddress) return true;
    
    // Compare only the relevant fields, excluding GPS which might have floating point precision issues
    const fieldsToCompare: (keyof AddressInput)[] = [
      'type', 'name', 'phone', 'houseNo', 'street', 'city', 'state', 'pincode', 'building'
    ];
    
    return fieldsToCompare.some(
      field => addressInput[field] !== originalAddress[field]
    );
  };

// In your EditAddress component

const handleUpdateAddress = async () => {
  if (!validateInputs()) return;
  if (!hasChanges()) {
    Alert.alert("No Changes", "No changes were made to update.");
    return;
  }

  setIsSaving(true);
  try {
    const result = await updateAddressAPI(
      authToken,
      addressId as string,
      addressInput.type,
      addressInput.name,
      addressInput.phone,
      addressInput.gps,
      addressInput.houseNo,
      addressInput.street,
      addressInput.city,
      addressInput.state,
      addressInput.pincode,
     // addressInput.building
    );

    if (result) {
      Alert.alert("Success", "Address updated successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  } catch (e: any) {
    console.error("Update error:", e);
    Alert.alert(
      "Update Failed", 
      e.message || "Failed to update address. Please try again."
    );
  } finally {
    setIsSaving(false);
  }
};

const handleDeleteAddress = async () => {
  Alert.alert(
    "Delete Address", 
    "Are you sure you want to delete this address?", 
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setIsDeleting(true);
          try {
            const result = await deleteAddressAPI(authToken, addressId as string);
            if (result) {
              Alert.alert("Success", "Address deleted successfully!", [
                { text: "OK", onPress: () => router.back() },
              ]);
            }
          } catch (e: any) {
            console.error("Delete error:", e);
            Alert.alert(
              "Delete Failed", 
              e.message || "Failed to delete address. Please try again."
            );
          } finally {
            setIsDeleting(false);
          }
        },
      },
    ]
  );
};

  const handleTypeChange = (value: string) => {
    let apiValue: AddressInput["type"] = "Other";
    if (value === "Home") apiValue = "Home";
    else if (value === "Work") apiValue = "Work";
    else if (value === "Friends & Family") apiValue = "FriendsAndFamily";
    setAddressInput((prev) => ({ ...prev, type: apiValue }));
  };


  const getDisplayType = (type: AddressInput["type"]) => {
    if (type === "FriendsAndFamily") return "Friends & Family";
    return type;
  };

  if (authLoading || isLoading) {
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
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Address Type</Text>
            <Type saveAs={handleTypeChange} />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            <InputField 
              placeholder="Full Name" 
              value={addressInput.name} 
              onChangeText={(v) => handleInputChange("name", v)} 
              required 
            />
            <InputField 
              placeholder="Phone Number" 
              value={addressInput.phone} 
              onChangeText={(v) => handleInputChange("phone", v)} 
              keyboardType="phone-pad" 
              required 
            />
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Address Details</Text>
            <InputField 
              placeholder="House/Flat No." 
              value={addressInput.houseNo} 
              onChangeText={(v) => handleInputChange("houseNo", v)} 
              required 
            />
            <InputField 
              placeholder="Street" 
              value={addressInput.street} 
              onChangeText={(v) => handleInputChange("street", v)} 
              required 
            />
            <InputField 
              placeholder="Building (Optional)" 
              value={addressInput.building || ""} 
              onChangeText={(v) => handleInputChange("building", v)} 
            />
            <InputField 
              placeholder="City" 
              value={addressInput.city} 
              onChangeText={(v) => handleInputChange("city", v)} 
              required 
            />
            <InputField 
              placeholder="State" 
              value={addressInput.state} 
              onChangeText={(v) => handleInputChange("state", v)} 
              required 
            />
            <InputField 
              placeholder="Pincode" 
              value={addressInput.pincode} 
              onChangeText={(v) => handleInputChange("pincode", v)} 
              keyboardType="numeric" 
              required 
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={handleDeleteAddress} 
              style={[styles.deleteButton, isDeleting && styles.buttonDisabled]}
              disabled={isDeleting || isSaving}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color="#E74C3C" />
              ) : (
                <MaterialCommunityIcons name="delete-outline" size={20} color="#E74C3C" />
              )}
              <Text style={styles.deleteButtonText}>
                {isDeleting ? "Deleting..." : "Delete Address"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.updateButton, (isSaving || isDeleting) && styles.buttonDisabled]}
              onPress={handleUpdateAddress}
              disabled={isSaving || isDeleting}
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  scrollContainer: { paddingBottom: 20 },
  contentContainer: { padding: 16 },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#333", marginBottom: 12 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#FDECEA",
    borderWidth: 1,
    borderColor: "#E74C3C",
    flex: 1,
  },
  deleteButtonText: {
    color: "#E74C3C",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 14,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#01884B",
    flex: 1,
  },
  buttonDisabled: { opacity: 0.6 },
  updateButtonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
  },
  loadingText: { marginTop: 16, fontSize: 16, color: "#666" },
});
