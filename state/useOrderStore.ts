import { create } from "zustand";
import { getAllOrdersByUser } from "../gql/api/order";
import { Order } from "../gql/graphql";

type State = {
  allOrders: Order[];
};

type Action = {
  getAllOrdersByUser: () => Promise<void>;
};

const initialState: State = {
  allOrders: [],
};

export const useOrderStore = create<State & Action>((set) => ({
  ...initialState,
  getAllOrdersByUser: async () => {
    try {
      const orders = await getAllOrdersByUser();
      set({ allOrders: orders as Order[] });
    } catch (error) {
      console.error("Error fetching all orders:", error);
    }
  },
}));
