import React from "react";
import { Image, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";

interface PLPFooterProps {
  vendorName: string;
  outletLocation: string;
  vendorAddress: string;
  fssaiLiscenseNo: string;
}

const PLPFooter: React.FC<PLPFooterProps> = ({
  vendorName,
  outletLocation,
  vendorAddress,
  fssaiLiscenseNo,
}) => {
  const footerText = [
    "All prices are set directly by the restaurant.",
    "All nutritional information is indicative, values are per serve as shared by the restaurant and may vary depending on the ingredients and portion size.",
    "An average active adult requires 2,000 kcal energy per day; however, calorie needs may vary.",
    "Dish details might be Al crafted for a better experience",
  ];

  return (
    <View
      style={{
        paddingVertical: 40,
        paddingHorizontal: 20,
        position: "relative",
      }}
    >
      {footerText.map((content, idx) => (
        <Text
          key={idx}
          style={{ marginTop: 5, color: "#79787D", fontSize: 12 }}
        >
          <Text>{" \u25CF"}</Text> {content}
        </Text>
      ))}
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: "#F48232", fontWeight: "900", fontSize: 16 }}>
          {vendorName}
        </Text>
        <Text style={{ color: "#79787D" }}>
          (Outlet:{" "}
          {<Text style={{ fontWeight: "bold" }}>{outletLocation}</Text>})
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}
      >
        {/* <Image
          style={{ height: 20, width: 20 }}
          source={require("../../../assets/PLPFooterPin.png")}
        /> */}
        <MaterialIcons name="location-pin" size={16} color="black" />
        <Text style={{ marginLeft: 5, color: "#79787D" }}>{vendorAddress}</Text>
      </View>
      {/* fssai license number */}
      {fssaiLiscenseNo && (
        <View
          style={{ flexDirection: "row", marginTop: 10, alignItems: "center" }}
        >
          <Image
            style={{
              height: 50,
              width: 100,
            }}
            source={require("../../../assets/fssaiLogo.png")}
          />
          <Text style={{ marginLeft: 10, color: "#79787D" }}>
            License No. :{" "}
            <Text style={{ fontWeight: "bold" }}>{fssaiLiscenseNo}</Text>
          </Text>
        </View>
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          backgroundColor: "#f6f6f6",
          paddingHorizontal: 5,
          paddingVertical: 8,
          borderRadius: 50,
          alignSelf: "center",
          justifyContent: "center",
          width: widthPercentageToDP(75),
        }}
      >
        {/* <Image source={require("../../../assets/alertCircle.png")} /> */}
        <MaterialIcons
          name="report-problem"
          size={14}
          color="#343a40"
          style={{ marginLeft: 5 }}
        />
        <Text style={{ marginHorizontal: 5, color: "#000" }}>
          Report an issue with the menu
        </Text>
        {/* <Image source={require("../../../assets/rightArrowRed.png")} /> */}
        <MaterialCommunityIcons name="chevron-right" size={14} color="black" />
      </View>
    </View>
  );
};

export default PLPFooter;
