import { create } from "zustand";
import {
  addItemToCart,
  clearAllCarts,
  clearCart,
  getAllCarts,
  removeItemFromCart,
  updateItemQuantity,
} from "../gql/api/cart";
import { Cart } from "../gql/graphql";

type State = {
  allCarts: Cart[];
};

type Action = {
  addItem: (
    storeId: string,
    itemId: string,
    quantity: number,
    customizations: any
  ) => Promise<void>;
  updateItem: (
    storeId: string,
    itemId: string,
    quantity: number
  ) => Promise<void>;
  removeItem: (storeId: string, itemId: string) => Promise<void>;
  clearCart: (storeId: string) => Promise<void>;
  clearAllCarts: () => Promise<void>;
};

const initialState: State = {
  allCarts: [],
};

export const useCartStore = create<State & Action>((set) => ({
  ...initialState,
  addItem: async (storeId, itemId, quantity, customizations) => {
    try {
      await addItemToCart({
        vendorId: storeId,
        itemId,
        quantity,
        customizations,
      });

      const carts = await getAllCarts({ withItemDetails: true });
      set({ allCarts: carts.getAllCarts as Cart[] });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  },

  updateItem: async (storeId, itemId, quantity) => {
    try {
      await updateItemQuantity({ vendorId: storeId, itemId, quantity });
      set((state) => {
        const updatedCarts = state.allCarts.map((cart) => {
          if (cart.store.id === storeId) {
            const updatedItems = cart.items.map((item) => {
              if (item.itemId === itemId) {
                return { ...item, quantity: quantity };
              }
              return item;
            });

            return { ...cart, items: updatedItems };
          }
          return cart;
        });

        return { allCarts: updatedCarts };
      });
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  },

  removeItem: async (storeId, itemId) => {
    try {
      await removeItemFromCart({ vendorId: storeId, itemId });
      const carts = await getAllCarts({ withItemDetails: true });
      set({ allCarts: carts.getAllCarts as Cart[] });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  },

  clearCart: async (storeId) => {
    try {
      await clearCart({ vendorId: storeId });
      const carts = await getAllCarts({ withItemDetails: true });
      set({ allCarts: carts.getAllCarts as Cart[] });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  },

  clearAllCarts: async () => {
    try {
      await clearAllCarts();
      set({ allCarts: [] });
    } catch (error) {
      console.error("Error clearing all carts:", error);
    }
  },
}));
