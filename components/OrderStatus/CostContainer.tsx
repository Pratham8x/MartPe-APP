// TotalContainer.js
import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const CostContainer = ({ breakup, itemsTotal, grandTotal }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const toggleDetails = () => {
    detailsVisible ? setDetailsVisible(false) : setDetailsVisible(true);
  };
  return (
    <View style={styles.totalContainer}>
      {detailsVisible && (
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={styles.text}>Items Total</Text>
            <Text style={styles.text}>₹ {itemsTotal}</Text>
          </View>
          {Number(breakup?.delivery) > 0 && (
            <View style={styles.row}>
              <Text style={styles.text}>Delivery</Text>
              <Text style={styles.text}>₹ {breakup?.delivery}</Text>
            </View>
          )}
          {Number(breakup?.packing) > 0 && (
            <View style={styles.row}>
              <Text style={styles.text}>Packing</Text>
              <Text style={styles.text}>₹ {breakup?.packing}</Text>
            </View>
          )}
          {Number(breakup?.convenience) > 0 && (
            <View style={styles.row}>
              <Text style={styles.text}>Convenience</Text>
              <Text style={styles.text}>₹ {breakup?.convenience}</Text>
            </View>
          )}
          {Number(breakup?.discount) > 0 && (
            <View style={styles.row}>
              <Text style={styles.text}>Discount</Text>
              <Text style={styles.text}>₹ {breakup?.discount}</Text>
            </View>
          )}
          {Number(breakup?.tax) > 0 && (
            <View style={styles.row}>
              <Text style={styles.text}>Tax</Text>
              <Text style={styles.text}>₹ {breakup?.tax}</Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={styles.text}>Grand Total</Text>
            <Text style={styles.text}>₹ {grandTotal}</Text>
          </View>
        </View>
      )}
      <TouchableOpacity
        style={styles.itemsTotalContainer}
        onPress={toggleDetails}
      >
        <Text style={styles.itemsTotalText}>Total:</Text>
        <View style={styles.toggleCostContainer}>
          <Text style={styles.itemsTotalCostText}>₹ {grandTotal}</Text>
          <TouchableOpacity onPress={toggleDetails}>
            {detailsVisible ? (
              <Image source={require("../../assets/upArrow.png")} />
            ) : (
              <Image source={require("../../assets/dropdownArrow.png")} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    flexDirection: "column",
  },
  detailsContainer: {
    padding: 10,
    marginHorizontal: 5,
    borderTopWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 10,
  },
  itemsTotalContainer: {
    borderTopWidth: 1,
    borderColor: "#e9ecef",
    flexDirection: "row",
    marginVertical: 5,
    // shadowColor: "rgba(0,0,0,0.5)",
    // elevation: 2,
    // shadowRadius: 5,
    // backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPriceInfoContainer: {
    flex: 1,
    flexDirection: "row",
  },
  itemsTotalCostText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  itemsTotalText: {
    fontSize: 16,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginHorizontal: 10,
    // marginRight: 35,
  },
  text: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#666",
  },
  toggleCostContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CostContainer;
