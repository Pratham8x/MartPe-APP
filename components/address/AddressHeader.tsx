import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar"; // ✅ correct import
import Feather from "react-native-vector-icons/Feather";

interface AddressHeaderProps {
  title?: string;
}

const Header: React.FC<AddressHeaderProps> = ({ title = "Saved Address" }) => {
  return (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={25} style={styles.headerIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
              <StatusBar style="dark" />

      </View>
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    marginTop:22,
    paddingBottom: 15,
    backgroundColor: "#fff",
  },
  headerIcon: {
    color: "black",
    marginHorizontal: Dimensions.get("screen").width * 0.03,
    fontSize: 25,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});
