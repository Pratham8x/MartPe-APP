import { router } from "expo-router";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import DynamicButton from "../common/DynamicButton";
import { useCartStore } from "../../state/useCartStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Descriptor {
  name: string;
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
  storeId: string;
}
const ProductList = ({ storeId, catalogs, categoryFiltered }) => {
  const allCarts = useCartStore((state) => state.allCarts);
  const cart = allCarts.find((cart) => cart.store.id === storeId);
  if (!catalogs) {
    return null;
  } else {
    console.log(catalogs);
  }
  const renderProduct = (data) => {
    const {
      id,
      descriptor: { name, images } = {},
      price: { maximum_value: maximum_price, value: price, offer_percent } = {},
      quantity: {
        available: { count: available_quantity } = {},
        maximum: { count: maximum_quantity } = {},
        unitized,
      } = {},
    } = data as Data;
    const maxLimit = Math.min(maximum_quantity, available_quantity);
    const itemCount =
      cart?.items?.find((item) => item?.itemId === id)?.quantity | 0;
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
        {/* product discount info */}
        {offer_percent && offer_percent > 1 && (
          <View style={styles.discountView}>
            <View style={styles.discount}>
              <Image source={require("../../assets/greenStar.png")} />
              <Text style={styles.discountPercent}>{offer_percent}</Text>
            </View>
          </View>
        )}
        <View style={styles.details}>
          {/*  product name */}
          <Text numberOfLines={2} style={styles.title}>
            {name}
          </Text>
          {/* product unit info */}
          {unitized && (
            <Text style={styles.quantity}>
              {unitized?.measure?.value} {unitized?.measure?.unit}
            </Text>
          )}
          {/* product offer */}
          <View style={styles.priceContainer}>
            {offer_percent && offer_percent > 1 && (
              <Text style={styles.strikeThrough}>₹ {maximum_price}</Text>
            )}
            <Text style={styles.priceText}>₹ {price}</Text>
          </View>

          {/* add item button */}
          {itemCount == 0 ? (
            <View style={styles.buttonGroup}>
              <DynamicButton
                storeId={storeId}
                itemId={id}
                quantity={1}
                isNewItem={true}
              >
                <View
                  style={{
                    ...styles.add,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {/* <Image source={require("../../assets/plus.png")} /> */}
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 12,
                      color: "#0e8910",
                    }}
                  >
                    Add
                  </Text>
                  <MaterialCommunityIcons
                    name="plus"
                    size={16}
                    color="#0e8910"
                  />
                </View>
              </DynamicButton>
            </View>
          ) : (
            <View style={styles.buttonGroup}>
              <DynamicButton
                storeId={storeId}
                itemId={id}
                quantity={itemCount - 1}
                isUpdated={true}
              >
                {/* <DecrementIcon /> */}
                <MaterialCommunityIcons name="minus" size={16} color="red" />
              </DynamicButton>
              <Text>{itemCount}</Text>
              {itemCount < maxLimit ? (
                <DynamicButton
                  storeId={storeId}
                  itemId={id}
                  quantity={itemCount + 1}
                  isUpdated={true}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    size={16}
                    color="#0e8910"
                  />
                </DynamicButton>
              ) : (
                <DynamicButton
                  storeId={storeId}
                  itemId={id}
                  quantity={itemCount + 1}
                  isUpdated={true}
                  disabled={true}
                >
                  <MaterialCommunityIcons
                    name="plus"
                    disabled
                    size={16}
                    color="#0e8910"
                  />
                </DynamicButton>
              )}
            </View>
          )}
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
    width: 130,
    height: 200,
    shadowColor: "#000000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "column",
    position: "relative",
  },
  details: {
    flex: 1,
    position: "relative",
    margin: 8,
  },
  title: {
    fontSize: 12,
  },
  quantity: {
    color: "#87848A",
    fontSize: 12,
    // marginVertical: 5,
  },
  strikeThrough: {
    textDecorationLine: "line-through",
    fontSize: 12,
  },
  priceText: {
    color: "#030303",
    fontSize: 14,
    fontWeight: "500",
  },
  priceContainer: {
    position: "absolute",
    bottom: 0,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  discount: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
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
  buttonGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  add: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 1,
    padding: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },

  qtyBtn: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowRadius: 5,
    elevation: 2,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  buttonText: { fontSize: 20 },
  imageContainer: {
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  scrollViewContent: {
    flexDirection: "row",
    gap: 20,
    padding: 5,
    paddingHorizontal: 35,
    // zIndex:10
  },
});

export default ProductList;
