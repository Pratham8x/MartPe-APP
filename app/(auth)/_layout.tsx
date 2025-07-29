// app/(auth)/_layout.tsx
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

export default function AuthLayout() {
  return (
    <ToastProvider
      placement="bottom"
      duration={3000}
      animationType="slide-in"
      textStyle={{ fontSize: 14 }}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </ToastProvider>
  );
}
