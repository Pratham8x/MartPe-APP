import { getHeaders, graphqlClient } from "../../../clients/api";

import {
  addProductToFavouritesMutation,
  removeProductFromFavouritesMutation,
  getUserFavoriteQuery,
  getUserFavouritesWithDetailsQuery,
  addVendorToFavouritesMutation,
  removeVendorFromFavouritesMutation,
} from "../../queries/favorite";

export const getAllFavorites = async () => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(getUserFavoriteQuery);
};

export const addProductFavorite = async (productId) => {
  const headers = await getHeaders();
  console.log("addProductFavorite -> headers", productId, typeof productId);
  return graphqlClient
    .setHeaders(headers)
    .request(addProductToFavouritesMutation, {
      productId: productId as string,
    });
};

export const removeFavorite = async (productId) => {
  const headers = await getHeaders();
  console.log("addProductFavorite -> headers", productId, typeof productId);
  return graphqlClient
    .setHeaders(headers)
    .request(removeProductFromFavouritesMutation, {
      productId: productId as string,
    });
};

export const getFavoritesWithDetails = async () => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(getUserFavouritesWithDetailsQuery);
};

export const addVendorFavorite = async (vendorId) => {
  const headers = await getHeaders();
  console.log("addProductFavorite -> headers", vendorId, typeof vendorId);
  return graphqlClient
    .setHeaders(headers)
    .request(addVendorToFavouritesMutation, {
      vendorId: vendorId as string,
    });
};

export const removeVendorFavorite = async (vendorId) => {
  const headers = await getHeaders();
  console.log("addProductFavorite -> headers", vendorId, typeof vendorId);
  return graphqlClient
    .setHeaders(headers)
    .request(removeVendorFromFavouritesMutation, {
      vendorId: vendorId as string,
    });
};
