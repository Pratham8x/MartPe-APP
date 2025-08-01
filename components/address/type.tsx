import React, { useState, FC, useEffect } from "react";
import { Pressable, View, Text } from "react-native";

const typeData = [
  {
    id: 1,
    name: "Home",
    apiValue: "Home",
  },
  {
    id: 2,
    name: "Work",
    apiValue: "Work",
  },
  {
    id: 3,
    name: "Friends & Family",
    apiValue: "FriendsAndFamily",
  },
  {
    id: 4,
    name: "Other",
    apiValue: "Other",
  },
];

interface TypeProps {
  saveAs: (type: string) => void;
  initialValue?: 'Home' | 'Work' | 'FriendsAndFamily' | 'Other';
}

const Type: FC<TypeProps> = ({ saveAs, initialValue = "Home" }) => {
  // Find the display name for the initial API value
  const getDisplayName = (apiValue: string) => {
    const typeItem = typeData.find(item => item.apiValue === apiValue);
    return typeItem ? typeItem.name : "Home";
  };

  const [selectedType, setSelectedType] = useState<string>(getDisplayName(initialValue));

  const handleType = (type: string) => {
    setSelectedType(type);
    saveAs(type);
  };

  // Update selected type when initialValue changes (for edit mode)
  useEffect(() => {
    const displayName = getDisplayName(initialValue);
    setSelectedType(displayName);
    saveAs(displayName);
  }, [initialValue]);

  // Call saveAs with default value on component mount
  useEffect(() => {
    const displayName = getDisplayName(initialValue);
    saveAs(displayName);
  }, []);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
      {typeData.map((item) => (
        <Pressable
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderColor: selectedType === item.name ? "#01884B" : "#E0E0E0",
            borderWidth: 1,
            borderRadius: 8,
            margin: 4,
            backgroundColor: selectedType === item.name ? "#F0F8F5" : "#FFFFFF",
            minWidth: 80,
            alignItems: "center",
          }}
          key={item.id}
          onPress={() => handleType(item.name)}
        >
          <Text
            style={{
              color: selectedType === item.name ? "#01884B" : "#666",
              fontWeight: selectedType === item.name ? "600" : "normal",
              fontSize: 14,
            }}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Type;