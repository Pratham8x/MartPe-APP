import 'dotenv/config';

export default {
  expo: {
    name: "MartPe",
    slug: "martpe-test",
    main: "expo-router/entry",
    version: "1.0.0",
    runtimeVersion: {
    policy: "appVersion" 
  }, 
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "Martpe",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.pratham.martpe",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffff"
        }
      ],
      "expo-font",
      "expo-web-browser"
    ],
    experiments: {
      typedRoutes: true
    },
        "owner": "martpe",

    updates: {
      url: "https://u.expo.dev/b0c3da72-e565-4599-a0b4-4061814f82e4"
    },
    extra: {
      BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
      eas: {
        projectId: "d8115f56-a38f-47e7-b266-4d8c5d659833"
      }
    }
  }
};