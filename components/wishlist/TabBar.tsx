import React, { FC, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const tabOptions = [
  {
    id: 1,
    title: "Items",
  },
  {
    id: 2,
    title: "Outlets",
  },
];

// Define a type for tabs
export type WishlistTab = "Items" | "Outlets";

interface TabBarProps {
  selectTab: React.Dispatch<React.SetStateAction<WishlistTab>>;
}

const TabBar: FC<TabBarProps> = ({ selectTab }) => {
  const [selectedTab, setSelectedTab] = useState<WishlistTab>("Items");

  const handleTab = (tab: WishlistTab) => {
    setSelectedTab(tab);
    selectTab(tab);
  };

  return (
    <View
      style={{
        width,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: width * 0.6,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 10,
          borderRadius: 50,
          backgroundColor: "rgba(255, 81, 81, 0.15)",
        }}
      >
        {tabOptions.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={{
              backgroundColor: selectedTab === tab.title ? "#FF5151" : "white",
              paddingHorizontal: width * 0.07,
              paddingVertical: 10,
              borderRadius: 50,
            }}
            onPress={() => handleTab(tab.title as WishlistTab)}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                color: selectedTab === tab.title ? "white" : "black",
              }}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TabBar;
