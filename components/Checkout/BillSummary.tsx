import { View, Text, StyleSheet } from "react-native";
import CheckoutItems from "./CheckoutItems";

export const BillSummary = ({
  storeId,
  updatedItems,
  itemsTotal,
  breakup,
  grandTotal,
  savings,
}) => {
  return (
    <View style={styles.container}>
      <CheckoutItems storeId={storeId} items={updatedItems} />
      <View>
        {/* <View style={styles.titleContainer}>
          <Text style={styles.title}>BILL SUMMARY</Text>
        </View> */}
        {(breakup?.delivery > 0 ||
          breakup?.packing > 0 ||
          breakup?.convenience > 0 ||
          breakup?.discount > 0 ||
          breakup?.tax > 0) && (
          <View style={styles.priceContainer}>
            <View style={styles.row}>
              <Text style={styles.text}>Items Total</Text>
              <Text style={styles.text}>₹{itemsTotal}</Text>
            </View>
            {breakup?.delivery > 0 && (
              <View style={styles.row}>
                <Text style={styles.text}>Delivery fees</Text>
                <Text style={styles.text}>₹{breakup?.delivery}</Text>
              </View>
            )}
            {breakup?.packing > 0 && (
              <View style={styles.row}>
                <Text style={styles.text}>Packing</Text>
                <Text style={styles.text}>₹{breakup?.packing}</Text>
              </View>
            )}
            {breakup?.convenience > 0 && (
              <View style={styles.row}>
                <Text style={styles.text}>Convenience</Text>
                <Text style={styles.text}>₹{breakup?.convenience}</Text>
              </View>
            )}
            {breakup?.discount > 0 && (
              <View style={styles.row}>
                <Text style={styles.text}>Discount</Text>
                <Text style={styles.text}>₹{breakup?.discount}</Text>
              </View>
            )}
            {breakup?.tax > 0 && (
              <View style={styles.row}>
                <Text style={styles.text}>Tax</Text>
                <Text style={styles.text}>₹{breakup?.tax}</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.priceContainer}>
          <View style={[styles.row]}>
            <Text style={[styles.text, styles.bold]}>Grand Total</Text>
            <Text style={[styles.text, styles.bold]}>₹{grandTotal}</Text>
          </View>
          {savings > 0 && (
            <View style={styles.row}>
              <Text style={[styles.text]}>
                You have saved ₹
                {Number(savings)
                  .toFixed(2)
                  .replace(/\.?0+$/, "")}{" "}
                on this order!
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    gap: 20,
    borderRadius: 10,
    marginHorizontal: 15,
    paddingVertical: 20,
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: 2,
    marginTop: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    borderBottomWidth: 0.2,
    borderColor: "#666",
  },
  title: { paddingVertical: 10, fontWeight: "500", fontSize: 12 },
  message: {
    fontSize: 12,
    marginVertical: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },

  text: {
    fontSize: 13,
    color: "#666",
  },
  bold: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "500",
    color: "#00BC66",
  },
  priceContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginVertical: 5,
  },
  paymentButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#208b3a",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#208b3a",
    width: "100%",
    marginVertical: 10,
  },
  paymentButtonText: {
    fontWeight: "600",
    fontSize: 15,
    color: "#FFFFFF",
  },
  loadingContainer: {
    shadowColor: "rgba(0,0,0,0.5)",
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    gap: 20,
  },
});
