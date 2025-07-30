import { router } from "expo-router";
import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Svg, { Mask, Path, G } from "react-native-svg";
import useDeliveryStore from "../../state/deliveryAddressStore";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { widthPercentageToDP } from "react-native-responsive-screen";

interface ServicesProps {
  isReturnable: boolean;
  returnableDays: number;
  isCashOnDeliveryAvailable: boolean;
  productId: string;
  storeId: string;
}

const { width, height } = Dimensions.get("window");

const SecureTransactionsSvg = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Mask
      id="a"
      width={22}
      height={22}
      x={1}
      y={1}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path fill="#fff" d="M1.617 1.629h20.766v20.765H1.617V1.63Z" />
    </Mask>
    <G
      fill={props?.color ? props?.color : "#F13A3A"}
      fillRule="evenodd"
      clipRule="evenodd"
      mask="url(#a)"
    >
      <Path d="M4.09 5.968a1.825 1.825 0 1 0 3.65 0 1.825 1.825 0 0 0-3.65 0Zm1.825.608a.608.608 0 1 1 0-1.217.608.608 0 0 1 0 1.217Z" />
      <Path d="M3.442 13.877a.608.608 0 0 1-.608-.608V3.454c0-.336.272-.609.608-.609h17.116c.336 0 .608.273.608.609v9.815a.608.608 0 1 0 1.217 0V3.454a1.825 1.825 0 0 0-1.825-1.825H3.442a1.825 1.825 0 0 0-1.825 1.825v9.815c0 1.008.817 1.825 1.825 1.825h9.815a.608.608 0 0 0 0-1.217H3.442Z" />
      <Path d="M17.348 22.371c.11.031.225.031.335 0a6.48 6.48 0 0 0 4.7-6.23v-2.872c0-.272-.18-.51-.442-.585l-4.258-1.217a.608.608 0 0 0-.335 0l-4.258 1.217a.609.609 0 0 0-.442.585v2.871a6.48 6.48 0 0 0 4.7 6.231Zm.167-1.22a5.263 5.263 0 0 1-3.65-5.01v-2.413l3.65-1.043 3.65 1.043v2.412a5.263 5.263 0 0 1-3.65 5.01Z" />
      <Path d="M16.477 18.566a.608.608 0 0 0 .86 0l2.434-2.433a.608.608 0 1 0-.86-.86l-2.004 2.002-.786-.786a.608.608 0 0 0-.86.86l1.216 1.217ZM4.09 10.835c0 .336.272.608.608.608h1.217a.608.608 0 0 0 0-1.216H4.698a.608.608 0 0 0-.608.608ZM7.742 10.835c0 .336.273.608.609.608h1.216a.608.608 0 0 0 0-1.216H8.351a.608.608 0 0 0-.609.608ZM11.39 5.968c0 .336.273.608.609.608h7.341a.608.608 0 0 0 0-1.217h-7.341a.608.608 0 0 0-.608.609Z" />
    </G>
  </Svg>
);
const Return = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill={props?.color ? props?.color : "#597796"}
      d="M21.219 11.023c0 5.622-4.574 10.196-10.196 10.196-5.621 0-10.195-4.574-10.195-10.196a.637.637 0 1 1 1.275 0c0 4.92 4.001 8.921 8.92 8.921 4.92 0 8.921-4.001 8.921-8.92 0-4.92-4.001-8.921-8.92-8.921A8.828 8.828 0 0 0 4.794 4.65H7.2a.637.637 0 1 1 0 1.275H3.377a.637.637 0 0 1-.637-.637V1.465a.637.637 0 1 1 1.274 0V3.64a10.088 10.088 0 0 1 7.01-2.81c5.621 0 10.195 4.573 10.195 10.194Zm-4.46-2.548v5.735a.638.638 0 0 1-.414.596l-5.097 1.912a.644.644 0 0 1-.449 0l-5.097-1.912a.638.638 0 0 1-.413-.596V8.474c0-.266.164-.504.413-.597l5.097-1.912a.645.645 0 0 1 .448 0l5.098 1.912a.638.638 0 0 1 .413.597Zm-9.019 0 3.283 1.23 3.284-1.23-3.284-1.231-3.283 1.23Zm-1.177 5.293 3.823 1.433v-4.373L6.563 9.394v4.374Zm8.92 0V9.394l-3.822 1.434v4.373l3.823-1.433Z"
    />
  </Svg>
);
const Truck = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#F13A3A"
      d="M17.358 13.979a2.658 2.658 0 0 0-2.655 2.654 2.658 2.658 0 0 0 2.655 2.655 2.657 2.657 0 0 0 2.654-2.655 2.658 2.658 0 0 0-2.654-2.654Zm0 3.982a1.329 1.329 0 0 1-1.328-1.328 1.329 1.329 0 0 1 2.655 0c0 .732-.595 1.328-1.327 1.328ZM8.287 13.979a2.658 2.658 0 0 0-2.654 2.654 2.658 2.658 0 0 0 2.654 2.655 2.658 2.658 0 0 0 2.655-2.655 2.658 2.658 0 0 0-2.655-2.654Zm0 3.982a1.329 1.329 0 0 1-1.327-1.328c0-.732.595-1.327 1.327-1.327s1.328.595 1.328 1.327-.596 1.328-1.328 1.328ZM19.147 6.381a.664.664 0 0 0-.593-.365h-3.495v1.327h3.086l1.807 3.594 1.186-.596-1.991-3.96Z"
    />
    <Path
      fill="#F13A3A"
      d="M15.37 15.992h-5.022v1.328h5.021v-1.328ZM6.296 15.992h-2.3a.664.664 0 1 0 0 1.328h2.3a.664.664 0 1 0 0-1.328ZM22.372 11.935l-1.305-1.682a.663.663 0 0 0-.524-.256H15.72V5.35a.664.664 0 0 0-.663-.663H3.996a.664.664 0 1 0 0 1.327h10.397v4.645c0 .367.297.664.664.664h5.161l.966 1.245v3.423h-1.836a.664.664 0 1 0 0 1.327h2.5a.664.664 0 0 0 .664-.663v-4.314c0-.148-.05-.29-.14-.407ZM6.256 12.629H3.203a.664.664 0 1 0 0 1.327h3.053a.664.664 0 1 0 0-1.327ZM7.78 10.02H2.117a.664.664 0 1 0 0 1.327H7.78a.664.664 0 1 0 0-1.327Z"
    />
    <Path
      fill="#F13A3A"
      d="M8.866 7.408H3.203a.664.664 0 1 0 0 1.327h5.663a.664.664 0 1 0 0-1.327Z"
    />
  </Svg>
);
const CashonDelivery = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#597796"
      d="M22.117 5.496a1.566 1.566 0 0 0-1.073-.553L6.263 3.709a1.566 1.566 0 0 0-1.15.367c-.32.27-.516.65-.552 1.067l-.297 2.79H3.076c-.869 0-1.576.708-1.576 1.577v9.253c0 .869.707 1.576 1.576 1.576H17.91c.87 0 1.577-.707 1.577-1.576v-1.501l.526.044a1.579 1.579 0 0 0 1.702-1.44l.77-9.22a1.566 1.566 0 0 0-.367-1.15ZM3.077 8.753h14.832c.417 0 .757.34.757.757v.843H2.32V9.51c0-.417.34-.757.756-.757Zm-.757 2.42h16.346v1.7H2.32v-1.7Zm15.59 8.346H3.075a.757.757 0 0 1-.756-.756v-5.07h16.346v5.07c0 .417-.34.756-.757.756Zm3.757-12.942-.77 9.22a.757.757 0 0 1-.817.691l-.594-.05V9.51c0-.87-.708-1.577-1.577-1.577H5.09l.288-2.707v-.01a.757.757 0 0 1 .818-.69L20.976 5.76a.752.752 0 0 1 .515.265c.13.155.193.35.176.552Z"
    />
    <Path
      fill="#597796"
      d="M16.95 14.912h-3.946a.41.41 0 0 0-.41.41v2.574c0 .226.183.41.41.41h3.945a.41.41 0 0 0 .41-.41v-2.574a.41.41 0 0 0-.41-.41Zm-.41 2.574h-3.126v-1.754h3.125v1.754Z"
    />
  </Svg>
);

