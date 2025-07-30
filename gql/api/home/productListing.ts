import { getHeaders, graphqlClient } from "../../../clients/api";
import { getVendorByIdQuery } from "../../../gql/queries/vendor";

export const getVendorById = async (params: any) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(getVendorByIdQuery, { ...params });
};
