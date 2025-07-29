import { graphql } from "../../gql";

export const getHomeQuery = graphql(`
  #graphql
  query GetHome($loc: Location!, $cityCode: String!) {
    getHome(loc: $loc, cityCode: $cityCode) {
      offers {
        descriptor {
          name
          short_desc
          symbol
        }
        id
        calculated_max_offer {
          percent
          value
        }
      }
      restaurants {
        distance
        descriptor {
          images
          long_desc
          name
          short_desc
          symbol
        }
        id
        address {
          locality
        }
        geoLocation {
          lat
          lng
        }
        provider_id
        distance
      }
      stores {
        distance
        descriptor {
          images
          long_desc
          name
          short_desc
          symbol
        }
        id
        address {
          locality
        }
        geoLocation {
          lat
          lng
        }
        provider_id
        distance
      }
    }
  }
`);