const Services: FC<ServicesProps> = ({
  isReturnable,
  returnableDays,
  isCashOnDeliveryAvailable,
  productId,
  storeId,
}) => {
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);
  const iconColor = "#333333";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delivery & Services</Text>

      {/* delivering to address name */}
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={{ fontSize: 12, marginTop: 15 }}>Delivering to </Text>
        {/* address name */}
        <Text style={{ fontSize: 12, marginTop: 15, fontWeight: "900" }}>
          {selectedDetails?.name ? selectedDetails?.name : "Address Name"}
        </Text>
      </View>

      <View
        style={{
          // flexDirection: "column",
          // gap: 10,
          borderColor: "#CAD4DF",
          borderWidth: 1,
          borderRadius: 50,
          marginVertical: width * 0.02,
          marginBottom: 20,
          // padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            // marginVertical: 10,
          }}
        >
          {/* display current address header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 1,
                maxWidth: 15,
                alignItems: "center",
                justifyContent: "center",
                marginHorizontal: 10,
                // marginLeft: 10,
              }}
            >
              <MaterialIcons name="my-location" size={16} color="black" />
            </View>

            {/*  display address */}
            <Text
              style={{
                flex: 1,
                color: "#000",
                alignSelf: "center",
                fontWeight: "400",
                maxWidth: widthPercentageToDP(50),
                minWidth: widthPercentageToDP(30),
                height: 20,
              }}
            >
              {selectedDetails?.fullAddress || "Your Address"}
            </Text>

            {/* change address button */}
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "/address/SavedAddresses",
                  params: {
                    route: "productDetails",
                    productId: productId,
                    storeId: storeId,
                  },
                });
              }}
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                backgroundColor: "#030303",
              }}
            >
              <MaterialIcons name="edit-location" size={20} color="white" />
              <Text
                style={{
                  fontWeight: "700",
                  color: "#fff",
                  paddingVertical: 5,
                  paddingRight: 5,
                  textAlignVertical: "center",
                }}
              >
                edit
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      {/* icons container */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ width: 65 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#F0F0F0",
                padding: 4,
                borderRadius: 100,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SecureTransactionsSvg color={iconColor} />
            </View>
            <Text style={{ fontSize: 12, textAlign: "center" }}>Secure</Text>
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              Transaction
            </Text>
          </View>
        </View>
        <View style={{ width: 65 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#F0F0F0",
                padding: 4,
                borderRadius: 100,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Truck /> */}
              <MaterialCommunityIcons
                name="truck-fast-outline"
                size={24}
                color={iconColor}
              />
            </View>
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              Free delivery
            </Text>
          </View>
        </View>
        <View style={{ width: 65 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#F0F0F0",
                padding: 4,
                borderRadius: 100,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Return color={iconColor} />
            </View>
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              Non Returnable
            </Text>
          </View>
        </View>
        <View style={{ width: 65 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "#F0F0F0",
                padding: 4,
                borderRadius: 100,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <CashonDelivery /> */}
              <MaterialCommunityIcons
                name="cash-marker"
                size={24}
                color={iconColor}
              />
            </View>
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              Cash on Delivery
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",

    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.03,
    marginHorizontal: width * 0.05,
    elevation: 5,
    shadowColor: "#555555",
    borderRadius: 10,
    marginTop: width * 0.05,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#607480",
    marginRight: width * 0.05,
  },
  cartButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  cartButtonIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
});
