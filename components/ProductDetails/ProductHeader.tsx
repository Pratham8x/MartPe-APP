import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Share,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFavoriteStore } from "../../state/useFavoriteStore";
import ShareButton from "../../components/common/Share";
import LikeButton from "../../components/common/likeButton";
interface ProductHeaderProps {
  itemName: string;
  category: string;
  productId: string | string[];
  storeName: string;
  quantity?: number;
  unit?: string;
}

const { width, height } = Dimensions.get("window");

const ProductHeader: FC<ProductHeaderProps> = ({
  itemName,
  category,
  storeName,
  productId,
  quantity,
  unit,
}) => {
  const { addFavorite, removeFavorite } = useFavoriteStore();
  const [favProduct, setFavProduct] = useState<boolean>(false);
  const allFavoritesProducts = useFavoriteStore((state) => state.allFavorites);
  const isFavorite: boolean = allFavoritesProducts?.products?.find(
    (id) => id.id === productId
  )
    ? true
    : false;

  useEffect(() => {
    console.log(
      "allFavorites",
      allFavoritesProducts?.products?.find((id) => id.id === productId)
    );
    console.log("productId", productId);
    console.log("isFavorite", isFavorite);
    if (isFavorite) {
      setFavProduct(true);
    }
  }, [allFavoritesProducts]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {itemName.length > 50 ? itemName.slice(0, 50) + "..." : itemName}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.subtitle}>{category}</Text>
          {category === "Grocery" && (
            <Text style={styles.subtitle}>
              {quantity} {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </Text>
          )}
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <LikeButton productId={productId as string} />
        <ShareButton
          productId={productId as string}
          productName={itemName}
          storeName={storeName}
          incentivise={true}
          type="item"
        />
      </View>
    </View>
  );
};

export default ProductHeader;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: 50,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
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
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    width: width * 0.5,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "normal",
    color: "#495057",
    marginRight: width * 0.02,
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
