import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PersonalCareCardProps {
  title: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  maxValue: number;
  id: string;
  providerId: string | string[];
}

const PersonalCareCard: React.FC<PersonalCareCardProps> = ({
  title,
  description,
  price,
  discount,
  image,
  maxValue,
  providerId,
  id,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        () => {
          // router.push(`/productDetails/${id}`);
          console.log("item.id", id);
        };
      }}
      style={styles.fashionCard}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.fashionCardImage}
          source={{
            uri: image,
          }}
        />
      </View>
      <View style={{ paddingHorizontal: 5 }}>
        <Text style={styles.cardTitle}>
          {title.length > 30 ? title.slice(0, 30) + "..." : title}
        </Text>
        <Text style={styles.cardDescription}>
          {description.length > 15
            ? description.slice(0, 15) + "..."
            : description}
        </Text>
        {discount > 1 && (
          <Text style={{ ...styles.amount, ...styles.strikedOff }}>
            Rs.{maxValue}
          </Text>
        )}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.amount}>Rs{price}</Text>
          {discount > 1 && (
            <Text style={{ ...styles.amount, ...styles.discount }}>
              {discount}% Off
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PersonalCareCard;

const styles = StyleSheet.create({
  fashionCard: {
    width: "49%",
    elevation: 5,
    backgroundColor: "#ffffff",
    paddingBottom: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
  fashionCardImage: {
    width: "100%",
    height: 125,
    borderRadius: 10,
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    overflow: "hidden",
    borderRadius: 10,
  },
  cardTitle: {
    marginTop: 10,
    fontWeight: "900",
    fontSize: 13,
  },
  cardDescription: {
    color: "#838181",
    marginTop: 5,
  },
  amount: {
    fontSize: 12,
    marginRight: 5,
    fontWeight: "900",
    marginTop: 5,
  },
  strikedOff: {
    color: "#746F6F",
    marginTop: 5,
    fontSize: 10,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  discount: {
    color: "#00BC66",
    marginLeft: 5,
  },
});
