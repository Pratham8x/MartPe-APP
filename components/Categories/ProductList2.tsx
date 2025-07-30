import LikeButton from "../../components/common/likeButton";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { useCartStore } from "../../state/useCartStore";

const ProductList = ({ storeId, catalogs, categoryFiltered }) => {
  const allCarts = useCartStore((state) => state.allCarts);
  const cart = allCarts.find((cart) => cart.store.id === storeId);
  if (!catalogs) {
    return null;
  } else {
    console.log(catalogs);
  }
  const renderProduct = (data) => {
    interface Descriptor {
      name: string;
      short_desc: string;
      images: string[];
    }

    interface Price {
      maximum_value: number;
      value: number;
      offer_percent?: number;
    }

    interface Available {
      count: number;
    }

    interface Quantity {
      available?: Available;
      maximum?: Available;
      unitized?: {
        measure: {
          unit: string;
          value: string;
        };
      };
    }

    interface Data {
      id: string;
      descriptor?: Descriptor;
      price?: Price;
      quantity?: Quantity;
    }

    const {
      id,
      descriptor: { name, short_desc, images } = {},
      price: { maximum_value: maximum_price, value: price, offer_percent } = {},
      quantity: {
        available: { count: available_quantity } = {},
        maximum: { count: maximum_quantity } = {},
      } = {},
    } = data as Data;

    return (
      <Pressable
        onPress={() => {
          router.push(`(tabs)/home/productDetails/${id}`);
        }}
        style={styles.product}
        key={id}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: images[0] }} style={styles.image} />
        </View>
        {offer_percent && offer_percent > 1 && (
          <View style={styles.discountView}>
            <View style={styles.discount}>
              <Image source={require("../../assets/greenStar.png")} />
              <Text style={styles.discountPercent}>{offer_percent}</Text>
            </View>
          </View>
        )}
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.desc}>
          {short_desc}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>₹ {price}</Text>
          {offer_percent && offer_percent > 1 && (
            <Text style={styles.strikethrough}>₹ {maximum_price}</Text>
          )}
        </View>
        <View style={styles.add}>
          <LikeButton color="gray" productId={id} />
        </View>
      </Pressable>
    );
  };

  const filteredCatalogs = catalogs.filter(
    (catalog) =>
      categoryFiltered.length == 0 ||
      categoryFiltered.includes(catalog.category_id)
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContent}
    >
      {filteredCatalogs.map((data) => renderProduct(data))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  product: {
    width: 168,
    backgroundColor: "white",
    position: "relative",
    marginVertical: 5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 5,
    padding: 5,
  },
  imageContainer: {
    height: 150,
    width: 150,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
  },
  scrollViewContent: {
    gap: 10,
    padding: 5,
    paddingHorizontal: 25,
  },
  discount: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    maxWidth: 120,
  },
  discountPercent: {
    position: "absolute",
    color: "white",
    fontSize: 12,
  },
  discountView: {
    position: "absolute",
    top: -20,
    right: -20,
  },
  desc: {
    color: "#87848A",
    fontSize: 12,
    maxWidth: 120,
  },
  footerContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    fontSize: 12,
    color: "#736D6D",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    gap: 3,
  },
  add: {
    position: "absolute",
    right: 5,
    bottom: 25,
  },
});

export default ProductList;
