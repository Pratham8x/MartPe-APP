import React, { useCallback, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DeleteUserAddress,
  MarkAddressAsDefault,
  getAllAddresses,
} from "../../gql/api/user";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import useDeliveryStore from "../../state/deliveryAddressStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UserAddress } from "../../gql/graphql";
import Loader from "../../components/common/Loader";
import ShareButton from "../../components/common/Share";

const SavedAddresses: React.FC = () => {
  // states
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);
  const [isLoading, setIsLoading] = useState(true);

  const [addresses, setAddresses] = useState<UserAddress[]>([]);

  // handlers
  const fetchAddresses = async () => {
    try {
      const response = await getAllAddresses();
      const { getAllAddresses: addresses } = response || {};
      setAddresses(addresses);
      // console.log("Addresses fetched from server:", addresses);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      Alert.alert("Error", "Failed to fetch addresses. Please try again.");
    }
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await DeleteUserAddress({ addressId });
      await fetchAddresses();
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleMarkAsDefault = async (addressId: string) => {
    try {
      await MarkAddressAsDefault({
        addressId,
        isDefault: true,
      });
      await fetchAddresses();
    } catch (error) {
      console.error("Error marking address as default:", error);
    }
  };

  // hooks
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
      setIsLoading(false);
    }, [])
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.savedAddressesContainer}>
      <Header title="Pick or Add Address" />
      <ScrollView style={styles.cardContainer}>
        {addresses
          .sort((a, b) => {
            // Move the default address to the start of the array
            if (b.isDefault && !a.isDefault) return 1;
            if (a.isDefault && !b.isDefault) return -1;
            return 0;
          })
          .map((address) => {
const fullAddress = address.address?.line1
  ? `${address.address.line1}, ${address.city || ""}, ${address.state || ""}, ${address.pincode || ""}`
  : `${address.city || ""}, ${address.state || ""}, ${address.pincode || ""}`;
            const userPhone = address.receiver_phone || "";
            return (
              <SavedAddressCard
                type={address.type}
                fullAddress={fullAddress}
                userPhone={userPhone}
                name={address.name}
               isDefault={!!address.isDefault}
                key={address.id}
                addressId={address.id}
                onPress={handleDeleteAddress}
                markAsDefault={handleMarkAsDefault}
                pincode={address.pincode}
                city={address.city}
                state={address.state}
                lat={address?.geoLocation?.lat}
                lng={address?.geoLocation?.lng}
                selectedDetails={selectedDetails}
              />
            );
          })}
      </ScrollView>

      {/* footer container */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push("/address/AddNewAddress");
          }}
          style={styles.addAddressButton}
        >
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
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
};

export const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <MaterialCommunityIcons name="chevron-left" size={30} color="black" />
        </Pressable>

        <Text style={styles.headerText}>{title || "Header"}</Text>
      </View>
      {/* <View
        style={{
          marginHorizontal: Dimensions.get("screen").width * 0.03,
          ...shadowEffect,
          elevation: 2,
        }}
      >
        <Text style={styles.savedAddressesCard}>Use current location</Text>
      </View> */}
    </View>
  );
};

interface SavedAddressCard {
  type: string;
  fullAddress: string;
  // route: string;

  userPhone: string;
  name: string;
  isDefault: boolean;
  addressId: string;
  // storeId: string;
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
    // route,
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

  const handleSelectDeliveryAddress = (addressId : string) => {
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
    // markAsDefault(addressId);
    router.back();
  };

  return (
    <SafeAreaView style={styles.savedAddressesCard}>
      <View style={styles.addressCardHeader}>
        {/* address icon */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {type === "Home" ? (
            // <Image source={require("../../assets/home.png")} />
            <MaterialCommunityIcons name="home" size={22} color="black" />
          ) : type === "Work" ? (
            <MaterialCommunityIcons name="briefcase" size={22} color="black" />
          ) : (
            // <Image source={require("../../assets/othersAddress.png")} />
            <MaterialCommunityIcons
              name="human-male-male"
              size={22}
              color="black"
            />
          )}
          <Text style={styles.cardTitle}>
            {type === "null null" ? "Others" : name}
          </Text>
          {isDefault && <Text style={styles.defaultTabText}>Default</Text>}
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "../address/EditAddress",
                params: { addressId: addressId },
              })
            }
          >
            <MaterialCommunityIcons
              name="home-edit-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPress(addressId)}>
            {/* <Image source={require("../../assets/cross.png")} /> */}
            <MaterialCommunityIcons name="delete" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {/* address text container */}
      <View style={styles.addressTextContainer}>
        <Text style={styles.addressText}>{fullAddress}</Text>
        <Text style={styles.phoneText}>Receiver's Number - {userPhone}</Text>
      </View>

      {/* address buttons container */}
      <View style={styles.addressButtonsContainer}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.addressButton}>
            <ShareButton type="address" address={fullAddress} incentivise={false}/>
          </TouchableOpacity>
          {/* share address */}
          {!isDefault ? (
            <TouchableOpacity
              onPress={() => markAsDefault(addressId)}
              style={[styles.addressButton]}
            >
              <Text style={{ color: "#01884B", fontWeight: "500" }}>
                Mark as default
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* deliver here */}
        {selectedDetails?.addressId !== addressId ? (
          <TouchableOpacity
            style={styles.deliverHereButton}
            onPress={() => handleSelectDeliveryAddress(addressId)}
          >
            <Text style={styles.deliverHereButtonText}>Deliver here</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{ color: "black", fontWeight: "500" }}>
            Delivering here
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  savedAddressesContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,

    // elevation: 2,
  },
  headerIcon: {},
  headerText: {
    marginLeft: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  cardContainer: {
    backgroundColor: "#fff",
    flexGrow: 0.9,
    paddingHorizontal: 5,
  },
  savedAddressesCard: {
    padding: 10,
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#E8E8E8",
    marginBottom: 10,
    ...shadowEffect,
  },

  addressCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 15,
    color: "#323232",
  },
  addressTextContainer: {
    marginLeft: 35,
  },
  defaultTabText: {
    // color: "#01884B",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 10,
    paddingHorizontal: 5,
    alignSelf: "center",
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: "#01884B",
    color: "#fff",
    backgroundColor: "#01884B",
  },
  addressText: {
    fontSize: 13,
    color: "#666262",
    marginVertical: 2,
  },
  phoneText: {
    fontSize: 14,
    color: "#666262",
    marginVertical: 5,
  },
  addressButtonsContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 35,
    justifyContent: "space-between",
  },
  addressButton: {
    // borderWidth: 0.5,
    // borderColor: "#000",
    // borderRadius: 50,
    color: "#666262",

    marginRight: Dimensions.get("window").width / 20,
    columnGap: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText: {
    // textTransform: "uppercase",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    borderTopWidth: 0.5,
    borderColor: "#616060",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#fff",
  },
  deliverHereButton: {
    borderWidth: 1,
    borderColor: "#01884B",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    height: 30,
    color: "#000",
  },
  deliverHereButtonText: {
    color: "#01884B",
    fontWeight: "500",
    textAlign: "center",
  },
  addAddressButton: {
    borderWidth: 0.5,
    borderColor: "#01884B",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addAddressButtonText: {
    color: "#01884B",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default SavedAddresses;
