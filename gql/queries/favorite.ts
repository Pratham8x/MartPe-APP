import { graphql } from "../../gql";

export const getUserFavoriteQuery = graphql(`
  query GetUserFavourites {
    getUserFavourites {
      products
      vendors
    }
  }
`);

export const addProductToFavouritesMutation = graphql(`
  mutation AddProductToFavs($productId: String!) {
    addProductToFavs(productId: $productId) {
      success
      message
    }
  }
`);

export const removeProductFromFavouritesMutation = graphql(`
  mutation RemoveProductFromFavs($productId: String!) {
    removeProductFromFavs(productId: $productId) {
      success
      message
    }
  }
`);

export const getUserFavouritesWithDetailsQuery = graphql(`
  query GetUserFavouritesWithDetails {
    getUserFavouritesWithDetails {
      products {
        id
        descriptor {
          images
          name
        }
        price {
          maximum_value
          offer_percent
          offer_value
          value
        }
        quantity {
          available {
            count
          }
          maximum {
            count
          }
        }
        provider {
          descriptor {
            name
          }
          panIndia
          hyperLocal
          address {
            city
            locality
            state
          }
        }
        vendor_id
      }
      vendors {
        city_code
        address {
          locality
          city
          state
        }

        panIndia
        provider_id
        id
        descriptor {
          images
          name
          symbol
        }
      }
    }
  }
`);

export const addVendorToFavouritesMutation = graphql(`
  mutation AddVendorToFavs($vendorId: String!) {
    addVendorToFavs(vendorId: $vendorId) {
      success
      message
    }
  }
`);

export const removeVendorFromFavouritesMutation = graphql(`
  mutation RemoveVendorFromFavs($vendorId: String!) {
    removeVendorFromFavs(vendorId: $vendorId) {
      success
      message
    }
  }
`);
