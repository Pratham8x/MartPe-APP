import { graphql } from "../../gql";

export const getVendorByIdQuery = graphql(`
  query GetVendorById($getVendorByIdId: String!, $all: Boolean) {
    getVendorById(id: $getVendorByIdId) {
      id
      panIndia
      withinCity
      hyperLocal
      radius_in_metres
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
        # max
        # min
        # max
        # min
      }
      geoLocation {
        lat
        lng
      }
      catalogs(all: $all) {
        category_id
        id
        descriptor {
          name
          images
          symbol
          long_desc
          short_desc
        }
        # bpp_id
        # location_id
        # provider_id
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
        # tags {
        #   code
        #   list {
        #     code
        #     value
        #   }
        # }
        # category_ids
      }
    }
  }
`);
