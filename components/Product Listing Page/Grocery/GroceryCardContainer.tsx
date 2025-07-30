import React from "react";
import { StyleSheet, View, Pressable, Text, Dimensions } from "react-native";
import GroceryCard from "./GroceryCard";
import { router } from "expo-router";

interface GroceryCardContainerProps {
  providerId: string;
  catalog: {
    category_id: string;
    descriptor: {
      images: any;
      name: string;
    };
    price: {
      value: number;
    };
    id: string;
  }[];
  selectedCategory?: string;
  searchString: string;
}

const GroceryCardContainer: React.FC<GroceryCardContainerProps> = ({
  catalog,
  selectedCategory,
  providerId,
  searchString,
}) => {
  let filteredCatalog = [];

  if (!selectedCategory || selectedCategory === "All") {
    filteredCatalog = catalog;
  } else {
    filteredCatalog = catalog.filter(
      (item) => item.category_id === selectedCategory
    );
  }

  // If selectedCategory is not "all", and filteredCatalog is empty, don't show anything
  if (selectedCategory !== "all" && filteredCatalog.length === 0) {
    return null;
  }

  return (
    <View style={styles.groceryCardsContainer}>
      {filteredCatalog
        .filter((item) => {
          if (searchString) {
            return item?.descriptor?.name
              .toLowerCase()
              .includes(searchString?.toLowerCase());
          } else {
            return item;
          }
        })
        .map((item) => {
          const imageUrl = item.descriptor.images[0];
          const name = item?.descriptor?.name;
          const price = item.price.value;
          const maxLimit = Math.min(
            item.quantity.maximum.count,
            item.quantity.available.count
          );
          return (
            <Pressable
              key={name}
              onPress={() => {
                router.push(`../(tabs)/home/productDetails/${item.id}`);
              }}
            >
              <GroceryCard
                id={item.id}
                itemName={name}
                cost={price}
                imageUrl={imageUrl}
                category={item.category_id}
                providerId={providerId}
                maxLimit={maxLimit}
              />
            </Pressable>
          );
        })}
    </View>
  );
};

export default GroceryCardContainer;

const styles = StyleSheet.create({
  groceryCardsContainer: {
    paddingHorizontal: Dimensions.get("screen").width * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
