// import { AppImages } from "assets/images";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageResizeMode,
  ImageStyle,
  ImageURISource,
  StyleSheet,
  Text,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  imageStyle: {
    height: "auto",
  },
  loader: {
    // position: 'absolute',
    // top: '25%',
    // left: '15%',
    // justifyContent: 'center',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

type ImageInterface = {
  source: string;
  imageStyle?: ImageStyle;
  resizeMode?: ImageResizeMode;
} & typeof defaultProps;

const defaultProps = {
  //   source: AppImages.noImg.source,
  // imageStyle: styles.imageStyle,
  resizeMode: "cover",
};

const ImageComp = (props: ImageInterface) => {
  const { source, imageStyle, resizeMode } = props;

  const [isLoading, setIsLoading] = useState(
    source && source?.uri ? true : false
  );
  const [isError, setIsError] = useState(false);
  // const [url, setUrl] = useState(false);

  return (
    <View style={styles.container}>
      {/* <Text>{source.uri}</Text> */}
      <Image
        source={
          source.uri ? source : { uri: "https://via.placeholder.com/150" }
        }
        style={imageStyle}
        resizeMode={resizeMode}
        onLoadStart={() => {
          // console.log('On Load Start');
        }}
        onLoadEnd={() => {
          // console.log('On Load End');
          setIsLoading(false);
        }}
        onError={({ nativeEvent: { error } }) => {
          setIsLoading(false);

          setIsError(true);
        }}
        onLoad={({
          nativeEvent: {
            source: { width, height },
          },
        }) => {
          setIsLoading(false);
        }}
        defaultSource={{ uri: "https://via.placeholder.com/150" }}
      />
      {isLoading && (
        <ActivityIndicator style={styles.loader} size="small" color="black" />
      )}
    </View>
  );
};

ImageComp.defaultProps = defaultProps;

export default ImageComp;
