import { graphql } from "../../gql";

export const getAllCartsQuery = graphql(`
  #graphql
  query GetAllCarts($withItemDetails: Boolean) {
    getAllCarts(withItemDetails: $withItemDetails) {
      id
      items {
        itemId
        quantity
        details {
          descriptor {
            name
            symbol
          }
          price {
            value
            maximum_value
          }
          meta {
            ondc_org_cancellable
          }
          quantity {
            maximum {
              count
            }
            available {
              count
            }
          }
          catalog_id
          category_id
        }
      }
      store {
        id
        descriptor {
          name
          symbol
        }
        domain
        geoLocation {
          lat
          lng
        }
        address {
          street
        }
      }
      customizations {
        baseItemId
        details {
          descriptor {
            name
          }
          price {
            value
          }
        }
        itemId
        quantity
      }
    }
  }
`);

export const addItemToCartQuery = graphql(`
  #graphql
  mutation AddItemToCart(
    $vendorId: String!
    $itemId: String!
    $quantity: Int!
    $customizations: [CartCustomItemInputType!]
  ) {
    addItemToCart(
      vendor_id: $vendorId
      itemId: $itemId
      quantity: $quantity
      customizations: $customizations
    ) {
      customizations {
        baseItemId
        itemId
        quantity
      }
      id
      storeId
      items {
        itemId
        quantity
      }
      userId
    }
  }
`);

export const clearCartQuery = graphql(`
  #graphql
  mutation ClearCart($vendorId: String!) {
    clearCart(vendor_id: $vendorId)
  }
`);

export const clearAllCartsQuery = graphql(`
  #graphql
  mutation clearAllCarts {
    clearAllCarts
  }
`);

export const removeItemFromCartQuery = graphql(`
  #graphql
  mutation RemoveItemFromCart($vendorId: String!, $itemId: String!) {
    removeItemFromCart(vendor_id: $vendorId, itemId: $itemId) {
      customizations {
        baseItemId
        itemId
        quantity
      }
      id
      items {
        itemId
        quantity
      }
      storeId
      userId
    }
  }
`);

export const updateItemQuantityQuery = graphql(`
  #graphql
  mutation UpdateItemQuantity(
    $vendorId: String!
    $itemId: String!
    $quantity: Int!
  ) {
    updateItemQuantity(
      vendor_id: $vendorId
      itemId: $itemId
      quantity: $quantity
    ) {
      customizations {
        baseItemId
        itemId
        quantity
      }
      id
      items {
        itemId
        quantity
      }
      storeId
      userId
    }
  }
`);
