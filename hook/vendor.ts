import { graphqlClient, getHeaders } from "../clients/api";
import { getVendorByIdQuery } from "../gql/queries/vendor";
import { useQuery } from "@tanstack/react-query";

export const useVendorById = async (params: any) => {
  const headers = await getHeaders();
  const query = useQuery({
    queryKey: ["home"],
    queryFn: () =>
      graphqlClient
        .setHeaders(headers)
        .request(getVendorByIdQuery, { ...params }),
  });
  return { ...query };
};
