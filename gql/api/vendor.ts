import { graphqlClient, getHeaders } from "../../clients/api";
import { getVendorByIdQuery } from "../../gql/queries/vendor";
// import { useQuery } from "@tanstack/react-query";

export const getVendorById = async (params: any) => {
  const headers = await getHeaders();
  return graphqlClient
    .setHeaders(headers)
    .request(getVendorByIdQuery, { ...params });
};
