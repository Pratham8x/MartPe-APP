import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import useUserDetails from "../../hook/useUserDetails";
import useDeliveryStore from "../../state/deliveryAddressStore";
import { DotIndicator } from "react-native-indicators";

export const YourDetails = () => {
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);
   const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const { userDetails, getUserDetails } = useUserDetails();
  useEffect(() => {
    getUserDetails();
  }, []);

  if (!userDetails) {
    return (
     null
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.value, styles.bold]}>
          {userDetails?.firstName || ""} {userDetails?.lastName || ""}
        </Text>
      </View>
      {userDetails?.email && (
        <View style={styles.row}>
          <Text style={styles.value}>{userDetails?.email}</Text>
        </View>
      )}
      {userDetails?.phoneNumber && (
        <View style={styles.row}>
          <Text style={styles.value}>{userDetails?.phoneNumber}</Text>
        </View>
      )}
      <View style={styles.row}>
        <Text style={[styles.value]}>
          {selectedDetails?.fullAddress || "No address selected"}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add delivery instructions..."
          textAlignVertical="top"
          multiline
          numberOfLines={3}
          value={deliveryInstructions}
          onChangeText={(text) => setDeliveryInstructions(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    marginHorizontal: 15,
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: 2,
    marginTop: 15,
    borderTopEndRadius: 10, 
    borderTopStartRadius: 10, 
  },

  row: {
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    color: "#666",
  },
  bold: { fontWeight: "400" },
  inputContainer: {
    marginVertical: 5,
  },

  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    fontSize: 12,
    borderColor: "#666",
  },
});
