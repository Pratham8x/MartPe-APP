import { SafeAreaView } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { Stack } from "expo-router";

const TermsAndConditions = () => {
  const webViewRef = React.useRef(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{ title: "Terms & Conditions", headerShown: true }}
      />
      <WebView
        ref={webViewRef}
        style={{ flex: 1 }}
        source={{ uri: "https://expo.dev" }}
      />
    </SafeAreaView>
  );
};

export default TermsAndConditions;
