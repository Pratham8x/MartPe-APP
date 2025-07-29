import React from "react";
import Checkout from "../../../components/Checkout/Checkout";
import { useLocalSearchParams } from "expo-router";
import { AlertNotificationRoot } from "react-native-alert-notification";

const CheckOut = () => {
  const { id } = useLocalSearchParams();
  return (
    // <ScrollView style={{ flex: 1, width: "100%", height: "100%" }}>
    <AlertNotificationRoot>
      <Checkout id={id} />
    </AlertNotificationRoot>

    // </ScrollView>
  );
};

export default CheckOut;
