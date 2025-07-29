import { getAllOrdersByUser } from "../../gql/api/order";
import { useOrderStore } from "../useOrderStore";
import { Order } from "../../gql/graphql";

export const initOrder = async () => {
  try {
    const response = await getAllOrdersByUser();
    if (response?.getAllOrdersByUser) {
      useOrderStore.setState({ allOrders: response.getAllOrdersByUser as Order[] });
    }
  } catch (error) {
    console.error("Error fetching all orders:", error);
  }
};
