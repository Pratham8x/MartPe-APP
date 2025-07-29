import React, { FC, useState } from "react";
import {
  Pressable,
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

interface TabBarProps {
  selectTab: (tab: string) => void;
}

const TabBar: FC<TabBarProps> = ({ selectTab }) => {
  const [selectedTab, setSelectedTab] = useState("Items");
  const handleTab = (tab: string) => {
    setSelectedTab(tab);
    selectTab(tab);
  };
  return (
    <View
      style={{
        width: width,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "gray",
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
          // borderWidth: 1,
          // borderColor: "#FF5151",
          backgroundColor: "rgba(255, 81, 81, 0.15)",
        }}
      >
        {tabOptions.map((tab) => (
          <TouchableOpacity
            style={{
              backgroundColor: selectedTab === tab.title ? "#FF5151" : "white",
              paddingHorizontal: Dimensions.get("screen").width * 0.07,
              paddingVertical: 10,
              borderRadius: 50,
            }}
            onPress={() => handleTab(tab.title)}
            key={tab.id}
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
