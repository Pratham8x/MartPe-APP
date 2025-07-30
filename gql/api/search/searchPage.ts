import { getHeaders, graphqlClient } from "../../../clients/api";

import { getSearchPageDataQuery } from "../../../gql/queries/searchPage";

export const getSearchPageData = async (params: any) => {
  console.log("serch page query", params);
  const headers = await getHeaders();
  return await graphqlClient
    .setHeaders(headers)
    .request(getSearchPageDataQuery, { ...params });
};
