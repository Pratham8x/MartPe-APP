import { useState, FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FashionCategoriesDropdown from "./FashionCategoriesDropdown";
import { fashionHeaderData } from "../../../data";

interface FashionCategoriesButtonProps {
  headerTitle: string;
  image: string;
  onClick: () => void;
}

const FashionCategoriesButton: FC<FashionCategoriesButtonProps> = ({
  headerTitle,
  image,
  onClick,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.fashionCategoriesButton,
        backgroundColor: "#fff",
      }}
      onPress={onClick}
    >
      <Image
        style={styles.fashionCategoriesButtonImage}
        source={{ uri: image }}
      />
      <Text style={styles.fashionCategoriesButtonText}>
        {headerTitle.length > 7 ? headerTitle.slice(0, 7) : headerTitle}
      </Text>
    </TouchableOpacity>
  );
};

const FashionCategories = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);

  function toggleDropdown(headerTitle: string) {
    setActiveButton((prevActiveButton) =>
      prevActiveButton === headerTitle ? null : headerTitle
    );
  }

  return (
    <View
      style={{ borderBottomWidth: 1, borderColor: "#e8e8e8", marginBottom: 10 }}
    >
      <View style={styles.fashionCategoriesButtonContainer}>
        {fashionHeaderData.map((header) => (
          <FashionCategoriesButton
            key={header.title}
            image={header.image}
            headerTitle={header.title}
            onClick={() => toggleDropdown(header.title)}
          />
        ))}
      </View>
      {activeButton && <FashionCategoriesDropdown />}
    </View>
  );
};

const styles = StyleSheet.create({
  fashionCategoriesButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  fashionCategoriesButton: {
    alignItems: "center",
    paddingBottom: 10,
    overflow: "hidden",
    paddingTop: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fashionCategoriesButtonImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#e8e8e8",
  },
  fashionCategoriesButtonText: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
  },
});

export default FashionCategories;
