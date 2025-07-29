import { router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";

const AddressHeader = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Feather name="arrow-left" size={25} style={styles.headerIcon} />
      </TouchableOpacity>
      <Text style={{ fontSize: 16, fontWeight: "500" }}>Saved Address</Text>
    </View>
  );
};

export default AddressHeader;

const styles = StyleSheet.create({
  headerIcon: {
    color: "black",
    marginHorizontal: Dimensions.get("screen").width * 0.03,
    fontSize: 25,
  },
});
