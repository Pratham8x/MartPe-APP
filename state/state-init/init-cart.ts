import { getAllCarts } from "../../gql/api/cart";
import { useCartStore } from "../useCartStore";
import { Cart } from "../../gql/graphql";

export const initCart = async () => {
  try {
    const response = await getAllCarts({
      withItemDetails: true,
    });
    if (response?.getAllCarts) {
      useCartStore.setState({ allCarts: response?.getAllCarts as Cart[] });
    }
  } catch (error) {
    console.error("Error fetching all carts:", error);
  }
};
