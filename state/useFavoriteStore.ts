import { create } from "zustand";
import {
  addProductFavorite,
  removeFavorite,
  removeVendorFavorite,
  addVendorFavorite,
} from "../gql/favorites/favorite";
import { initFavorite } from "./state-init/init-favorites";

// Optional: Replace `any` with your actual Product and Vendor types
type Product = any;
type Vendor = any;

type Favorite = {
  products: Product[];
  vendors: Vendor[];
};

type State = {
  allFavorites: Favorite;
};

type Action = {
  addFavorite: (productId: string) => Promise<void>;
  removeFavorite: (productId: string) => Promise<void>;
  addVendorFavorite: (vendorId: string) => Promise<void>;
  removeVendorFavorite: (vendorId: string) => Promise<void>;
};

const initialState: State = {
  allFavorites: {
    products: [],
    vendors: [],
  },
};

export const useFavoriteStore = create<State & Action>((set) => ({
  ...initialState,
  addFavorite: async (productId) => {
    try {
      await addProductFavorite(productId);
      initFavorite(); // This should internally call `set` to update state
    } catch (error) {
      console.error("Error adding item to favorites:", error, productId);
    }
  },
  removeFavorite: async (productId) => {
    try {
      await removeFavorite(productId);
      initFavorite();
      console.log("Removed from favorites");
    } catch (error) {
      console.error("Error removing item from favorites:", error);
    }
  },
  addVendorFavorite: async (vendorId) => {
    try {
      await addVendorFavorite(vendorId);
      initFavorite();
    } catch (error) {
      console.error("Error adding vendor to favorites:", error);
    }
  },
  removeVendorFavorite: async (vendorId) => {
    try {
      await removeVendorFavorite(vendorId);
      initFavorite();
    } catch (error) {
      console.error("Error removing vendor from favorites:", error);
    }
  },
}));
