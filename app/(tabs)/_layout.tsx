import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import React from "react";
import { useCartStore } from "../../state/useCartStore";
import { MaterialCommunityIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { CartTab } from "../../constants/icons/tabIcons";
import { useHideTabBarStore } from "../../state/hideTabBar";

export default function TabsLayout() {
  const { allCarts } = useCartStore();
  let totalItems = 0;
  for (const cart of allCarts) {
    for (const item of cart.items) {
      totalItems += item.quantity;
    }
  }

  const hideTabBar = useHideTabBarStore((state) => state.hideTabBar);

  // Updated colors to match Martpe design
  const activeTabColor = "#f2663c"; // Orange/red color from Martpe
  const inactiveTabColor = "#060606"; // Light gray
  const backgroundColor = "#ffffff"; // White background

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeTabColor,
        tabBarInactiveTintColor: inactiveTabColor,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
          marginTop: 4,
        },
        tabBarStyle: {
          height: 70,
          paddingBottom: 12,
          paddingTop: 8,
          backgroundColor: backgroundColor,
          borderTopWidth: 1,
          borderTopColor: "#F0F0F0",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
          borderRightWidth: 1,
          borderRightColor: "#F0F0F0",
        },
      }}
    >
      {/* 1. Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Entypo 
                name="home" 
                size={22} 
                color={focused ? activeTabColor : inactiveTabColor} 
              />
            </View>
          ),
        }}
      />

      {/* 2. Cart Tab */}
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Cart",
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ position: 'relative' }}>
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={22}
                  color={focused ? activeTabColor : inactiveTabColor}
                />
                {totalItems > 0 && (
                  <View style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    backgroundColor: '#FF1744',
                    borderRadius: 10,
                    minWidth: 18,
                    height: 18,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#FFFFFF',
                  }}>
                    <Text style={{
                      color: '#FFFFFF',
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}>
                      {totalItems > 99 ? '99+' : totalItems}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ),
        }}
      />

      {/* 3. Orders Tab */}
      <Tabs.Screen
        name="orders"
        options={{
          tabBarLabel: "Orders",
          title: "Orders",
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons
                name={focused ? "package-variant-closed" : "package-variant-closed"}
                size={22}
                color={focused ? activeTabColor : inactiveTabColor}
              />
            </View>
          ),
        }}
      />

      {/* 4. Account Tab */}
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
          title: "Account",
          tabBarStyle: {
            display: hideTabBar ? "none" : "flex",
            height: 70,
            paddingBottom: 12,
            paddingTop: 8,
            backgroundColor: backgroundColor,
            borderTopWidth: 1,
            borderTopColor: "#F0F0F0",
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarItemStyle: {
            paddingVertical: 4,
            borderRightWidth: 0, // Remove right border for last item
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                size={22}
                color={focused ? activeTabColor : inactiveTabColor}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}