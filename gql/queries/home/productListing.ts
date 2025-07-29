import { graphql } from "../../../gql";

export const getVendorByIdQuery = graphql(`
  query GetVendorById($getVendorByIdId: String!, $all: Boolean) {
    getVendorById(id: $getVendorByIdId) {
      id
      descriptor {
        name
        images
        symbol
      }
      fssai_license_no
      address {
        area_code
        city
        locality
        state
        street
      }
      storeSections
      domain
      time_to_ship_in_hours {
        avg
      }
      geoLocation {
        lat
        lng
      }
      catalogs(all: $all) {
        id
        descriptor {
          name
          images
          symbol
          long_desc
          short_desc
        }

        provider {
          id
        }
        veg
        non_veg
        price {
          offer_value
          offer_percent
          maximum_value
          value
        }
        category_id
        quantity {
          available {
            count
          }
          maximum {
            count
          }
        }
      }
    }
  }
`);
