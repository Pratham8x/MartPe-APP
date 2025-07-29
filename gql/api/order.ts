import { getAllOrdersByUserQuery, getAllReasonCodesQuery } from "../queries/order";
import { getHeaders, graphqlClient } from "../../clients/api";

export const getAllOrdersByUser = async () => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(getAllOrdersByUserQuery);
};
export const getAllReasonCodes = async () => {
  const headers = await getHeaders();
  return graphqlClient.setHeaders(headers).request(getAllReasonCodesQuery);
};
