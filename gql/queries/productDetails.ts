import { graphql } from "../../gql";

export const getProductByIdQuery = graphql(`
  query GetProductById($getProductByIdId: String!) {
    getProductById(id: $getProductByIdId) {
      descriptor {
        images
        long_desc
        name
        short_desc
        symbol
      }
      custom_group

      customizable
      attributes
      domain
      variants
      attributes
      domainName
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
        unitized {
          measure {
            unit
            value
          }
        }
      }
      time_to_ship_in_hours
      custom_group

      meta {
        ondc_org_cancellable
        ondc_org_available_on_cod
        ondc_org_contact_details_consumer_care
        ondc_org_fssai_license_no
        ondc_org_mandatory_reqs_veggies_fruits {
          net_quantity
        }
        ondc_org_return_window
        ondc_org_returnable
        ondc_org_seller_pickup_return
        ondc_org_statutory_reqs_packaged_commodities {
          common_or_generic_name_of_commodity
          manufacturer_or_packer_address
          manufacturer_or_packer_name
          month_year_of_manufacture_packing_import
          net_quantity_or_measure_of_commodity_in_pkg
        }
      }
      provider {
        id
        descriptor {
          images
          name
          long_desc
          short_desc
          symbol
        }
        catalogs {
          descriptor {
            images
            long_desc
            name
            short_desc
            symbol
          }
          id
          price {
            maximum_value
            offer_percent
            offer_value
            value
          }
        }
      }
      parent_item_id

      city_code
    }
  }
`);
