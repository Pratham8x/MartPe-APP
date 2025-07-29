import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const DiscountCard = ({ title, description, color }) => {
  return (
    <View style={{ ...styles.discountCard, backgroundColor: color }}>
      <Text style={styles.discount}>{title}off</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.ctaButton}>
        <Text style={{ ...styles.ctaButton_text, color: color }}>
          Order Now
        </Text>
      </TouchableOpacity>
      <Text style={styles.tnc}>*T&C Apply</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  discountCard: {
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  discount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "900",
  },
  description: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
    width: 150,
    marginVertical: 15,
  },
  tnc: {
    color: "#fff",
    fontSize: 12,
    marginTop: 10,
  },
  ctaButton: {
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 7,
    width: 100,
  },
  ctaButton_text: {
    fontSize: 14,
    fontWeight: "900",
    color: "#FF5151",
    textAlign: "center",
    textTransform: "uppercase",
  },
});

export default DiscountCard;
