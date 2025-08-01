import React, { useCallback, useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import useDeliveryStore from "../../state/deliveryAddressStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Loader from "../../components/common/Loader";
import ShareButton from "../../components/common/Share";
import { deleteAddress } from "../../components/address/deleteAddress";
import { updateAddress } from "../../components/address/updateAddress";
import Header from '../../components/address/AddressHeader';
import Constants from 'expo-constants';
import useUserDetails from '../../hook/useUserDetails';

const BASE_URL = Constants.expoConfig?.extra?.BACKEND_BASE_URL;

// Define the AddressType interface based on your API structure
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

// Create fetchAddress function since it's missing
const fetchAddress = async (authToken: string): Promise<AddressType[] | null> => {
  try {
    console.log('Fetching addresses with token:', authToken ? 'Token present' : 'No token');
    console.log('API URL:', `${BASE_URL}/users/address`);
    
    const response = await fetch(
      `${BASE_URL}/users/address`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      }
    );

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Fetch address failed:', response.status, errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Fetched address data:', data);
    return data;
  } catch (error) {
    console.error('Fetch address error:', error);
    return null;
  }
};

const SavedAddresses: React.FC = () => {
  // Get user details and authentication status
  const { userDetails, isLoading: authLoading, isAuthenticated, checkAuthentication } = useUserDetails();
  
  // states
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);
  const [isLoading, setIsLoading] = useState(true);
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Get the access token from user details
  const authToken = userDetails?.accessToken || "";

  // Check authentication status when component mounts
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !checkAuthentication()) {
        console.log('User not authenticated');
        setError('Please log in to view your saved addresses.');
        setIsLoading(false);
      }
    }
  }, [authLoading, isAuthenticated, checkAuthentication]);

  // handlers
  const fetchUserAddresses = async () => {
    try {
      console.log('Starting to fetch addresses...');
      setIsLoading(true);
      setError(null);
      
      if (!authToken) {
        console.log('No auth token available');
        setError('No authentication token available');
        setAddresses([]);
        return;
      }

      const addressesData = await fetchAddress(authToken);
      console.log("Fetched addresses:", addressesData);
      
      if (addressesData && Array.isArray(addressesData)) {
        setAddresses(addressesData); 
        console.log(`Successfully loaded ${addressesData.length} addresses`);
      } else if (addressesData === null) {
        setError('Failed to fetch addresses. Please try again.');
        setAddresses([]);
      } else {
        console.log('No addresses found or invalid response format');
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setError('Failed to load addresses. Please try again.');
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAddress = async (authToken: string) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await deleteAddress(authToken);
              if (result) {
                await fetchUserAddresses();
                Alert.alert("Success", "Address deleted successfully");
              } else {
                Alert.alert("Error", "Failed to delete address");
              }
            } catch (error) {
              console.error("Error deleting address:", error);
              Alert.alert("Error", "Failed to delete address");
            }
          },
        },
      ]
    );
  };

  const handleMarkAsDefault = async (addressId: string) => {
    try {
      // First, unmark all other addresses as default
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }));
      setAddresses(updatedAddresses);

      // Update on server
      const result = await updateAddress(authToken);
      if (result) {
        await fetchUserAddresses();
      } else {
        Alert.alert("Error", "Failed to mark address as default");
        await fetchUserAddresses(); // Revert to server state
      }
    } catch (error) {
      console.error("Error marking address as default:", error);
      Alert.alert("Error", "Failed to mark address as default");
      await fetchUserAddresses(); // Revert to server state
    }
  };

  const handleRetry = () => {
    if (authToken && isAuthenticated) {
      fetchUserAddresses();
    } else {
      setError('Please log in to continue.');
    }
  };

  // hooks
  useFocusEffect(
    useCallback(() => {
      console.log('useFocusEffect triggered');
      console.log('authLoading:', authLoading);
      console.log('isAuthenticated:', isAuthenticated);
      console.log('authToken:', authToken ? 'present' : 'missing');
      
      if (!authLoading && isAuthenticated && authToken) {
        fetchUserAddresses();
      }
    }, [authToken, authLoading, isAuthenticated])
  );

  // Show error state
  if (error && !isLoading) {
    return (
      <SafeAreaView style={styles.savedAddressesContainer}>
        <Header title="Pick or Add Address" />
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle" size={80} color="#E74C3C" />
          <Text style={styles.errorText}>Oops! Something went wrong</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Show loading while checking authentication
  if (authLoading || isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.savedAddressesContainer}>
      <Header title="Pick or Add Address" />
      
      {addresses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="map-marker-off" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No saved addresses</Text>
          <Text style={styles.emptySubtext}>Add your first address to get started</Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.cardContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {addresses
            .sort((a, b) => {
              // Move the default address to the start of the array
              if (b.isDefault && !a.isDefault) return 1;
              if (a.isDefault && !b.isDefault) return -1;
              return 0;
            })
            .map((address) => {
              const fullAddress = `${address.houseNo ? address.houseNo + ', ' : ''}${address.street ? address.street + ', ' : ''}${address.building ? address.building + ', ' : ''}${address.city}, ${address.state}, ${address.pincode}`;
              
              return (
                <SavedAddressCard
                  key={address.id}
                  type={address.type}
                  fullAddress={fullAddress}
                  userPhone={address.phone}
                  name={address.name}
                  isDefault={!!address.isDefault}
                  addressId={address.id}
                  onPress={handleDeleteAddress}
                  markAsDefault={handleMarkAsDefault}
                  pincode={address.pincode}
                  city={address.city}
                  state={address.state}
                  lat={address.gps.lat}
                  lng={address.gps.lon}
                  selectedDetails={selectedDetails}
                />
              );
            })}
        </ScrollView>
      )}

      {/* footer container */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push("/address/AddNewAddress");
          }}
          style={styles.addAddressButton}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="plus" size={20} color="#01884B" />
          <Text style={styles.addAddressButtonText}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const shadowEffect = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.1,
  shadowRadius: 3.84,
  elevation: 5,
};

