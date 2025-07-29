import React, { FC, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { useGraphQLQuery } from "../../gql/queries/useGraphql/useGraphql";
import AddToCart from "./AddToCart";

import { MaterialCommunityIcons, AntDesign, Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
interface CustomizationGroupProps {
  customizable: boolean;
  customGroup: string[] | null;
  providerId: string;
  domain: string;
  cityCode: string;
  bppId: string;
  vendorId: string | string[];
  price: number;
  itemId: string;
  maxLimit: number;
  closeFilter: () => void;
}

const CustomizationGroup: FC<CustomizationGroupProps> = ({
  customizable,
  customGroup,
  vendorId,
  price,
  itemId,
  maxLimit,
  closeFilter,
}) => {
  const [activeCustomGroup, setActiveCustomGroup] = React.useState<string>(
    customGroup[0]
  );
  const [nextCustomGroup, setNextCustomGroup] = React.useState<string>("");
  const [selectedCustomizations, setSelectedCustomizations] = React.useState<
    Array<string>
  >([]);
  const [finalCustomizations, setFinalCustomizations] = React.useState<
    Array<{}>
  >([]);
  const [isLoad, setIsLoad] = React.useState<boolean>(true);

  const [step, setStep] = React.useState<number>(0);
  const [selected, setSelected] = React.useState<string>("");
  const [multipleSelected, setMultipleSelected] = React.useState([]);
  const [addedSelected, setAddedSelected] = React.useState([]);
  const { data, isLoading, error } = useGraphQLQuery(
    `query GetCustomizations($customGroup: [String!]!, $vendorId: String!) {
      getCustomizations(custom_group: $customGroup, vendor_id: $vendorId) {
         descriptor {
                name
              }
              options {
                child {
                  id
                }
                descriptor {
                  name
                }
                price {
                  value
                }
                quantity {
                  available {
                    count
                  }
                }
                related
                type
                group {
                  default
                  id
                }
                tags {
                  code
                  list {
                    code
                    value
                  }
                }
              }
              custom_group_id
              config {
                input
                max
                min
                seq
              }
      }
    }`,
    {
      customGroup: customGroup,
      vendorId: vendorId,
    }
  );

  useEffect(() => {
    setActiveCustomGroup(customGroup[0]);
    setSelectedCustomizations([]);
    setFinalCustomizations([]);
    setStep(0);
    console.log("customizable", customGroup, vendorId, step);
    console.log(
      "selectedCustomizations",
      activeCustomGroup,
      selectedCustomizations
    );
  }, [customGroup]);

  const handleAddCustomization = (
    activeCustomGroup: string | null,
    customizationId: string
  ) => {
    if (customizationId === null) {
      setSelectedCustomizations([...selectedCustomizations]);
    } else {
      setSelectedCustomizations((selected) => {
        if (selected.includes(customizationId)) {
          return selected.filter((id) => id !== customizationId);
        } else {
          return [...selected, customizationId];
        }
      });
    }

    if (activeCustomGroup === null) {
      setNextCustomGroup("end");
    } else {
      setNextCustomGroup(activeCustomGroup);
    }

    console.log("selectedCustomizations", selectedCustomizations);
  };

  if (customGroup === null) return null;
  if (isLoading)
    return (
      <View>
        <ActivityIndicator size="large" color="#FB3E44" />
      </View>
    );
  if (error) return <Text>We couldnt find any customizations </Text>;

  const handleNext = () => {
    const newFinalCustomizations = [
      ...finalCustomizations,
      selectedCustomizations,
    ];
    setFinalCustomizations(newFinalCustomizations);

    if (nextCustomGroup !== "end") {
      setActiveCustomGroup(nextCustomGroup);
      setStep((prevStep) => prevStep + 1);
    } else {
      // Handle the case where there are no more customizations
      console.log("Final Customizations:", newFinalCustomizations);
    }
  };

  const handlePrevious = () => {
    const newFinalCustomizations = finalCustomizations.slice(0, -1); // Remove the last set of customizations
    setFinalCustomizations(newFinalCustomizations);

    setActiveCustomGroup(customGroup[step - 1] || customGroup[0]);
    setStep((prevStep) => (prevStep > 0 ? prevStep - 1 : 0));
  };

  return (
    <View
      style={{
        paddingHorizontal: Dimensions.get("screen").width * 0.03,
        height: "100%",
        flex: 1,
        // backgroundColor: "black",
        // marginTop: -20,
      }}
    >
      {customizable ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "600",
              paddingVertical: Dimensions.get("screen").width * 0.04,
            }}
          >
            Customize as per your taste
          </Text>
          <Pressable onPress={closeFilter}>
            <AntDesign
              name="close"
              size={18}
              style={{ fontWeight: "600" }}
              color="black"
            />
          </Pressable>
        </View>
      ) : null}

      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 0.2,
        }}
      ></View>
      {data.getCustomizations.map((item, idx) => {
        return (
          <View key={idx}>
            {item.custom_group_id === activeCustomGroup ? (
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    paddingVertical: 10,
                    fontWeight: "500",
                  }}
                >
                  {item.descriptor.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    paddingVertical: 10,
                    fontWeight: "400",
                  }}
                >
                  {item.config.input} upto {item.config.max} option
                </Text>
                <View
                  style={{
                    backgroundColor: "white",
                    elevation: 2,
                    shadowColor: "grey",
                    shadowOffset: { width: 0, height: 2 },
                    paddingHorizontal: 10,
                    minHeight: 100,
                    borderRadius: 10,
                  }}
                >
                  {item.options.map((option, idx) => {
                    return (
                      <View key={idx}>
                        <Pressable
                          onPress={() => {
                            handleAddCustomization(
                              option?.child?.id,
                              option?.group?.id
                            );
                            if (item.config.max > 1) {
                              setMultipleSelected((currentSelected) => {
                                if (
                                  currentSelected.includes(
                                    option.descriptor.name
                                  ) ||
                                  multipleSelected.length >= item.config.max
                                ) {
                                  // Item is already selected, so remove it from the array
                                  return currentSelected.filter(
                                    (name) => name !== option.descriptor.name
                                  );
                                } else {
                                  // Item is not selected, so add it to the array
                                  return [
                                    ...currentSelected,
                                    option.descriptor.name,
                                  ];
                                }
                              });
                            } else {
                              setSelected(option.descriptor.name);
                            }
                          }}
                        >
                          {item.config.input === "text" ? (
                            <>
                              <Text>{option.descriptor.name}</Text>
                              <TextInput
                                placeholder="Enter your customizations"
                                style={{
                                  borderBottomWidth: 1,
                                  borderBottomColor: "gray",
                                }}
                              />
                            </>
                          ) : null}
                          {item.config.input === "select" &&
                          item.config.max == 1 ? (
                            <View
                              style={{
                                flexDirection: "row",
                                width: Dimensions.get("screen").width * 0.88,
                                justifyContent: "space-between",
                                marginVertical: 10,
                              }}
                            >
                              <Text>{option.descriptor.name}</Text>
                              <View
                                style={{
                                  width: 16,
                                  height: 16,
                                  borderColor:
                                    selected === option.descriptor.name
                                      ? "#FB3E44"
                                      : "#ACAAAA",
                                  borderWidth: 1.5,
                                  borderRadius: 15,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {selected === option.descriptor.name && (
                                  <View
                                    style={{
                                      width: 8,
                                      height: 8,
                                      backgroundColor: "#FB3E44",
                                      borderRadius: 15,
                                    }}
                                  ></View>
                                )}
                              </View>
                            </View>
                          ) : null}
                          {item.config.input === "select" &&
                          item.config.max > 1 ? (
                            <View
                              style={{
                                flexDirection: "row",
                                width: Dimensions.get("screen").width * 0.88,
                                justifyContent: "space-between",
                                marginVertical: 10,
                              }}
                            >
                              <Text>{option.descriptor.name}</Text>
                              <View
                                style={{
                                  width: 16,
                                  height: 16,
                                  borderColor: multipleSelected.includes(
                                    option.descriptor.name
                                  )
                                    ? "#FB3E44"
                                    : "#ACAAAA",
                                  borderWidth: 1.5,
                                  borderRadius: 2,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {multipleSelected.includes(
                                  option.descriptor.name
                                ) && (
                                  <Feather
                                    name="check"
                                    size={12}
                                    color="#FB3E44"
                                  />
                                )}
                              </View>
                            </View>
                          ) : null}
                        </Pressable>
                      </View>
                    );
                  })}
                </View>
                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                    bottom: -Dimensions.get("screen").width * 0.6,
                  }}
                >
                  {item?.options[step]?.child?.id ? (
                    <View>
                      {step > 0 && (
                        <TouchableOpacity
                          onPress={() => {
                            setActiveCustomGroup(
                              selectedCustomizations[step - 1]
                            );
                            setStep(step - 1);
                            handlePrevious();
                          }}
                          style={{
                            backgroundColor: "#FB3E44",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal:
                              Dimensions.get("screen").width * 0.05,
                            paddingVertical:
                              Dimensions.get("screen").width * 0.03,
                            borderRadius: 4,
                            marginBottom: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: 600,
                            }}
                          >
                            Previous
                          </Text>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        onPress={() => {
                          setActiveCustomGroup(nextCustomGroup);
                          setAddedSelected([
                            ...addedSelected,
                            selectedCustomizations,
                          ]);
                          setStep(step + 1);
                          handleNext();
                          console.log(
                            finalCustomizations,
                            "finalCustomizations"
                          );
                        }}
                        style={{
                          backgroundColor: "#0e8910",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",

                          paddingHorizontal:
                            Dimensions.get("screen").width * 0.05,
                          paddingVertical:
                            Dimensions.get("screen").width * 0.03,
                          borderRadius: 4,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: "600",
                          }}
                        >
                          Next
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      {step > 0 && (
                        <TouchableOpacity
                          onPress={() => {
                            setActiveCustomGroup(
                              selectedCustomizations[step - 1]
                            );
                            setStep(step - 1);
                          }}
                          style={{
                            backgroundColor: "#FB3E44",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal:
                              Dimensions.get("screen").width * 0.05,
                            paddingVertical:
                              Dimensions.get("screen").width * 0.03,
                            borderRadius: 4,
                            marginBottom: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 16,
                              fontWeight: 600,
                            }}
                          >
                            Previous
                          </Text>
                        </TouchableOpacity>
                      )}
                      <AddToCart
                        price={price}
                        storeId={vendorId as string}
                        itemId={itemId}
                        maxLimit={maxLimit}
                      />
                    </>
                  )}
                </View>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

export default CustomizationGroup;
