import { getHeaders, graphqlClient } from "../../clients/api";
import {
  addItemToCartQuery,
  clearAllCartsQuery,
  clearCartQuery,
  getAllCartsQuery,
  removeItemFromCartQuery,
  updateItemQuantityQuery,
} from "../queries/cart";

export const getAllCarts = async ({ withItemDetails }) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(getAllCartsQuery, { withItemDetails });
};

export const addItemToCart = async ({
  vendorId,
  itemId,
  quantity,
  customizations,
}) => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(addItemToCartQuery, {
    vendorId,
    itemId,
    quantity,
    customizations,
  });
};

export const clearCart = async ({  vendorId }) => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(clearCartQuery, { vendorId });
};

export const clearAllCarts = async () => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(clearAllCartsQuery);
};

export const removeItemFromCart = async ({ vendorId, itemId }) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(removeItemFromCartQuery, { vendorId, itemId });
};

export const updateItemQuantity = async ({ vendorId, itemId, quantity }) => {
  const headers = await getHeaders();
  console.log("updateItemQuantity", { vendorId, itemId, quantity });
  return graphqlClient.setHeaders(headers).request(updateItemQuantityQuery, {
    vendorId,
    itemId,
    quantity,
  });
};
