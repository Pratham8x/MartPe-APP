import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");
const snapInterval = width;

const ImageCarousel = ({ url }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / snapInterval);
    setActiveIndex(currentIndex);
  };

  const imageStyle = (index) => ({
    width: "100%",
    height: "100%",
    // borderRadius: 10,
  });

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        onScroll={handleScroll}
      >
        {url.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={imageStyle(index)} />
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            backgroundColor: "#656565",
            width: width * 0.1,
            textAlign: "center",
            color: "white",
            borderRadius: 100,
            marginTop: width * 0.02,
            fontSize: 12,
          }}
        >
          {activeIndex + 1}/{url.length}
        </Text>
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",
    marginBottom: width * 0.05,
    // paddingHorizontal: width * 0.05,
  },
  imageContainer: {
    marginTop: width * 0.05,
    width: width,
    height: 200,

    marginRight: width * 0.02,

    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainerSingle: {
    marginTop: width * 0.05,
    width: width * 0.9,
    height: 200,
    borderColor: "#BBC8D1",
    borderWidth: 1,
    marginLeft: width * 0.05,
    // borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
