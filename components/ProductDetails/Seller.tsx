import React, { FC } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

interface SellerDetailsProps {
  sellerName: string;
  sellerDetails: string;
  sellerSymbol: string;
  sellerContact: string;
}

const { width, height } = Dimensions.get("window");

const SellerDetails: FC<SellerDetailsProps> = ({
  sellerDetails,
  sellerName,
  sellerSymbol,
  sellerContact,
}) => {
  const [storeName, email, phone] = sellerContact.split(",");
  // console.log(`contactDetailInfo: ${contactDetailInfo}`);

  const contactDetails = [
    {
      title: "Email",
      value: email,
    },
    {
      title: "Phone",
      value: phone,
    },
  ];

  return (
    <View style={{ ...styles.container, marginTop: 10 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <Text style={{ color: "#444444" }}>About</Text>
        <Text style={styles.sellerNameText}> {sellerName}</Text>
      </View>

      <Image
        source={{ uri: sellerSymbol }}
        style={{
          width: width * 0.8,
          height: width * 0.6,
          marginVertical: width * 0.05,
          borderRadius: 4,
        }}
      />

      <Text style={styles.title}>Seller Details</Text>
      <Text style={styles.details}>{sellerDetails}</Text>

      <Text style={styles.title}>Contact Details</Text>
      {contactDetails?.length > 0
        ? contactDetails.map((contactDetail, index) => (
            <View style={styles.subtitleContainer} key={index}>
              <Text style={styles.subtitle}>{contactDetail?.title}:</Text>
              <Text style={styles.subtitleValues}>{contactDetail?.value}</Text>
            </View>
          ))
        : null}
    </View>
  );
};

export default SellerDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",

    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.05,
    marginHorizontal: width * 0.05,
    elevation: 5,
    borderRadius: 10,
    marginTop: width * 0.05,
    marginBottom: width * 0.4,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  sellerNameText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#000",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginTop: 5,
  },
  details: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#000",
    flexDirection: "column",
  },
  subtitleContainer: {
    flex: 1,
    flexDirection: "row",
  },
  subtitle: {
    fontSize: 12,
    color: "#444444",
    marginRight: 10,
  },
  subtitleValues: {
    color: "#030303",
    fontWeight: "normal",
    textTransform: "lowercase",
    fontSize: 12,
  },
  cartButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  cartButtonIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
});
