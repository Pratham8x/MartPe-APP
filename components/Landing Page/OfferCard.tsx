import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { router } from "expo-router";
import { widthPercentageToDP } from "react-native-responsive-screen";

const { width: screenWidth } = Dimensions.get("window");

const OfferCard = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (!items || items.length <= 1) return;

    const interval = setInterval(() => {
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
      
      // Auto scroll to next item
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: nextIndex * screenWidth * 0.85,
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
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
        return "#466466";
    }
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (screenWidth * 0.85));
    setActiveIndex(index);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={screenWidth * 0.85}
        decelerationRate="fast"
      >
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              router.push(`../(tabs)/home/productListing/${item?.id}`);
            }}
            style={[
              styles.cardOffer,
              {
                backgroundColor: getOfferBackground(index),
                borderRadius: 10,
                width: screenWidth * 0.85,
                marginHorizontal: screenWidth * 0.075, // Center the cards
              },
            ]}
          >
            {/* offer text */}
            <View style={styles.textContainer}>
              {/* offer header text */}
              <Text style={styles.offerHeaderText}>
                Upto {Math.ceil(item?.calculated_max_offer?.percent)}% Off
              </Text>

              {/* offer sub-header text */}
              <Text style={styles.offerSubHeaderText}>
                on {item?.descriptor?.name}
              </Text>

              {/* shop now button */}
              <TouchableOpacity style={styles.shopNowButton}>
                <Text
                  style={[
                    styles.shopNowText,
                    {
                      color: getOfferBackground(index),
                    }
                  ]}
                >
                  Order Now
                </Text>
              </TouchableOpacity>

              {/* T&C apply text */}
              <Text style={styles.tcText}>*T&C apply</Text>
            </View>

            {/* offer image */}
            <View style={styles.offerImageContainer}>
              <Image
                source={{
                  uri: item.descriptor?.symbol,
                }}
                style={styles.offerImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination indicator */}
      {items.length > 1 && (
        <View style={styles.paginationContainer}>
          <Text style={styles.paginationText}>
            {activeIndex + 1}/{items.length}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  cardOffer: {
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingLeft: 20,
    paddingRight: 15,
    alignItems: "center",
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textContainer: {
    flex: 1,
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
    marginTop: 2,
  },
  shopNowButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  shopNowText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 12,
  },
  tcText: {
    marginTop: 5,
    fontSize: 8,
    color: "white",
  },
  offerImageContainer: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  offerImage: {
    height: widthPercentageToDP(20),
    width: widthPercentageToDP(20),
    borderRadius: 5,
  },
  paginationContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  paginationText: {
    backgroundColor: "#656565",
    color: "#FFFFFF",
    textAlign: "center",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "500",
  },
});

export default OfferCard;