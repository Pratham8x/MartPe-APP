import { graphqlClient } from "../clients/api";
import { getHomeQuery } from "../gql/queries/home";
import { useQuery } from "@tanstack/react-query";

export const useHome = (params: any) => {
  // const isEnabled = Boolean(params?.loc?.lat && params?.loc?.lng);
  if (params?.loc?.lat && params?.loc?.lng) {
    const query = useQuery({
      queryKey: ["home"],
      queryFn: () =>
        graphqlClient.setHeaders({}).request(getHomeQuery, { ...params }),
      // enabled: isEnabled,
    });

    return { ...query };
  }

  // console.log("isEnabled", isEnabled);
};
