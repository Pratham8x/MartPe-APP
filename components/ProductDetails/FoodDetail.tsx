import React, { FC, useEffect } from "react";
import { View, Text } from "react-native";
import ImageComp from "../common/ImageComp";
import { useGraphQLQuery } from "../../gql/queries/useGraphql/useGraphql";
interface Props {
  productId: string;
}

const FoodDetail: FC<Props> = ({ productId }) => {
  const { data, isLoading, error } = useGraphQLQuery(
    `query GetProductById($getProductByIdId: String!) {
        getProductById(id: $getProductByIdId) {
            descriptor {
            images
            long_desc
            name
            short_desc
            symbol
            }
            custom_group
            customizable
            attributes
            domain
            variants
            domainName
            price {
            maximum_value
            offer_percent
            offer_value
            value
            }
            quantity {
            maximum_value
            offer_percent
            offer_value
            value
            }
            seller {
            id
            name
            rating
            image
            products
            }
        }
        }
        `,
    { getProductByIdId: productId }
  );

  useEffect(() => {
    console.log("this", data);
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error...</Text>;

  return (
    <View>
      {data?.getProductById?.descriptor.images.map((image, index) => (
        <ImageComp key={index} source={{ uri: image }} />
      ))}
    </View>
  );
};

export default FoodDetail;
