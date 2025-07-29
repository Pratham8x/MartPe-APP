import React, { FC, useEffect, useState, useRef } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { useGlobalSearchParams, router } from "expo-router";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useMemo } from "react";
import Svg, {
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";
import Feather from "react-native-vector-icons/Feather";
import { getDistance } from "geolib";

import { Colors } from "../../../../theme";
import ImageComp from "../../../../components/common/ImageComp";
import { useGraphQLQuery } from "../../../../gql/queries/useGraphql/useGraphql";
import Loader from "../../../../components/common/Loader";
import AddToCartButton from "../../../../components/search/AddToCartButton";

import useDeliveryStore from "../../../../state/deliveryAddressStore";
import CustomizationGroup from "../../../../components/ProductDetails/CustomizationGroup";
import FoodDetailsComponent from "../../../../components/ProductDetails/FoodDetails";
import FilterCard from "../../../../components/search/filterCard";
import { useHideTabBarStore } from "../../../../state/hideTabBar";
import { filters, offerData, deliveryData } from "../../../../constants/filters";
const windowWidth = Dimensions.get("window").width;

interface CatalogDescriptor {
  __typename: string;
  name: string;
}

interface CatalogPrice {
  __typename: string;
  maximum_value: number;
  offer_percent: number;
  offer_value: number;
  value: number;
}

interface CatalogProvider {
  __typename: string;
  id: string;
  provider_id: string;
  address: any; // Define more specific type if needed
}

interface CatalogItem {
  __typename: string;
  catalog_id: string;
  category_id: string;
  category_ids: string[];
  city_code: string;
  descriptor: CatalogDescriptor;
  domain: string;
  domainName: string;
  id: string;
  location_id: string;
  non_veg: boolean | null;
  price: CatalogPrice;
  provider: CatalogProvider;
  provider_id: string;
  quantity: any; // Define more specific type if needed
  veg: boolean;
  withinCity: boolean;
}

interface GroupedCatalogItems {
  [providerId: string]: CatalogItem[];
}

const { width } = Dimensions.get("window");
const snapInterval = width * 0.72;

const defaultProps = {
  cartTextTimeOut: 400,
  cartValueTimeIn: 400,
  width: 100,
};

//button

interface SearchProps {
  domain: string;
}

const groupByCategoryId = (catalogs) => {
  return catalogs?.reduce((acc, product) => {
    const { provider_name } = product;
    if (!acc[provider_name]) {
      acc[provider_name] = [];
    }
    acc[provider_name].push(product);
    return acc;
  }, {});
};

const CircleSvg = () => {
  return (
    <View style={{ marginHorizontal: 4 }}>
      <Svg width={5} height={5} fill="none">
        <Circle cx={2.5} cy={2.5} r={2.5} fill="#000" />
      </Svg>
    </View>
  );
};

const VegSvg = () => {
  return (
    <Svg width={11} height={11} fill="none">
      <Rect
        width={10}
        height={10}
        x={0.5}
        y={0.5}
        fill="#fff"
        stroke="#1DA578"
        rx={1.5}
      />
      <Circle cx={5.5} cy={5.5} r={2.063} fill="#1DA578" />
    </Svg>
  );
};

const RatingSvg = () => {
  return (
    <Svg width={20} height={20} fill="none">
      <Path
        fill="#FFC700"
        d="m10 0 3.09 6.26L20 7.27l-5 4.87 1.18 6.88L10 15.77l-6.18 3.25L5 12.14 0 7.27l6.91-1.01L10 0Z"
      />
    </Svg>
  );
};

const ForwardArrowSvg = (props) => {
  return (
    <View style={{ marginLeft: props.margin }}>
      <Svg width={24} height={24} fill="none">
        <Path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14M12 5l7 7-7 7"
        />
      </Svg>
    </View>
  );
};

const ClockSvg = (props) => {
  return (
    <Svg width={56} height={16} fill="none">
      <Path
        fill="url(#a)"
        d="M1.037 8a7 7 0 0 1 7-7H56v14H8.037a7 7 0 0 1-7-7Z"
      />
      <Path
        fill="#5DA058"
        fillRule="evenodd"
        d="M13.333 8A5.333 5.333 0 1 1 2.666 8a5.333 5.333 0 0 1 10.667 0ZM8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334ZM8.333 4v3.774l3.124 1.25-.248.619L7.876 8.31l-.21-.084V4h.667Z"
        clipRule="evenodd"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={1.037}
          x2={67.627}
          y1={8}
          y2={8}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#CDF8A2" />
          <Stop offset={1} stopColor="#D9D9D9" stopOpacity={0} />
        </LinearGradient>
        <Text
          style={{
            color: "#666464",
            textAlign: "center",
            flexDirection: "row",
            alignItems: "center",
            fontSize: 12,
            marginLeft: 12,
          }}
        >
          {props.title * 60} min
        </Text>
      </Defs>
    </Svg>
  );
};

const groupByProviderName = (catalogs) => {
  return catalogs?.reduce((acc, product) => {
    const providerName = product?.provider?.descriptor?.name;
    if (!acc[providerName]) {
      acc[providerName] = [];
    }
    acc[providerName].push(product);
    return acc;
  }, {});
};

const Results: FC<SearchProps> = () => {
  const [itemCount, setItemCount] = useState(0);
  const [viewCustomization, setViewCustomization] = useState(false);
  const [isItem, setIsItem] = useState(true);
  const { search, domainData } = useGlobalSearchParams();
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const setHideTabBar = useHideTabBarStore((state) => state.setHideTabBar);
  const [filterSelected, setFilterSelected] = useState({
    category: [],
    offers: 0,
    delivery: 100,
  });
  const [activeFilter, setActiveFilter] = useState<string>("");
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails);

  const [foodDetails, setFoodDetails] = useState({
    images: "",
    long_desc: "",
    name: "",
    short_desc: "",
    symbol: "",
    price: "",
    storeId: "",
    maxQuantity: 0,
    itemId: "",
    visible: false,
    maxPrice: 0,
    discount: 0,
  });

  const [CustomizableGroup, setCustomizableGroup] = useState({
    customizable: false,

    vendorId: "",
    customGroup: [],
    itemId: "",
    maxLimit: 0,
    price: 0,
  });

  const getDistances = (lat1, lon1, lat2, lon2) => {
    const distance = Number(
      (
        getDistance(
          { latitude: lat1, longitude: lon1 },
          { latitude: lat2, longitude: lon2 }
        ) / 1000
      ).toFixed(1)
    );
    return distance / 1000;
  };

  const snapPoints = useMemo(() => ["50%", "70%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const handleCollapsePress = () => bottomSheetRef.current?.collapse();
  const snapeToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);
  const renderBackdrop = React.useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const { data, isLoading, error } = useGraphQLQuery(
    `
  query GetSearchPageData(
    $loc: Location!
    $limit: Int
    $cityCode: String!
    $query: String!
    $domain: String
  ) {
    getSearchPageData(
      query: $query
      loc: $loc
      limit: $limit
      cityCode: $cityCode
      domain: $domain
    ) {
      catalogs {
        id
        provider_id
        customizable
        custom_group

        city_code

        descriptor {
          name
          short_desc
          images
        }
        category_id
        domain
        price {
          maximum_value
          offer_percent
          offer_value
          value
        }
        time_to_ship_in_hours
        domainName

        provider {
          descriptor {
            symbol
            name
          }
          calculated_max_offer {
            percent
          }

          id
        }
        quantity {
          unitized {
            measure {
              unit
              value
            }
          }
        }
        geoLocation {
          lat
          lng
        }
        id
      }
      vendors {
        id
        domain
        geoLocation {
          lat
          lng
        }
        descriptor {
          name
          symbol
        }
        domainName
        withinCity
        hyperLocal
        panIndia
        address {
          locality
          street
          city
        }
        calculated_max_offer {
          percent
          
        }
      }
    }
  }
`,
    {
      loc: {
        lat: selectedDetails?.lat,
        lng: selectedDetails?.lng,
      },
      cityCode: "std:80",
      query: search,
      limit: 50,
      domain: domainData,
    }
  );

  const groupByCategoryId = (catalogs) => {
    return catalogs?.reduce((acc, product) => {
      const { provider_name } = product;
      if (!acc[provider_name]) {
        acc[provider_name] = [];
      }
      acc[provider_name].push(product);
      return acc;
    }, {});
  };

  const CircleSvg = () => {
    return (
      <View style={{ marginHorizontal: 4 }}>
        <Svg width={5} height={5} fill="none">
          <Circle cx={2.5} cy={2.5} r={2.5} fill="#000" />
        </Svg>
      </View>
    );
  };
  const VegSvg = () => {
    return (
      <Svg width={11} height={11} fill="none">
        <Rect
          width={10}
          height={10}
          x={0.5}
          y={0.5}
          fill="#fff"
          stroke="#1DA578"
          rx={1.5}
        />
        <Circle cx={5.5} cy={5.5} r={2.063} fill="#1DA578" />
      </Svg>
    );
  };
  const RatingSvg = () => {
    return (
      <Svg width={20} height={20} fill="none">
        <Path
          fill="#FFC700"
          d="m10 0 3.09 6.26L20 7.27l-5 4.87 1.18 6.88L10 15.77l-6.18 3.25L5 12.14 0 7.27l6.91-1.01L10 0Z"
        />
      </Svg>
    );
  };
  const ForwardArrowSvg = (props) => {
    return (
      <View style={{ marginLeft: props.margin }}>
        <Svg width={24} height={24} fill="none">
          <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h14M12 5l7 7-7 7"
          />
        </Svg>
      </View>
    );
  };
  const ClockSvg = (props) => {
    return (
      <Svg width={56} height={16} fill="none">
        <Path
          fill="url(#a)"
          d="M1.037 8a7 7 0 0 1 7-7H56v14H8.037a7 7 0 0 1-7-7Z"
        />
        <Path
          fill="#5DA058"
          fillRule="evenodd"
          d="M13.333 8A5.333 5.333 0 1 1 2.666 8a5.333 5.333 0 0 1 10.667 0ZM8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334ZM8.333 4v3.774l3.124 1.25-.248.619L7.876 8.31l-.21-.084V4h.667Z"
          clipRule="evenodd"
        />
        <Defs>
          <LinearGradient
            id="a"
            x1={1.037}
            x2={67.627}
            y1={8}
            y2={8}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor="#CDF8A2" />
            <Stop offset={1} stopColor="#D9D9D9" stopOpacity={0} />
          </LinearGradient>
          <Text
            style={{
              color: "#666464",
              textAlign: "center",
              flexDirection: "row",
              alignItems: "center",
              fontSize: 12,
              marginLeft: 12,
              paddingLeft: 4,
            }}
          >
            {props.title * 60} min
          </Text>
        </Defs>
      </Svg>
    );
  };

  useEffect(() => {
    console.log("product data", search);
    console.log("search page data", data);
    if (
      data?.getSearchPageData?.catalogs?.length === 0 &&
      data?.getSearchPageData?.vendors?.length > 0
    ) {
      setIsItem(false);
    }
  }, [data]);

  const catalogsData = data?.getSearchPageData?.catalogs;

  const CategoryAvailable = Array.from(
    new Set(catalogsData?.map((item) => item.category_id))
  ).map((category, index) => ({
    id: index + 1,
    label: category,
    value: category,
  }));

  const ProductCard = ({ providerName, products }) => {
    const {
      time_to_ship_in_hours,
      domainName,
      provider_name,
      provider,
      geoLocation,
    } = products[0];

    const doesProductMatchFilters = (product) => {
      const isCategoryMatch =
        filterSelected.category.length == 0 ||
        filterSelected.category.includes(product.category_id);

      const isOfferMatch =
        product.provider.calculated_max_offer.percent >= filterSelected.offers;

      const isDeliveryMatch =
        product.time_to_ship_in_hours <= filterSelected.delivery;

      return isCategoryMatch && isOfferMatch && isDeliveryMatch;
    };

    const filteredProducts = products.filter(doesProductMatchFilters);

    if (domainName === "F&B" && filteredProducts.length > 0) {
      return (
        <View style={[styles.card, { marginVertical: 10 }]}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "white",
                  marginRight: 4,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.43,
                  shadowRadius: 9.51,
                  height: Dimensions.get("screen").width * 0.15,
                  width: Dimensions.get("screen").width * 0.15,
                  elevation: 2,
                  borderRadius: 4,
                }}
              >
                <ImageComp
                  source={{
                    uri: provider?.descriptor?.symbol,
                  }}
                  imageStyle={{
                    aspectRatio: 1,
                    height: Dimensions.get("screen").width * 0.15,
                    width: Dimensions.get("screen").width * 0.15,
                    borderRadius: 4,
                  }}
                  resizeMode="cover"
                />
              </View>
              <View
                style={{
                  marginLeft: 10,

                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text style={styles.providerName}>
                  {provider?.descriptor?.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 4,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 13,
                        fontWeight: "400",
                        marginRight: 2,
                      }}
                    >
                      4.2
                    </Text>
                    <MaterialCommunityIcons
                      color="#FFC700"
                      size={16}
                      name="star"
                    />
                  </View>
                  <CircleSvg />

                  <ClockSvg title={time_to_ship_in_hours} />
                  <CircleSvg />
                  <Text style={styles.domainName}>
                    {Math.ceil(
                      getDistances(
                        Number(geoLocation?.lat),
                        Number(geoLocation?.lng),
                        selectedDetails?.lat,
                        selectedDetails?.lng
                      )
                    )}
                    km
                  </Text>
                </View>
                <Text
                  style={{ color: "#00BC66", fontSize: 13, fontWeight: "500" }}
                >
                  {Math.ceil(provider?.calculated_max_offer?.percent) > 0
                    ? `Upto ${Math.ceil(
                        provider?.calculated_max_offer?.percent
                      )}% Off`
                    : ""}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                router.push(`/(tabs)/home/productListing/${provider.id}`);
              }}
            >
              <ForwardArrowSvg margin={70} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={snapInterval} // Set the calculated snap interval
            decelerationRate="fast"
            style={styles.scrollViewStyle}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            {filteredProducts.map((product, index) => (
              <View key={index} style={styles.productItemFood}>
                <Pressable
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <View
                      style={{
                        borderColor: "#ACAAAA",
                        borderWidth: 0.5,
                        borderRadius: 10,
                        marginVertical: 10,
                      }}
                    >
                      <ImageComp
                        source={{
                          uri:
                            product.descriptor?.images &&
                            product.descriptor.images[0],
                        }}
                        imageStyle={{
                          height: 100,
                          width: 100,
                          borderRadius: 10,
                          borderColor: "#ACAAAA",
                          borderWidth: 1,
                        }}
                        resizeMode="cover"
                      />
                    </View>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: -30,
                      }}
                    >
                      {product.customizable ? (
                        <TouchableOpacity
                          onPress={() => {
                            setCustomizableGroup({
                              customizable: product?.customizable,
                              vendorId: product?.provider?.id,
                              customGroup: product?.custom_group,
                              itemId: product?.id,
                              maxLimit: Number(
                                Math.min(
                                  product.quantity.maximum?.count,
                                  product.quantity.available?.count
                                )
                              ),
                              price: product?.price?.value,
                            });
                            setIsFilterVisible(false);
                            setFoodDetails({
                              ...foodDetails,
                              visible: false,
                            });
                            handleOpenPress();
                          }}
                        >
                          <View
                            style={{
                              ...styles.addButton,
                              paddingVertical: 6.5,
                            }}
                          >
                            <Text
                              style={{
                                color: "green",
                                fontSize: 16,
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {"add".toUpperCase()}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 10,
                              color: "#A29D9D",
                              fontWeight: "500",
                              textAlign: "center",
                              marginVertical: 5,
                            }}
                          >
                            Customizable
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <AddToCartButton
                          storeId={product.provider.id}
                          itemId={product.id}
                          maxQuantity={Number(
                            Math.min(
                              product.quantity.maximum?.count,
                              product.quantity.available?.count
                            )
                          )}
                        />
                      )}
                    </View>
                  </View>

                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 10,
                      }}
                    >
                      <VegSvg />
                      <Text style={{ color: "#1DA578", marginHorizontal: 10 }}>
                        Best Seller
                      </Text>
                    </View>

                    <Text style={styles.productNameFood}>
                      {product.descriptor.name}
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "black", fontSize: 13 }}>
                        ₹{product?.price?.value}
                      </Text>

                      {product.price?.offer_percent && (
                        <>
                          <Text
                            style={{
                              textDecorationLine: "line-through",
                              fontSize: 13,
                              color: "#B8B4B4",
                              marginHorizontal: 8,
                            }}
                          >
                            ₹{product?.price?.maximum_value}
                          </Text>
                          <Text style={{ color: "#00BC66", fontSize: 13 }}>
                            {Math.ceil(product.price?.offer_percent) > 0
                              ? `${Math.ceil(
                                  product.price?.offer_percent
                                )}% Off`
                              : ""}
                          </Text>
                        </>
                      )}
                    </View>
                    <TouchableOpacity
                      style={{
                        borderColor: "#A29D9D",
                        borderWidth: 1,
                        borderRadius: 100,
                        width: 70,
                        marginVertical: 10,
                        paddingVertical: 2,
                      }}
                      onPress={() => {
                        setFoodDetails({
                          images: product.descriptor.images,
                          long_desc: product.descriptor.long_desc,
                          name: product.descriptor.name,
                          short_desc: product.descriptor.short_desc,
                          symbol: product.descriptor.symbol,
                          price: product.price.value,
                          storeId: product.provider.id,
                          itemId: product.id,
                          discount: product.price.offer_percent,
                          maxPrice: product.price.maximum_value,

                          visible: true,
                          maxQuantity: Number(
                            Math.min(
                              product?.quantity?.maximum?.count,
                              product?.quantity?.available?.count
                            )
                          ),
                        });
                        handleOpenPress();

                        setCustomizableGroup({
                          ...CustomizableGroup,
                          customizable: false,
                        });
                        setIsFilterVisible(false);
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#A29D9D",
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                      >
                        More Info
                      </Text>
                    </TouchableOpacity>

                    <View
                      style={{
                        flexDirection: "row",

                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: "black",
                          fontSize: 13,
                          fontWeight: "400",
                          marginRight: 2,
                        }}
                      >
                        4.2
                      </Text>
                      <MaterialCommunityIcons
                        color="#FFC700"
                        size={16}
                        name="star"
                      />
                    </View>
                  </View>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      );
    }
    if (domainName === "Grocery" && filteredProducts.length > 0) {
      return (
        <View style={[styles.card]}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "white",
                  marginRight: 4,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.43,
                  shadowRadius: 9.51,
                  height: Dimensions.get("screen").width * 0.15,
                  width: Dimensions.get("screen").width * 0.15,
                  elevation: 2,
                  borderRadius: 4,
                }}
              >
                <ImageComp
                  source={{
                    uri: provider?.descriptor?.symbol,
                  }}
                  imageStyle={{
                    aspectRatio: 1,
                    height: Dimensions.get("screen").width * 0.15,
                    width: Dimensions.get("screen").width * 0.15,
                    borderRadius: 4,
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <Text style={styles.providerName}>
                    {provider?.descriptor.name}
                  </Text>
                  <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <CircleSvg />

                    <ClockSvg title={time_to_ship_in_hours} />
                    <CircleSvg />
                  </View>

                  <Text style={styles.domainName}>
                    {Math.ceil(
                      getDistances(
                        Number(geoLocation?.lat),
                        Number(geoLocation?.lng),
                        selectedDetails?.lat,
                        selectedDetails?.lng
                      )
                    )}
                    km
                  </Text>
                </View>
                <Text style={{ color: "#00BC66" }}>
                  {Math.ceil(provider?.calculated_max_offer?.percent) > 0
                    ? `Upto ${Math.ceil(
                        provider?.calculated_max_offer?.percent
                      )}% Off`
                    : ""}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                router.push(`/(tabs)/home/productListing/${provider.id}`);
              }}
            >
              <ForwardArrowSvg margin={30} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={snapInterval}
            decelerationRate="fast"
            style={styles.scrollViewStyle}
          >
            {products.map((product, index) => (
              <Pressable
                onPress={() => {
                  router.push(`/(tabs)/home/productDetails/${product.id}`);
                }}
                key={index}
                style={styles.productItem}
              >
                <View
                  style={{
                    borderRadius: 10,
                    marginVertical: 10,
                    height: Dimensions.get("screen").width * 0.25,
                    width: Dimensions.get("screen").width * 0.35,
                  }}
                >
                  <ImageComp
                    source={{
                      uri:
                        product.descriptor?.images &&
                        product.descriptor.images[0],
                    }}
                    imageStyle={{
                      height: Dimensions.get("screen").width * 0.3,
                      borderRadius: 10,
                      width: Dimensions.get("screen").width * 0.35,
                      borderColor: "#ACAAAA",
                      borderWidth: 1,
                    }}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.addButtonContainer}>
                  <AddToCartButton
                    storeId={product.provider.id}
                    itemId={product.id}
                  />
                </View>
                <View
                  style={{
                    marginVertical: width * 0.03,
                    width: Dimensions.get("screen").width * 0.35,
                  }}
                >
                  <Text style={styles.productName}>
                    {product.descriptor.name}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",

                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Text style={{ color: "#B8B4B4" }}>
                      {product.quantity?.unitized?.measure.value}
                    </Text>
                    <Text style={{ color: "#B8B4B4", marginLeft: 2 }}>
                      {product.quantity?.unitized?.measure.unit}
                    </Text>
                  </View>

                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ color: "black", fontSize: 14 }}>
                      ₹{product?.price?.value}
                    </Text>

                    {product.price?.offer_percent && (
                      <>
                        <Text
                          style={{
                            textDecorationLine: "line-through",
                            fontSize: 14,
                            color: "#B8B4B4",
                            marginHorizontal: 8,
                          }}
                        >
                          ₹{product?.price?.maximum_value}
                        </Text>
                        <Text style={{ color: "#00BC66", fontSize: 14 }}>
                          {Math.ceil(provider?.calculated_max_offer?.percent) >
                          0
                            ? `${Math.ceil(product?.price?.offer_percent)}% Off`
                            : ""}
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      );
    }
    if (
      (domainName === "Fashion" ||
        domainName === "Electronics" ||
        domainName === "Home & Decor" ||
        domainName === "BPC") &&
      filteredProducts.length > 0
    ) {
      return (
        <View style={[styles.card, { marginTop: 10 }]}>
          <View style={styles.cardHeader}>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  backgroundColor: "white",
                  marginRight: 4,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.43,
                  shadowRadius: 9.51,
                  height: Dimensions.get("screen").width * 0.15,
                  width: Dimensions.get("screen").width * 0.15,
                  elevation: 2,
                  borderRadius: 4,
                }}
              >
                <ImageComp
                  source={{
                    uri: provider?.descriptor?.symbol,
                  }}
                  imageStyle={{
                    aspectRatio: 1,
                    height: Dimensions.get("screen").width * 0.15,
                    width: Dimensions.get("screen").width * 0.15,
                    borderRadius: 4,
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.providerName}>
                    {provider?.descriptor.name}
                  </Text>
                  <CircleSvg />

                  <ClockSvg title={time_to_ship_in_hours} />
                  <CircleSvg />
                  <Text style={styles.domainName}>
                    {Math.ceil(
                      getDistances(
                        Number(geoLocation?.lat),
                        Number(geoLocation?.lng),
                        selectedDetails?.lat,
                        selectedDetails?.lng
                      )
                    )}
                    km
                  </Text>
                </View>
                <Text style={{ color: "#00BC66" }}>
                  {Math.ceil(provider?.calculated_max_offer?.percent) > 0
                    ? `Upto ${Math.ceil(
                        provider?.calculated_max_offer?.percent
                      )}% Off`
                    : ""}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                router.push(`/(tabs)/home/productListing/${provider.id}`);
              }}
            >
              <ForwardArrowSvg margin={30} />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={snapInterval} // Set the calculated snap interval
            decelerationRate="fast"
            style={styles.scrollViewStyle}
          >
            {products.map((product, index) => (
              <Pressable
                onPress={() => {
                  router.push(`/(tabs)/home/productDetails/${product.id}`);
                }}
                key={index}
                style={styles.productItem}
              >
                <View>
                  <View
                    style={{
                      borderTopEndRadius: 10,
                      borderTopStartRadius: 10,

                      // marginHorizontal: 10,
                    }}
                  >
                    <ImageComp
                      source={{
                        uri:
                          product.descriptor?.images &&
                          product.descriptor.images[0],
                      }}
                      imageStyle={{
                        height: width * 0.42,
                        width: width * 0.42,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        borderColor: "#ACAAAA",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                      }}
                      resizeMode="cover"
                    />
                  </View>

                  <View
                    style={{
                      marginVertical: 10,
                      marginHorizontal: width * 0.03,
                    }}
                  >
                    <Text style={styles.productName}>
                      {product.descriptor.name}
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                      {product?.price?.maximum_value >
                        product?.price?.value && (
                        <Text
                          style={{
                            textDecorationLine: "line-through",
                            fontSize: 14,
                            color: "#B8B4B4",
                            marginRight: 8,
                          }}
                        >
                          ₹{Math.ceil(product?.price?.maximum_value)}
                        </Text>
                      )}
                      <Text style={{ color: "black", fontSize: 14 }}>
                        ₹{Math.ceil(product?.price?.value)}
                      </Text>
                    </View>
                    {product.price?.offer_percent && (
                      <>
                        <Text style={{ color: "#00BC66", fontWeight: "600" }}>
                          {Math.ceil(product.price?.offer_percent)} % off
                        </Text>
                      </>
                    )}
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      );
    }
  };

  const catalogs = data?.getSearchPageData?.catalogs;
  const productsByCategory = groupByCategoryId(catalogs);
  const productsByProvider = groupByProviderName(catalogs);

  const { width, height } = Dimensions.get("window");
  useEffect(() => {
    console.log("search data catalogs is", data?.getSearchPageData?.catalogs);
    if (error) console.log("error is", error);
    if (data?.getSearchPageData?.catalogs)
      console.log("grouped categories:", groupByCategoryId(catalogs));
    console.log("productData", search);
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Text style={{ color: "black" }}>
        Error: {error.message},{search}
      </Text>
    );
  }
  if (!data) {
    return <Text style={{ color: "black" }}>No data available</Text>;
  }

  const applyOfferFilter = (selected) => {
    setOffersSelected(selected?.value);
  };
  const applytimeFilter = (selected) => {
    setDeliverySelected(selected?.value);
  };

  // main area for code

  return (
    <View style={styles.container}>
      {/* header of search bar */}
      <View style={styles.headerContainer}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            marginHorizontal: Dimensions.get("screen").width * 0.03,
          }}
        >
          <Feather
            name="arrow-left"
            style={styles.headerLeftIcon}
            onPress={() => router.back()}
          />
          <Text
            style={{
              color: Colors.BLACK_COLOR,
              textAlign: "center",
              // marginLeft: Dimensions.get("window").width * 0.1,
              fontSize: 16,
            }}
          >
            Search Anything you want
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/search",
              params: { domain: domainData },
            });
          }}
          style={styles.searchContainer}
        >
          <TextInput
            value={search}
            onPressIn={() =>
              router.push({
                pathname: "/search",
                params: { domain: domainData },
              })
            }
            placeholder="Search for dishes, clothing, groceries.."
            style={{
              height: 50,
              borderColor: "white",
              borderWidth: 2,
              borderRadius: 10,
              width: width * 0.6,
              paddingHorizontal: 20,
              paddingLeft: 10,

              color: "#8E8A8A",
              textAlign: "left",
              flex: 1,
            }}
            selectionColor="#8E8A8A"
            placeholderTextColor="#8E8A8A"
          />
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/search",
                params: { domain: domainData },
              })
            }
            style={styles.icon}
          >
            <Feather name="x" size={20} color="#8E8A8A" />
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={isItem ? styles.active : styles.inactive}
            onPress={() => setIsItem(true)}
          >
            <Text
              style={
                !isItem
                  ? { textAlign: "center" }
                  : { textAlign: "center", color: "#F05454", fontWeight: "500" }
              }
            >
              Items
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isItem ? styles.inactive : styles.active}
            onPress={() => setIsItem(false)}
          >
            <Text
              style={
                isItem
                  ? { textAlign: "center" }
                  : { textAlign: "center", color: "#F05454", fontWeight: "500" }
              }
            >
              Outlets
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {isItem ? (
        <View>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <ScrollView
              style={{
                flexDirection: "row",
                marginVertical: Dimensions.get("screen").width * 0.02,
                position: "relative",
                marginHorizontal: Dimensions.get("screen").width * 0.03,
              }}
              horizontal
            >
              {filters.map((filter, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor:
                      (filter.name === "Category" &&
                        filterSelected.category.length > 0) ||
                      (filter.name === "Offers" && filterSelected.offers > 0) ||
                      (filter.name === "Delivery" &&
                        filterSelected.delivery < 100)
                        ? "black"
                        : "#EEEEEE",
                    backgroundColor: "white",
                    borderRadius: 100,
                    paddingHorizontal: Dimensions.get("screen").width * 0.03,
                    paddingVertical: Dimensions.get("screen").width * 0.015,
                    alignItems: "center",
                    justifyContent: "center",
                    marginHorizontal: Dimensions.get("screen").width * 0.01,
                    flexDirection: "row",
                  }}
                  onPress={() => {
                    handleOpenPress();
                    setActiveFilter(filter?.name);
                    setFoodDetails({
                      ...foodDetails,
                      visible: false,
                    });
                    setIsFilterVisible(true);
                    setCustomizableGroup({
                      ...CustomizableGroup,
                      customizable: false,
                    });
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "600" }}>
                    {
                      {
                        Category:
                          "Category " +
                          (filterSelected.category.length > 0
                            ? `(${filterSelected.category.length})`
                            : ""),
                        Offers:
                          filterSelected.offers > 0
                            ? filterSelected.offers + "% and above"
                            : "Offers",
                        Delivery:
                          filterSelected.delivery < 100
                            ? filterSelected.delivery + " or min "
                            : "Delivery",
                      }[filter?.name]
                    }
                  </Text>

                  <Pressable
                    style={{
                      display:
                        (filter.name === "Category" &&
                          filterSelected.category.length > 0) ||
                        (filter.name === "Offers" &&
                          filterSelected.offers > 0) ||
                        (filter.name === "Delivery" &&
                          filterSelected.delivery < 100)
                          ? "flex"
                          : "none",
                      marginLeft: 5,
                    }}
                    onPress={() => {
                      setFoodDetails({
                        ...foodDetails,
                        visible: false,
                      });
                      setCustomizableGroup({
                        ...CustomizableGroup,
                        customizable: false,
                      });
                      setFilterSelected({
                        category:
                          filter.name === "Category"
                            ? []
                            : filterSelected.category,
                        offers:
                          filter.name === "Offers" ? 0 : filterSelected.offers,
                        delivery:
                          filter.name === "Delivery"
                            ? 100
                            : filterSelected.delivery,
                      });
                    }}
                  >
                    <Feather name="x" size={16} color="black" />
                  </Pressable>
                </TouchableOpacity>
              ))}
              {(filterSelected.category.length > 0 ||
                filterSelected.delivery !== 100 ||
                filterSelected.offers !== 0) && (
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "#F13A3A",
                    backgroundColor: "white",
                    borderRadius: 100,
                    paddingHorizontal: Dimensions.get("screen").width * 0.03,
                    paddingVertical: Dimensions.get("screen").width * 0.01,
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: Dimensions.get("screen").width * 0.03,
                  }}
                  onPress={() => {
                    setFilterSelected({
                      category: [],
                      offers: 0,
                      delivery: 100,
                    });
                  }}
                >
                  <Text style={{ color: "#F13A3A" }}>Reset</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
          <View
            style={{ paddingBottom: Dimensions.get("screen").height * 0.17 }}
          >
            <ScrollView contentContainerStyle={styles.content}>
              <View style={styles.cardContainer}>
                <Text
                  style={[
                    styles.cardTitle,
                    { textTransform: "capitalize", marginLeft: width * 0.03 },
                  ]}
                >
                  {/* Restaurants serving {productData.name} */}
                  Showing Results for ' {search} '
                </Text>
              </View>
              {data?.getSearchPageData?.catalogs?.length === 0 && (
                <Text
                  style={[
                    styles.cardTitle,
                    { textTransform: "capitalize", marginLeft: width * 0.03 },
                  ]}
                >
                  {/* Restaurants serving {productData.name} */}
                  No Items available to show
                </Text>
              )}

              {Object.entries(productsByProvider).map(
                ([providerName, products]) => (
                  <ProductCard
                    key={providerName}
                    providerName={providerName}
                    products={products}
                  />
                )
              )}
            </ScrollView>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.cardContainer}>
            <Text
              style={[
                styles.cardTitle,
                { textTransform: "capitalize", marginLeft: width * 0.03 },
              ]}
            >
              {/* Restaurants serving {productData.name} */}
              Showing Results for ' {search} '
            </Text>
          </View>
          {data?.getSearchPageData?.vendors?.length === 0 && (
            <Text
              style={[
                styles.cardTitle,
                { textTransform: "capitalize", marginLeft: width * 0.03 },
              ]}
            >
              {/* Restaurants serving {productData.name} */}
              No Vendors available to show
            </Text>
          )}
          {data?.getSearchPageData?.vendors?.map((store, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  router.push(`/(tabs)/home/productListing/${store.id}`);
                }}
                key={index}
                style={{
                  flexDirection: "row",
                  marginHorizontal: Dimensions.get("screen").width * 0.04,
                  marginTop: Dimensions.get("screen").width * 0.05,
                  // backgroundColor: "white",
                  borderColor: "black",
                  // borderWidth: 1,
                  justifyContent: "flex-start",
                  paddingHorizontal: Dimensions.get("screen").width * 0.03,
                  paddingVertical: Dimensions.get("screen").width * 0.03,
                  borderRadius: 12,
                  alignItems: "center",
                  backgroundColor: "#F5F7F8",
                }}
              >
                <View>
                  <ImageComp
                    source={{ uri: store?.descriptor?.symbol }}
                    imageStyle={{
                      aspectRatio: 1,
                      height: 60,
                      // width: 50,
                      borderRadius: 100,
                    }}
                    resizeMode="cover"
                  />
                </View>
                <View
                  style={{
                    marginHorizontal: Dimensions.get("screen").width * 0.03,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: "#3D3B40",
                    }}
                  >
                    {store?.descriptor?.name}
                  </Text>
                  <View style={{ flexDirection: "row", marginVertical: 4 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginRight: 20,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="star"
                        size={18}
                        color="#FFD523"
                      />
                      <Text style={{ fontSize: 14, fontWeight: "400" }}>
                        4.2
                      </Text>
                      {Math.ceil(store?.calculated_max_offer?.percent) > 0 ? (
                        <Text
                          style={{
                            color: "#00BC66",
                            fontSize: 14,
                            fontWeight: "500",
                            marginHorizontal: 10,
                          }}
                        >
                          Upto {Math.ceil(store?.calculated_max_offer?.percent)}
                          % Off
                        </Text>
                      ) : null}
                    </View>
                  </View>

                  <View style={{ flexDirection: "column" }}>
                    <Text
                      style={{
                        color: "#3D3B40",
                        fontWeight: "500",
                        fontSize: 13,
                      }}
                    >
                      <MaterialCommunityIcons name="map-marker" />
                      {store?.address?.street}, {store?.address?.city}{" "}
                    </Text>

                    {store?.panIndia ? (
                      <Text
                        style={{
                          marginVertical: 4,
                          color: "#73777B",
                          fontSize: 13,
                        }}
                      >
                        <MaterialCommunityIcons name="truck" /> Delivers Across
                        India
                      </Text>
                    ) : null}
                  </View>
                  <View></View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        handleIndicatorStyle={{ backgroundColor: "#fff" }}
        backgroundStyle={{ backgroundColor: "#FFFFFF" }}
        backdropComponent={renderBackdrop}
      >
        {isFilterVisible && (
          <FilterCard
            options={filters}
            activeOption={activeFilter}
            selectOption={setFilterSelected}
            categoryData={CategoryAvailable}
            filterSelected={filterSelected}
            offerData={offerData}
            deliveryData={deliveryData}
            setActiveOption={setActiveFilter}
            closeFilter={handleClosePress}
          />
        )}

        {foodDetails?.visible && (
          <FoodDetailsComponent
            closeFilter={handleClosePress}
            foodDetails={foodDetails}
          />
        )}
        {CustomizableGroup.customizable && (
          <CustomizationGroup
            customGroup={CustomizableGroup.customGroup}
            customizable={CustomizableGroup.customizable}
            vendorId={CustomizableGroup.vendorId}
            itemId={CustomizableGroup.itemId}
            maxLimit={CustomizableGroup.maxLimit}
            price={CustomizableGroup.price}
            closeFilter={handleClosePress}
          />
        )}
      </BottomSheet>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE_COLOR,
    // minHeight: Dimensions.get("window").height * 0.6,
    flex: 1,
  },
  active: {
    // backgroundColor: "#00BC66",
    paddingTop: 10,
    // borderRadius: 10,
    // color: "white",
    // marginHorizontal: 10,
    width: "50%",
    borderBottomWidth: 2,
    borderBottomColor: "#F05454",
    color: "#F05454",
  },
  inactive: {
    // backgroundColor: "#00BC66",
    paddingTop: 10,
    // borderRadius: 10,
    // color: "white",
    // marginHorizontal: 10,
    width: "50%",
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    color: "black",
  },

  headerContainer: {
    // paddingHorizontal: 16,

    flexDirection: "column",
    paddingVertical: 10,
    backgroundColor: Colors.WHITE_COLOR,
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // Add other styles as needed
  },
  stickyFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // Add any additional styling for your footer
  },
  searchContainer: {
    backgroundColor: Colors.WHITE_COLOR,
    flexDirection: "row",
    borderColor: "#C7C4C4",
    borderWidth: 2,
    alignItems: "center",
    borderRadius: 13,
    marginTop: 10,
    marginHorizontal: Dimensions.get("screen").width * 0.03,
  },
  containerStyle: {
    backgroundColor: Colors.WHITE_COLOR,
    borderWidth: 0,
    borderRadius: 10,
  },
  headerLeftIcon: {
    color: Colors.BLACK_COLOR,
    marginRight: 15,
    fontSize: 25,
  },
  shadowBox: {
    // Other styles like width, height, backgroundColor, etc.
    shadowColor: "#585555", // The color
    shadowOffset: {
      width: 0, // Horizontal shadow offset
      height: 4, // Vertical shadow offset
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5, // This is for Android
    backgroundColor: Colors.WHITE_COLOR,
    color: Colors.BLACK_COLOR,
    borderRadius: 13,
    paddingHorizontal: 10,
  },
  headerIcon: {
    color: Colors.WHITE_COLOR,
    marginLeft: 25,
    fontSize: 25,
  },
  content: {
    // flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
    paddingBottom: Dimensions.get("screen").width * 0.25,
    // marginBottom: 500,
  },
  locationContainer: {
    paddingHorizontal: 16,
  },
  locationheader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  locationTitle: {
    color: Colors.WHITE_COLOR,
    lineHeight: 16,
    paddingHorizontal: 11,
  },
  locationText: {
    color: Colors.WHITE_COLOR,
    lineHeight: 12,
    paddingLeft: 24,
    paddingBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  cardTitle: {
    color: Colors.GREY_COLOR,
    paddingHorizontal: 10,
  },
  cardLine: {
    borderWidth: 0.5,
    borderColor: Colors.BORDER_COLOR,
    flex: 1,
  },
  card: {
    flex: 1,

    backgroundColor: Colors.WHITE_COLOR, // Set the desired background color
    shadowColor: "#002751",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    paddingVertical: 15,
    // borderRadius: 12,
    borderColor: Colors.BORDER_COLOR,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    // elevation: 1,
  },
  productItemFood: {
    width: windowWidth * 0.7,
    borderColor: "#ACAAAA",
    borderWidth: 1,
    marginLeft: Dimensions.get("window").width * 0.03,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 2,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    // elevation: 6,
    marginVertical: 10,

    backgroundColor: "white",
  },

  productName: {
    color: "black",
    fontSize: 14,
    textAlign: "left",
    fontWeight: "500",
  },
  productNameFood: {
    color: "black",
    fontSize: 14,
    textAlign: "left",
    width: windowWidth * 0.3,
    marginRight: 10,
    fontWeight: "500",
  },
  imgContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    borderColor: Colors.BORDER_COLOR,
  },
  categoryTitle: {
    color: Colors.GREY_COLOR,
    textAlign: "center",
    paddingTop: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    color: Colors.GREY_COLOR,
    marginLeft: 2,
  },
  restaurantsTime: {
    color: Colors.GREY_COLOR,
    marginLeft: 5,
  },
  restaurantName: {
    color: Colors.BLACK_COLOR,
    marginBottom: 6,
  },
  veg: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: Colors.GREEN_COLOR,
  },
  vegContainer: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: Colors.GREEN_COLOR,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  non_veg: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: Colors.NON_VEG_COLOR,
  },
  non_vegContainer: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: Colors.NON_VEG_COLOR,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  itemCard: {
    borderWidth: 1,
    borderColor: Colors.BLUE2_COLOR,
    borderRadius: 8,
    marginTop: 10,
    marginRight: 10,
    padding: 8,
    paddingBottom: 30,
    width: windowWidth / 1.7,
    // aspectRatio: 2.5,
  },
  menuName: {
    color: Colors.BLACK_COLOR,
    marginTop: 8,
  },
  menuPrice: {
    color: Colors.WAIKAWA_GRAY_COLOR,
    marginTop: 6,
  },
  menuMore: {
    color: Colors.WAIKAWA_GRAY_COLOR,
    marginTop: 6,
  },
  addText: {
    color: Colors.PRIMARY_COLOR,
    textAlign: "center",
    paddingHorizontal: 4,
  },
  addBtn: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY_COLOR,
    borderRadius: 16,
    justifyContent: "center",
    position: "absolute",
    bottom: -15,
    backgroundColor: Colors.WHITE_COLOR,
    alignSelf: "center",
    width: 80,
  },
  addIcon: {
    color: Colors.PRIMARY_COLOR,
    fontSize: 16,
  },
  addBtnContainer: {
    paddingVertical: 3,
    // paddingHorizontal: 16,
    flex: 1,
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  icon: {
    paddingRight: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 10,
    marginHorizontal: Dimensions.get("window").width * 0.03,
  },
  providerName: {
    color: "black",
    fontSize: 14,
    fontWeight: "500",
    maxWidth: Dimensions.get("window").width * 0.3,
  },
  categoryName: {
    color: "black",
  },
  domainName: {
    color: "black",
    fontSize: 13,
  },
  shippingTime: {
    color: "black",
  },
  scrollViewStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  productItem: {
    width: windowWidth * 0.42,
    borderColor: "#ACAAAA",
    borderWidth: 1,
    marginLeft: Dimensions.get("window").width * 0.02,
    marginRight: Dimensions.get("window").width * 0.02,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 2,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    // elevation: 6,
    marginVertical: 10,
    PaddingVertical: Dimensions.get("window").width * 0.02,

    backgroundColor: "white",
  },

  productDescription: {
    // Style for the product description text
  },
  productDomain: {
    // Style for the product domain text
  },
  addButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -10, // Adjust the margin as per your UI needs
  },
  addButtonContainerT: {
    justifyContent: "center",
    alignItems: "center",

    marginVertical: width * 0.03, // Adjust the margin as per your UI needs
    marginLeft: width * 0.03, // Adjust the margin as per your UI needs
    // Adjust the margin as per your UI needs
  },
  addButtonT: {
    backgroundColor: "white", // Button background color
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 5, // Vertical padding
    borderRadius: 16, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.25, // Shadow opacity for iOS
    shadowRadius: 3.84, // Shadow radius for iOS
    height: width * 0.08,
  },
  addButton: {
    backgroundColor: "white", // Button background color
    paddingHorizontal: 20, // Horizontal padding
    paddingVertical: 5, // Vertical padding
    borderRadius: 4, // Rounded corners
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: "#00BC66", // Text color
    fontSize: 16, // Text font size
    fontWeight: "bold", // Text font weight
  },
  addButtonTextT: {
    color: "#000", // Text color
    fontSize: 12, // Text font size
    fontWeight: "normal", // Text font weight
  },
  dropdownContainer: {
    margin: 20,
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});
