import { getHeaders, graphqlClient } from "../../../clients/api";
import { getProductByIdQuery } from "../../../gql/queries/productDetails";

export const getProductById = async (params: any) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(getProductByIdQuery, { ...params });
};
