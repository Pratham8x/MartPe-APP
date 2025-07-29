import { useQuery } from "@tanstack/react-query";
import { getHeaders, graphqlClient } from "../../clients/api";
import { getHomeQuery } from "../queries/home";
import { GetHomeQueryVariables } from "../../gql/graphql";

// export const useHomePageData = async (params: GetHomeQueryVariables) => {
//   const headers = await getHeaders();
//   const query = useQuery({
//     queryKey: ["home-data"],
//     queryFn: async () =>
//       await graphqlClient
//         .setHeaders(headers)
//         .request(getHomeQuery, { ...params }),
//   });
//   return { ...query, data: query.data?.getHome };
// };

export const useHomePageData = (params: GetHomeQueryVariables) => {
  const query = useQuery({
    queryKey: ["home-data"],
    queryFn: async () => {
      const headers = await getHeaders();
      return graphqlClient
        .setHeaders(headers)
        .request(getHomeQuery, { ...params });
    },
  });
  return { ...query, data: query.data?.getHome };
};

export const useHomePageData2 = (params: GetHomeQueryVariables) => {
  return useQuery({
    queryKey: ["home-data"],
    queryFn: async () => {
      const headers = await getHeaders();
      return await graphqlClient
        .setHeaders(headers)
        .request(getHomeQuery, { ...params });
    },
  });
};

export const getHomePageData = async (params: any) => {
  const headers = await getHeaders();
  console.log("getHome -> params", params);
  return await graphqlClient
    .setHeaders(headers)
    .request(getHomeQuery, { ...params });
};
