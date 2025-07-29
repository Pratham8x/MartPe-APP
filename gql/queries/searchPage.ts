import { graphql } from "gql";

export const getSearchPageDataQuery = graphql(`
  query GetSearchPageData(
    $loc: Location!
    $limit: Int
    $cityCode: String!
    $query: String!
    $domain: String
  ) {
    getSearchPageData(
      query: $query
      loc: $loc
      limit: $limit
      cityCode: $cityCode
      domain: $domain
    ) {
      catalogs {
        id
        provider_id
        customizable
        custom_group

        city_code

        descriptor {
          name
          short_desc
          images
        }
        category_id
        domain
        price {
          maximum_value
          offer_percent
          offer_value
          value
        }
        time_to_ship_in_hours
        domainName

        provider {
          descriptor {
            symbol
            name
          }
          calculated_max_offer {
            percent
          }

          id
        }
        quantity {
          unitized {
            measure {
              unit
              value
            }
          }
        }
        geoLocation {
          lat
          lng
        }
        id
      }
      vendors {
        id
        domain
        descriptor {
          name
        }
      }
    }
  }
`);
