import { View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

const Loader = () => {
  return (
    <View style={styles.container}>
      {/* <LottieView
        source={require("../../constants/bag_with_hand.json")}
        speed={10}
        autoPlay
        loop
        style={{
          width: widthPercentageToDP(80),
          height: widthPercentageToDP(80),
        }}
      /> */}
      {/* <Text>Loading...</Text> */}
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
