import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SidebarNavigationProps {
  sidebarTitles: string[];
  onSelectCategory: (category: string) => void;
  domainColor: string;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  sidebarTitles,
  onSelectCategory,
  domainColor,
}) => {
  const bgColor = domainColor.slice(0, -3);
  const gradientColors = [
    bgColor + "1)",
    bgColor + "0.7486)",
    bgColor + "0.1)",
  ];
  const { height } = useWindowDimensions();

  sidebarTitles = sidebarTitles.map((title) =>
    title
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toLowerCase())
      .replace(/^\w/, (c) => c.toUpperCase())
  );
  return (
    <View style={styles.sidebarNavigation}>
      <LinearGradient
        colors={[gradientColors[0], gradientColors[1], gradientColors[2]]}
        start={[1, 0]}
        end={[0, 0]}
        style={{ paddingTop: 10, borderRadius: 15 }}
      >
        {sidebarTitles.map((header) => (
          <SidebarNavigationButton
            key={header}
            title={header}
            onSelectCategory={onSelectCategory}
          />
        ))}
      </LinearGradient>
    </View>
  );
};

interface SidebarNavigationButtonProps {
  title: string;
  onSelectCategory: (category: string) => void;
}

const SidebarNavigationButton: React.FC<SidebarNavigationButtonProps> = ({
  title,
  onSelectCategory,
}) => {
  const handlePress = () => {
    onSelectCategory(title);
  };

  return (
    <TouchableOpacity
      style={styles.sidebarButtonContainer}
      onPress={handlePress}
    >
      <Image
        style={styles.sidebarImage}
        source={require("../../../assets/BurgerKingBg.png")}
      />
      <Text style={styles.sidebarHeaderText}>
        {title.length > 8 ? title.slice(0, 8) + "..." : title}
      </Text>
    </TouchableOpacity>
  );
};

export default SidebarNavigation;

const styles = StyleSheet.create({
  sidebarNavigation: {
    width: "25%",
    marginLeft: -10,
    borderRadius: 15,
  },
  sidebarButtonContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingLeft: 10,
  },
  sidebarImage: {
    width: 50,
    height: 50,
    borderRadius: 7,
  },
  sidebarHeaderText: {
    marginTop: 5,
    fontWeight: "900",
    fontSize: 12,
  },
});
