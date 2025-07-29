import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
//import Carousel from "react-native-snap-carousel";
import ImageComp from "../common/ImageComp";
import { router } from "expo-router";
import { widthPercentageToDP } from "react-native-responsive-screen";

const { width: screenWidth } = Dimensions.get("window");

const OfferCard = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  // set the offers active index to change based on time interval
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = activeIndex === items?.length - 1 ? 0 : activeIndex + 1;
      carouselRef.current.snapToItem(nextIndex);
    }, 5000); // change card every 3 seconds

    return () => clearInterval(interval); // clear timer on component unmount
  }, [activeIndex, items?.length]);

  const getOfferBackground = (num) => {
    switch (num) {
      case 0:
        return "#FF5151";
      case 1:
        return "#FFA02F";
      case 2:
        return "#1296B3";
      case 3:
        return "#EB0DA0";
      case 4:
        return "#D45793";
      case 5:
        return "#CD9800";
      case 6:
        return "#8E92FB";
      case 7:
        return "#8D77B3";
      case 8:
        return "#96D2DB";
      case 9:
        return "#3EBB3C";
      default:
        return "#466466"; // Fallback color
    }
  };

  const getOfferColor = (category) => {
    switch (category) {
      case 0:
        return "#C40000";
      case 1:
        return "#BD6B09";
      case 2:
        return "#000000";
      case 3:
        return "#840058";
      case 4:
        return "#98074D";
      case 5:
        return "#F48535";
      case 6:
        return "#000000";
      case 7:
        return "#164E0D";
      case 8:
        return "#164E0D";
      default:
        return "#D3D3D3"; // Fallback color
    }
  };

  // Render each item in the carousel
  const renderOfferItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          router.push(`/(tabs)/home/productListing/${item?.id}`);
        }}
        style={[
          styles.cardOffer,
          {
            backgroundColor: getOfferBackground(index),
            borderRadius: 10,
          },
        ]}
      >
        {/* offer text */}
        <View>
          {/* offer header text */}
          <Text style={styles.offerHeaderText}>
            Upto {Math.ceil(item?.calculated_max_offer?.percent)}% Off
          </Text>

          {/* offer sub-header text */}
          <Text style={styles.offerSubHeaderText}>
            on {item?.descriptor?.name}
          </Text>

          {/* shop now button */}
          <View style={styles.shopNowButton}>
            <Text
              style={{
                color: getOfferBackground(index),
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Order Now
            </Text>
          </View>

          {/* T&C apply text */}
          <Text style={styles.tcText}>*T&C apply</Text>
        </View>

        {/* offer image */}
        <View style={styles.offerImageContainer}>
          <ImageComp
            source={{
              uri: item.descriptor?.symbol,
            }}
            imageStyle={styles.offerImage}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginLeft: -Dimensions.get("screen").width * 0.04 }}>
      {/* offers carousel */}
      <Carousel
        ref={carouselRef}
        data={items}
        renderItem={renderOfferItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.85} // 80% of screen width for the active card
        onSnapToItem={(index) => setActiveIndex(index)}
        activeSlideAlignment={"center"}
        inactiveSlideScale={0.9} // Slightly smaller scale for inactive cards
        inactiveSlideOpacity={0.7}

        // Slightly lower opacity for inactive cards
      />
      {/* <Pagination
        dotsLength={items.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.inactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}

      <View style={{ alignItems: "center", marginVertical: 10 }}>
        {/* pagination component */}
        {items?.length > 1 && (
          <Text
            style={{
              backgroundColor: "#656565",
              color: "#FFFFFF",
              textAlign: "center",
              width: screenWidth * 0.15,
              borderRadius: 10,
              // fontSize: ,
            }}
          >
            {activeIndex + 1}/{items?.length}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: screenWidth * 0.8, // 80% of screen width
    height: 200,
  },
  paginationContainer: {
    // Style your pagination container
  },
  paginationDot: {
    // Style your active pagination dot
  },
  inactiveDot: {
    // Style your inactive pagination dot
  },
  cardOffer: {
    // width: windowWidth * 0.8,
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 10,
    alignItems: "center",
  },
  offerHeaderText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  offerSubHeaderText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "normal",
  },
  shopNowButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 50,
    width: screenWidth * 0.3,
    marginVertical: 10,
    marginTop: 25,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  tcText: {
    marginTop: 5,
    fontSize: 8,
    color: "white",
  },
  offerImageContainer: {
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  offerImage: {
    height: widthPercentageToDP(20),
    borderRadius: 5,
    aspectRatio: 1.5,
    marginRight: 15,
  },
});

export default OfferCard;
