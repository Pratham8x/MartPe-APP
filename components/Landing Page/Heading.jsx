import { View, Text, StyleSheet } from "react-native";

const Heading = ({ title }) => {
  return (
    <View style={styles.headingContainer}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headingContainer: {
    paddingVertical: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: "900",
  },
});

export default Heading;
