import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
type OfferDataType = {
  id: string;
  calculated_max_offer: {
    percent: number;
  };
  descriptor: {
    name: string;
    images: string[];
    symbol: string;
  };
};

interface OfferCard3Props {
  offerData: OfferDataType;
}

function OfferCard3({ offerData }: OfferCard3Props) {
  if (!offerData) {
    return null;
  }

  const {
    calculated_max_offer: { percent },
    descriptor: { name, images, symbol },
    id,
  } = offerData;

  const containerHeight = 200;
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={[styles.container, { height: containerHeight, width: screenWidth }]}>
      <Image source={{ uri: images[0] }} style={styles.imgBg} resizeMode="cover" />
      <View style={styles.overlay}>
        <View style={styles.offerDescription}>
          <Text style={styles.discount}>Up to {Math.round(percent)}% Off</Text>
          <Text style={styles.discountDesc}>on products from {name}</Text>
        </View>
        <TouchableOpacity
          onPressIn={() => {
            router.push(`../(tabs)/home/productListing/${id}`);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Image source={{ uri: symbol }} style={styles.logoImage} />
        </View>
      </View>
    </View>
  );
}
export default OfferCard3;

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
  offerDescription: {
    position: "absolute",
    bottom: 15,
    left: 15,
  },
  discount: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  discountDesc: {
    color: "white",
    fontSize: 12,
    fontWeight: "400",
  },
  button: {
    // position: "absolute",
    // bottom: 15,
    // left: 15,
    backgroundColor: "#FFFFFF",
    paddingVertical: 5,
    width: 72,
    borderRadius: 50,
    borderColor: "#000000",
    marginTop: 10,
  },
  buttonText: {
    color: "#000000",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  logoContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 120,
    height: 40,
  },
  logoImage: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
});