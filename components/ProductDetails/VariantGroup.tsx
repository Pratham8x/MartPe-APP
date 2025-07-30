import React, { FC, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { useGraphQLQuery } from "../../gql/queries/useGraphql/useGraphql";
import Electronics from "./Variants/ElectronicsVariant";
import { ScrollView } from "react-native-gesture-handler";
import ElectronicsSecondary from "./Variants/ElectronicsSecondary";
interface VariantGroupProps {
  parentId: string;
  bppId: string;
  locationId: string;
  domain: string;
  cityCode: string;
  vendorId: string;
  initialPrimaryVariant: string;
  initialSecondaryVariant: string;
  attributes: string;
  variants: string[];
  selectedProductId: string;
}

const { width } = Dimensions.get("window");

const VariantGroup: FC<VariantGroupProps> = ({
  parentId,
  bppId,
  locationId,
  domain,
  cityCode,
  vendorId,
  initialPrimaryVariant,
  initialSecondaryVariant,
  variants,
  selectedProductId,
}) => {
  const [PrimaryVariant, setPrimaryVariant] = React.useState<string>(
    initialPrimaryVariant
  );
  const [SecondaryVariant, setSecondaryVariant] = React.useState<string>(
    initialSecondaryVariant
  );
  const [isMeasure, setIsMeasure] = React.useState<boolean>(false);

  useEffect(() => {
    console.log("data", data);
    console.log("isLoading", initialPrimaryVariant);
    console.log("variants", variants);
  });

  const { data, isLoading, error } = useGraphQLQuery(
    `query GetVariants($vendorId: String!, $parentItemId: String!) {
      getVariants(vendor_id: $vendorId, parent_item_id: $parentItemId) {
         attributes
        id
        price {
          maximum_value
          value
        }
        descriptor {
          images
        }
        quantity {
          available {
            count
          }
          unitized {
            measure {
              unit
              value
            }
          }
        }
        
        variants
        domainName
      }
    }`,
    {
      vendorId: vendorId,
      parentItemId: parentId,
    }
  );

  useEffect(() => {
    console.log(
      "data",
      data?.getVariants?.map((item) => item?.variants)
    );
    if (
      data?.getVariants[0].variants.find(
        (item) => item === "item.quantity.unitized.measure"
      )
    ) {
      setIsMeasure(true);
    }
  });

  const attributes = data?.getVariants.map((item) => {
    return JSON.parse(item.attributes);
  });

  const convertedData = data?.getVariants.map((item) => {
    return {
      ...item,
      attributes: JSON.parse(item?.attributes),
    };
  });

  useEffect(() => {
    console.log("convertedData", convertedData);
    console.log("attributes", attributes);
  });

  const handlePrimaryVariant = (primaryVariant: string) => {
    setPrimaryVariant(primaryVariant);
    console.log("primaryVariant", primaryVariant);
  };

  const seenAttributes = new Set();

  if (isLoading) return null;
  if (error) return null;

  return (
    <View>
      {/* <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "column",
          justifyContent: "space-between",

          paddingHorizontal: width * 0.05,
          paddingVertical: width * 0.03,
          marginHorizontal: width * 0.05,
          elevation: 5,
          borderRadius: 10,
          marginTop: width * 0.05,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
          Available Quantity
        </Text>
        <ScrollView horizontal>
          {data?.getVariants?.map((item, index) => (
            <Electronics
              key={index}
              givePrimaryVariant={handlePrimaryVariant}
              primaryAttribute={
                item.quantity.unitized.measure.value +
                " " +
                item.quantity.unitized.measure.unit
              }
              productId={item.id}
              image={item.descriptor.images[0]}
              currentPrice={item.price.value}
              maximumPrice={item.price.maximum_value}
              availableQuantity={item.quantity.available.count}
              primaryVariant={initialPrimaryVariant}
            />
          ))}
        </ScrollView>
      </View> */}
      {variants &&
        variants?.map((item, index) => (
          <View
            style={{
              backgroundColor: "#fff",
              flexDirection: "column",
              justifyContent: "space-between",

              paddingHorizontal: width * 0.05,
              paddingVertical: width * 0.03,
              marginHorizontal: width * 0.05,
              elevation: 5,
              borderRadius: 10,
              marginTop: width * 0.05,
            }}
            key={index}
          >
            <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
              Available {item}
            </Text>
            <ScrollView horizontal>
              {convertedData
                ?.filter((itemFitered) => {
                  const attributeValue = itemFitered.attributes[item];
                  if (seenAttributes.has(attributeValue)) {
                    // If we've seen this attribute value before, filter it out
                    return false;
                  } else {
                    // If it's a new attribute value, keep the item and mark the value as seen
                    seenAttributes.add(attributeValue);
                    return true;
                  }
                })
                ?.map((items, idx) => (
                  <View key={idx}>
                    <Electronics
                      givePrimaryVariant={handlePrimaryVariant}
                      primaryAttribute={items.attributes[item]}
                      productId={items.id}
                      image={items.descriptor.images[0]}
                      currentPrice={items.price.value}
                      maximumPrice={items.price.maximum_value}
                      availableQuantity={items.quantity.available.count}
                      primaryVariant={initialPrimaryVariant}
                      isPrimary={index === 0 ? true : false}
                      selectedProductId={selectedProductId}
                    />
                  </View>
                ))}
            </ScrollView>
          </View>
        ))}
    </View>
  );
};

export default VariantGroup;

[
  {
    attributes: '{"color":"Black","size":"S"}',
  },
  {
    attributes: '{"color":"blue","size":"S"}',
  },
  {
    attributes: '{"color":"blue","size":"M"}',
  },
];

[
  {
    id: "5f9e3a5d9e2c6b0012c4b6d0ds",
    price: { maximum_value: 100, value: 100 },
    descriptor: { images: [Array] },
  },
  {
    id: "5f9e3a5d9e2c6b0012c4b6d0ds",
    price: { maximum_value: 100, value: 100 },
    descriptor: { images: [Array] },
  },
  {
    id: "5f9e3a5d9e2c6b0012c4b6d0ds",
    price: { maximum_value: 100, value: 100 },
    descriptor: { images: [Array] },
  },
];
