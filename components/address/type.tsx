import React, { useState, FC } from "react";
import { Pressable, View, Text } from "react-native";

const typeData = [
  {
    id: 1,
    name: "Home",
  },
  {
    id: 2,
    name: "Work",
  },
  {
    id: 3,
    name: "Friends & Family",
  },
  {
    id: 4,
    name: "Other",
  },
];

interface TypeProps {
  saveAs: (type: string) => void;
}

const Type: FC<TypeProps> = ({ saveAs }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleType = (type) => {
    setSelectedType(type);
    saveAs(type);
  };
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {typeData.map((item) => (
        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderColor: selectedType === item.name ? "green" : "",
            borderWidth: selectedType === item.name ? 1 : 0,
            borderRadius: 5,
            margin: 5,
            backgroundColor: selectedType === item.name ? "#92D995" : "#EEEDEB",
          }}
          key={item.id}
          onPress={() => handleType(item.name)}
        >
          <Text
            style={{
              color: selectedType === item.name ? "green" : "#607274",
              fontWeight: selectedType === item.name ? "bold" : "normal",
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