interface SavedAddressCard {
  type: 'Home' | 'Work' | 'FriendsAndFamily' | 'Other';
  fullAddress: string;
  userPhone: string;
  name: string;
  isDefault: boolean;
  addressId: string;
  state: string;
  city: string;
  pincode: string;
  onPress: (addressId: string) => void;
  markAsDefault: (addressId: string) => void;
  lat: number;
  lng: number;
  selectedDetails: any;
}

const SavedAddressCard: React.FC<SavedAddressCard> = (props) => {
  const {
    type,
    fullAddress,
    userPhone,
    name,
    isDefault,
    addressId,
    onPress,
    markAsDefault,
    lat,
    lng,
    pincode,
    city,
    selectedDetails,
    state,
  } = props;

  const addDeliveryDetail = useDeliveryStore(
    (state) => state.addDeliveryDetail
  );

  const handleSelectDeliveryAddress = (addressId: string) => {
    addDeliveryDetail({
      addressId,
      city,
      state,
      pincode,
      fullAddress,
      name,
      isDefault,
      lat,
      lng,
    });
    router.back();
  };

  const getAddressIcon = () => {
    switch (type) {
      case 'Home':
        return <MaterialCommunityIcons name="home" size={24} color="#01884B" />;
      case 'Work':
        return <MaterialCommunityIcons name="briefcase" size={24} color="#FF6B35" />;
      case 'FriendsAndFamily':
        return <MaterialCommunityIcons name="account-group" size={24} color="#8E44AD" />;
      default:
        return <MaterialCommunityIcons name="map-marker" size={24} color="#3498DB" />;
    }
  };

  const getDisplayName = () => {
    if (type === 'FriendsAndFamily') return 'Friends & Family';
    return type;
  };

  const isSelected = selectedDetails?.addressId === addressId;

  return (
    <View style={[styles.savedAddressesCard, isSelected && styles.selectedCard]}>
      <View style={styles.addressCardHeader}>
        <View style={styles.addressTypeContainer}>
          {getAddressIcon()}
          <View style={styles.addressTitleContainer}>
            <Text style={styles.cardTitle}>{name || getDisplayName()}</Text>
            {isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>Default</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "../address/EditAddress",
                params: { addressId: addressId },
              })
            }
            style={styles.actionButton}
          >
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              color="#666"
            />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => onPress(addressId)}
            style={styles.actionButton}
          >
            <MaterialCommunityIcons name="delete-outline" size={20} color="#E74C3C" />
          </TouchableOpacity>
        </View>
      </View>

      {/* address text container */}
      <View style={styles.addressTextContainer}>
        <Text style={styles.addressText}>{fullAddress}</Text>
        <Text style={styles.phoneText}>📞 {userPhone}</Text>
      </View>

      {/* address buttons container */}
      <View style={styles.addressButtonsContainer}>
        <View style={styles.leftButtonsContainer}>
          <TouchableOpacity style={styles.shareButton}>
            <ShareButton type="address" address={fullAddress} />
          </TouchableOpacity>
          
          {!isDefault && (
            <TouchableOpacity
              onPress={() => markAsDefault(addressId)}
              style={styles.defaultButton}
            >
              <MaterialCommunityIcons name="star-outline" size={16} color="#01884B" />
              <Text style={styles.defaultButtonText}>Set as default</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* deliver here */}
        {!isSelected ? (
          <TouchableOpacity
            style={styles.deliverHereButton}
            onPress={() => handleSelectDeliveryAddress(addressId)}
            activeOpacity={0.8}
          >
            <Text style={styles.deliverHereButtonText}>Deliver here</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.selectedIndicator}>
            <MaterialCommunityIcons name="check-circle" size={16} color="#01884B" />
            <Text style={styles.selectedText}>Selected</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  savedAddressesContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#E74C3C",
    marginTop: 16,
    textAlign: "center",
  },
  errorSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#01884B",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  savedAddressesCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    ...shadowEffect,
  },
  selectedCard: {
    borderColor: "#01884B",
    borderWidth: 2,
  },
  addressCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  addressTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  addressTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  defaultBadge: {
    backgroundColor: "#01884B",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  defaultBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  actionButtonsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  addressTextContainer: {
    marginLeft: 36,
    marginBottom: 16,
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 8,
  },
  phoneText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  addressButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 36,
  },
  leftButtonsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  defaultButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  defaultButtonText: {
    color: "#01884B",
    fontSize: 12,
    fontWeight: "500",
  },
  deliverHereButton: {
    backgroundColor: "#01884B",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deliverHereButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  selectedIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  selectedText: {
    color: "#01884B",
    fontWeight: "600",
    fontSize: 12,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  addAddressButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#01884B",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  addAddressButtonText: {
    color: "#01884B",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default SavedAddresses;