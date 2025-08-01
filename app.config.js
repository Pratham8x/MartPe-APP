import 'dotenv/config';

export default {
  expo: {
    name: "MartPe",
    slug: "martpe",
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
      url:  "https://u.expo.dev/c08fe04a-5464-4863-ae3d-b9d61b4eefc4"
    },
    extra: {
      BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
        GOOGLE_MAPS_API_KEY: "your-key-here",
      eas: {
        projectId:  "c08fe04a-5464-4863-ae3d-b9d61b4eefc4"

      }
    }
  }
}