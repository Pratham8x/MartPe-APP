import { graphql } from "../../gql";

export const getDomainPageDataQuery = graphql(`
  query GetDomainPageData(
    $domain: String!
    $loc: Location!
    $cityCode: String!
  ) {
    getDomainPageData(domain: $domain, loc: $loc, cityCode: $cityCode) {
      stores {
        descriptor {
          name
          images
          symbol
        }
        domain
        id
        distance
        catalogs {
          descriptor {
            name
            images
            short_desc
          }
          id
          category_id
          price {
            maximum_value
            offer_percent
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
        }
        address {
          street
        }
        geoLocation {
          lat
          lng
        }
        calculated_max_offer {
          percent
        }
        time_to_ship_in_hours {
          avg
        }
      }
      offers {
        calculated_max_offer {
          percent
        }
        descriptor {
          name
          symbol
          images
        }
        id
      }
    }
  }
`);
