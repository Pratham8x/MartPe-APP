import { SafeAreaView } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import { Stack } from "expo-router";

const PrivacyPolicy = () => {
  const webViewRef = React.useRef(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Privacy Policy", headerShown: true }} />
      <WebView
        ref={webViewRef}
        style={{ flex: 1 }}
        source={{ uri: "https://expo.dev" }}
      />
    </SafeAreaView>
  );
};

export default PrivacyPolicy;
