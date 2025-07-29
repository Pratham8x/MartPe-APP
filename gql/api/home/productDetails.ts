import { getHeaders, graphqlClient } from "clients/api";
import { getProductByIdQuery } from "graphql/queries/productDetails";

export const getProductById = async (params: any) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(getProductByIdQuery, { ...params });
};
