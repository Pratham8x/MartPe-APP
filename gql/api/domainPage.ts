import { getHeaders, graphqlClient } from "../../clients/api";
import { getDomainPageDataQuery } from "../queries/domainPage";

export const getDomainPageData = async (params: any) => {
  const headers = await getHeaders();
  console.log("getDomainPageData -> params", params);
  return await graphqlClient
    .setHeaders(headers)
    .request(getDomainPageDataQuery, { ...params });
};
