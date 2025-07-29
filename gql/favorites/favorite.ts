import { getHeaders, graphqlClient } from "../../clients/api";
import {
  addProductToFavouritesMutation,
  removeProductFromFavouritesMutation,
  getUserFavoriteQuery,
  getUserFavouritesWithDetailsQuery,
  addVendorToFavouritesMutation,
  removeVendorFromFavouritesMutation,
} from "../queries/favorite";
import { GetUserFavouritesWithDetailsQuery } from "../../gql/graphql";

// Data types
export type Product = {
  id: string;
  name: string;
};

export type Vendor = {
  id: string;
  name: string;
};

export type Favourite = {
  products: Product[];
  vendors: Vendor[];
};

// GET all favorite IDs
export const getAllFavorites = async (): Promise<{
  getUserFavourites: { products: string[]; vendors: string[] };
}> => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(getUserFavoriteQuery);
};


// ADD product to favorites
export const addProductFavorite = async (productId: string): Promise<any> => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(addProductToFavouritesMutation, { productId });
};

// REMOVE product from favorites
export const removeFavorite = async (productId: string): Promise<any> => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(removeProductFromFavouritesMutation, { productId });
};

export const getFavoritesWithDetails = async (): Promise<GetUserFavouritesWithDetailsQuery> => {
  const headers = await getHeaders();
  const response = await graphqlClient
    .setHeaders(headers)
    .request<GetUserFavouritesWithDetailsQuery>(getUserFavouritesWithDetailsQuery);
    
  return response; // ✅ ensures the correct type is returned
};

// ADD vendor to favorites
export const addVendorFavorite = async (vendorId: string): Promise<any> => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(addVendorToFavouritesMutation, { vendorId });
};

// REMOVE vendor from favorites
export const removeVendorFavorite = async (vendorId: string): Promise<any> => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(removeVendorFromFavouritesMutation, { vendorId });
};
