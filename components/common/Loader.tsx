import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>

      <ActivityIndicator size="large" color="#FB3E44" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,

    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
