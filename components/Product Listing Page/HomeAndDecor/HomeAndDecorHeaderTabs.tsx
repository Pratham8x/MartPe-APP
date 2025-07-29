import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface HeaderTabButtonProps {
  onClick: (title: string) => void;
  activeButton: string;
  title: string;
}

const HomeAndDecorHeaderTabs: React.FC = () => {
  const data = [
    "Home & Decor",
    "Furniture",
    "Home Furnishing",
    "Cooking & Dining",
    "Garden & Outdoors",
  ];
  const [activeButton, setActiveButton] = useState("");

  function handleActiveButton(title: string) {
    setActiveButton((prevActiveButton) =>
      prevActiveButton === title ? "" : title
    );
  }

  return (
    <LinearGradient
      colors={[
        "rgba(255, 231, 165, 0.4)",
        "rgba(255, 231, 165, 0.2)",
        "rgba(255, 231, 165, 0.1)",
      ]}
      start={[0, 0]}
      end={[0, 1]}
      style={{ borderRadius: 15, marginHorizontal: 10 }}
    >
      <ScrollView
        style={styles.headerButtonsContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((header) => (
          <HeaderTabButton
            key={header}
            activeButton={activeButton}
            onClick={handleActiveButton}
            title={header}
          />
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const HeaderTabButton: React.FC<HeaderTabButtonProps> = ({
  onClick,
  activeButton,
  title,
}) => (
  <TouchableOpacity
    onPress={() => onClick(title)}
    style={{
      ...styles.headerTabButton,
    }}
  >
    <Image
      style={{
        ...styles.headerTabButtonImage,
        borderColor: title === activeButton ? "#FDD059" : "transparent",
      }}
      source={{
        uri: "https://www.ulcdn.net/media/furniture-stores/chennai/thoraipakkam/Thoraipakkam_-TN-store-mobile.jpg?1683052402",
      }}
    />
    <Text
      style={{
        ...styles.headerButtonText,
        fontWeight: title === activeButton ? "bold" : "normal",
      }}
    >
      {title.length > 7 ? title.slice(0, 7) + "..." : title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  headerButtonsContainer: {
    paddingHorizontal: 5,
  },
  headerTabButton: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginRight: 10,
    alignItems: "center",
  },
  headerTabButtonImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 5,
  },
  headerButtonText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "900",
  },
});

export default HomeAndDecorHeaderTabs;
