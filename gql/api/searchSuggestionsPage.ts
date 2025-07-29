import {
  GetSearchSuggestionQuery,
  GetSearchSuggestionQueryVariables,
} from "../../gql/graphql";
import { getHeaders, graphqlClient } from "../../clients/api";
import { getSearchSuggestionDataQuery } from "../queries/searchSuggestion";

export const getSearchSuggestionsPage = async (
  params: GetSearchSuggestionQueryVariables
): Promise<GetSearchSuggestionQuery> => {
  const headers = await getHeaders();
  console.log("search suggestions -> params", params);

  return await graphqlClient
    .setHeaders(headers)
    .request<GetSearchSuggestionQuery>(getSearchSuggestionDataQuery, params);
};
