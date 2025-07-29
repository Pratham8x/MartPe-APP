import { View, Text, StyleSheet } from "react-native";

export const CancellationPolicy = ({ isCancellable }) => {
  const message = isCancellable
    ? "This order can be cancelled before it is shipped by the seller"
    : "This order cannot be cancelled once it is shipped by the seller.";
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>CANCELLATION POLICY</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.value}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: 5,
    backgroundColor: "white",
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 80,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 0.2,
    borderColor: "#666",
  },
  title: { paddingVertical: 10, fontWeight: "500", fontSize: 12},

  row: {
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    color: "#666",
  },
});
