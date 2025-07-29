import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PLPBannerAddressDropdownProps {
  addresses: string;
}

const PLPBannerAddressDropdown: React.FC<PLPBannerAddressDropdownProps> = ({
  addresses,
}) => {
  return (
    <View style={styles.shadow}>
      <View style={styles.bannerAddressDropdown}>
        <TouchableOpacity
          onPress={() => router.push("/address/SavedAddresses")}
        >
          <Text style={styles.userAddresses}>
            {addresses.length > 35 ? addresses.slice(0, 35) + "..." : addresses}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    borderRadius: 7,
    backgroundColor: "transparent",
    elevation: 3,
    marginTop: 10,
  },
  bannerAddressDropdown: {
    backgroundColor: "#ffffff",
    borderRadius: 7,
    padding: 10,
  },
  userAddresses: {
    borderBottomWidth: 1,
    borderBottomColor: "#C6C6C6",
    marginVertical: 5,
    paddingBottom: 7,
  },
});

export default PLPBannerAddressDropdown;
