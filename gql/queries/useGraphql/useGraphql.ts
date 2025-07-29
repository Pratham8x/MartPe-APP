import { useQuery } from "@tanstack/react-query";
import client from "./api";
import { gql } from "@apollo/client";

export function useGraphQLQuery(query, variables) {
  return useQuery({
    queryKey: ["graphqlQuery", variables],
    queryFn: async () => {
      const { data, errors } = await client.query({
        query: gql`
          ${query}
        `,
        variables: variables,
      });
      console.log("data variables", variables);
      return data;
    },
  });
}
