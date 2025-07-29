import AsyncStorage from "@react-native-async-storage/async-storage";
import create from "zustand";
import { persist } from "zustand/middleware";

const useCheckoutStore = create(
  persist(
    (set) => ({
      checkoutData: {},
      checkoutTime: null,
      setCheckoutData: (data) => set({ checkoutData: data }),
      setCheckoutTime: () => set({ checkoutTime: Date.now() }),
    }),
    {
      name: "checkout-storage",
      getStorage: () => AsyncStorage,
    }
  )
);
