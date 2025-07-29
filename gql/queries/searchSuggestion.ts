import { graphql } from "../../gql";

export const getSearchSuggestionDataQuery = graphql(`
  query GetSearchSuggestion(
    $loc: Location!
    $cityCode: String!
    $query: String!
    $domain: String
  ) {
    getSearchSuggestion(
      loc: $loc
      cityCode: $cityCode
      query: $query
      domain: $domain
    ) {
      catalogs {
        id
        descriptor {
          name
          symbol
        }
        domain
      }
      vendors {
        id
        descriptor {
          name
          symbol
        }
        domain
      }
    }
  }
`);
