import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Hometab = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color}
      d="M7.135 18.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 0 0 2.443-1 3.41 3.41 0 0 0 1.013-2.422V7.867c0-.735-.328-1.431-.895-1.902L11.934.675a3.097 3.097 0 0 0-3.949.072L1.467 5.965A2.474 2.474 0 0 0 .5 7.867v8.702C.5 18.464 2.047 20 3.956 20h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009Z"
    />
  </Svg>
);
export const Wishlisttab = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      fill={props.active ? props.color : "none"}
      d="M20.84 2.61a5.5 5.5 0 0 0-7.78 0L12 3.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 19.23l7.78-7.78 1.06-1.06a5.499 5.499 0 0 0 0-7.78Z"
    />
  </Svg>
);

export const Orders = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M23 4v6h-6M1 20v-6h6"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9.001 9.001 0 0 0 20.49 15"
    />
  </Svg>
);

export const CartTab = ({ color, active, itemCount }) => (
  <View style={styles.container}>
    <MaterialCommunityIcons
      name={active ? "cart" : "cart-outline"}
      size={24}
      color={color}
    />
    {itemCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{itemCount}</Text>
      </View>
    )}
  </View>
);

export const ProfileTab = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      fill={props.active ? props.color : "none"}
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    // Adjust padding as needed
  },
  badge: {
    position: "absolute",
    top: -10,
    left: 15,

    borderRadius: 100,
    backgroundColor: "#FF5151",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
});

export const BackArrow = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.143 15.572 1.286 8.713l6.857-6.857"
    />
  </Svg>
);
