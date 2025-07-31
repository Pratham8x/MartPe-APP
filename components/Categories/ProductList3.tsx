import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";


interface ProductList3Props {
  storeId: string;
  catalogs: any[]; // Replace with real structure or use `any[]` temporarily
  handleOpenPress: () => void;
  categoryFiltered: string[]; // or `number[]`, based on category_id type
  foodDetails: (details: any) => void; // Ideally type this instead of `any`
  index: number;
  item :any
}

const ProductList3: React.FC<ProductList3Props> = ({
  storeId,
  catalogs,
  handleOpenPress,
  categoryFiltered,
  foodDetails,
  index,
}) => {
  const containerHeight = 200;
  const screenWidth = Dimensions.get("window").width * 0.9;
  const autoPlayDelay = 7000;

  const [autoScroll, setAutoScroll] = useState(false);

  const animationStyle = React.useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const translateX = interpolate(
      value,
      [-2, 0, 1],
      [-screenWidth, 0, screenWidth]
    );

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAutoScroll(true);
    }, (index + 1) * 5000);

    return () => clearTimeout(timeout);
  }, [index]);

  if (!catalogs) {
    return null;
  }

  // Filter catalogs based on the selected category ID
  const filteredCatalogs = catalogs.filter(
    (catalog) =>
      categoryFiltered.length == 0 ||
      categoryFiltered.includes(catalog.category_id)
  );

const renderProduct = ({ item }: { item: any }) => {
  // your code

    return (
      <TouchableOpacity
        onPress={() => {
          handleOpenPress();
          // router.push(`(tabs)/home/productDetails/${item?.id}`);
          foodDetails({
            images: item?.descriptor.images,
            name: item?.descriptor.name,
            price: item?.price.value,
            long_desc: item?.descriptor.long_desc,
            short_desc: item?.descriptor.short_desc,
            Symbol: item?.descriptor.symbol,
            storeId: storeId,
            itemId: item?.id,
            discount: item?.price?.offer_percent,
            maxPrice: item?.price?.maximum_value,
            visible: true,
            maxQuantity: Number(
              Math.min(
                item?.quantity?.maximum?.count,
                item?.quantity?.available?.count
              )
            ),
          });
        }}
        style={[
          styles.container,
          { height: containerHeight, width: screenWidth },
        ]}
        key={item?.id}
      >
        <Image
          source={{ uri: item?.descriptor.images[0] }}
          style={styles.imgBg}
          resizeMode="cover"
        />
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.top}
        />
        <View style={styles.overlay}>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0)"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={styles.desc}
          >
            <Text style={styles.discountDesc}>
              {item?.descriptor.name} for ₹{item.price.value} only{" "}
              {categoryFiltered}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      width={screenWidth}
      height={containerHeight}
      autoPlay={autoScroll && filteredCatalogs.length > 1} // Enable autoPlay after delay
      data={filteredCatalogs}
      scrollAnimationDuration={1000}
      autoPlayInterval={autoPlayDelay}
      // onSnapToItem={(index) => console.log("current index:", index)}
      renderItem={renderProduct}
      customAnimation={animationStyle}
      enabled={filteredCatalogs.length > 1}
    />
  );
};

const styles = StyleSheet.create({
  imgBg: {
    flex: 1,
    width: "100%",
    // height: "100%",
  },
  container: {
    overflow: "hidden",
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  top: {
    position: "absolute",
    top: 0,
    left: 0,
    flex: 1,
    width: "100%",
    padding: 20,
  },
  desc: {
    position: "absolute",
    bottom: 0,
    left: 0,
    flex: 1,
    width: "100%",
    padding: 10,
    paddingTop: 20,
  },

  discountDesc: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  menu: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  fav: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    fontSize: 12,
  },
  priceText: {
    color: "#038300",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ProductList3;
