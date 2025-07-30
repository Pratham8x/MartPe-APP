import { router } from "expo-router";
import { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface FashionCardProps {
  itemName: string;
  desc: string;
  value: number;
  maxPrice?: number;
  discount: number | string;
  image: string;
  id: string;
}

const FashionCard: FC<FashionCardProps> = ({
  itemName,
  desc,
  value,
  maxPrice,
  discount,
  image,
  id,
}) => {
  return (
    <Pressable
      onPress={() => {
        router.push(`../(tabs)/home/productDetails/${id}`);
      }}
      style={styles.fashionCard}
    >
      <Image style={styles.fashionCardImage} source={{ uri: image }} />
      <View style={styles.fashionCardContent}>
        <Text
          style={styles.fashionCardTitle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {itemName}
        </Text>
        <Text
          style={styles.fashionCardDescription}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {desc}
        </Text>
        <View style={{ flexDirection: "row", marginTop: 3 }}>
          <Text style={styles.fashionCardPrice}>
            <Text style={{ fontSize: 16 }}>₹{value}</Text>{" "}
            {maxPrice && <Text style={styles.strikedOffText}>₹{maxPrice}</Text>}
          </Text>
          {typeof discount === "number" && discount > 1 && (
            <Text style={styles.fashionCardDiscount}>
              {"  "}
              {discount > 1 ? discount : null}% Off
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default FashionCard;

const styles = StyleSheet.create({
  fashionCard: {
    marginVertical: 5,
    marginBottom: 10,
    width: "48.5%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },
  fashionCardImage: {
    width: 185,
    height: 185,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  fashionCardContent: {
    padding: 10,
  },
  fashionCardTitle: {
    fontWeight: "900",
    fontSize: 13,
  },
  fashionCardDescription: {
    color: "#838181",
    fontSize: 11,
  },
  fashionCardPrice: {
    fontSize: 12,
    fontWeight: "800",
  },
  strikedOffText: {
    color: "#746F6F",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    fontWeight: "400",
  },
  fashionCardDiscount: {
    color: "#00BC66",
    fontWeight: "900",
  },
});
