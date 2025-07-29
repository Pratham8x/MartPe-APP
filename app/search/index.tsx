import React, { useEffect, useState } from "react";

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';


import { Colors, Fonts } from "../../theme";
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native-paper";
import ImageComp from "../../components/common/ImageComp";
import Svg, { Path } from "react-native-svg";
import { getAsyncStorageItem, setAsyncStorageItem } from "../../utility/asyncStorage";
import { getSearchSuggestionsPage } from "../../gql/api/searchSuggestionsPage";
import useDeliveryStore from "../../state/deliveryAddressStore";

const { width, height } = Dimensions.get("window");

const searchTexts = ["grocery", "biryani", "clothing", "electronics"];

// Define types for the data structures
interface Descriptor {
  name: string;
  symbol?: string;
}

interface CatalogItem {
  id: string;
  descriptor: Descriptor;
  domain: string;
}

interface VendorItem {
  id: string;
  descriptor: Descriptor;
  domain: string;
}

interface SearchData {
  catalogs?: CatalogItem[];
  vendors?: VendorItem[];
  _typeName?: string;
}

interface SearchSuggestionResponse {
  getSearchSuggestion?: SearchData;
}

interface SelectedDetails {
  lat: number;
  lng: number;
}

const SearchScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const domain = params.domain as string | undefined;
  const placeHolder = params.placeHolder as string | undefined;
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedInput, setDebouncedInput] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [data, setData] = useState<SearchData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [recentSearchesBySuggestions, setRecentSearchesBySuggestions] = useState<string[]>([]);
  const [streetName, setStreetName] = useState<string>("");
  const [searchTextIndex, setSearchTextIndex] = useState<number>(0);
  const selectedDetails = useDeliveryStore((state) => state.selectedDetails) as SelectedDetails;

  // used to change the search placeholder text values from within an array
  useEffect(() => {
    const interval = setInterval(() => {
      setSearchTextIndex((prevIndex) => (prevIndex + 1) % searchTexts.length);
    }, 3000); // Change index every 3 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch recent searches when the component mounts
    const loadRecentSearches = async (): Promise<void> => {
      const searches = await getRecentSearches();
      setRecentSearches(searches);
      console.log("searches", searches);
    };

    loadRecentSearches();
  }, []);

  const GotoArrow: React.FC = () => {
    return (
      <Svg
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 24"
      >
        <Path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 17 17 7M7 7h10v10"
        />
      </Svg>
    );
  };

  useEffect(() => {
    if (inputValue.length < 3) return;

    const timerId = setTimeout(() => {
      setDebouncedInput(inputValue);
    }, 500); // Delay for 500ms (not 3 seconds as comment said)

    return () => clearTimeout(timerId);
  }, [inputValue]);

  const payload = {
    loc: { lat: selectedDetails?.lat, lng: selectedDetails?.lng },
    cityCode: "std:80",
    query: debouncedInput,
    domain: domain,
    limit: 5,
    // radius: 15000,
  };

  useEffect(() => {
    if (debouncedInput.length < 3) {
      setIsLoading(false);
      return;
    }

    async function productDataFetch(): Promise<void> {
      try {
        setIsLoading(true);
        const response: SearchSuggestionResponse = await getSearchSuggestionsPage(payload);
        console.log(`product details response: `, response);
        const searchData = response?.getSearchSuggestion || null;
        setData(searchData);
        console.log("productDetail:", searchData);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    }
    productDataFetch();
  }, [debouncedInput]);

  useEffect(() => {
    console.log("data suggestions ", data);
    console.log("recent searches", getRecentSearches());
    console.log("recent ", recentSearches);
  }, [data]);

  const getRecentSearches = async (): Promise<string[]> => {
    try {
      const searches = await getAsyncStorageItem("recentSearches");
      return searches ? JSON.parse(searches) : [];
    } catch (error) {
      // Error retrieving data
      console.error("Error retrieving recent searches:", error);
      return []; // Return an empty array if there's an error
    }
  };

  const saveSearchTerm = async (searchTerm: string): Promise<void> => {
    try {
      const currentSearches = await getAsyncStorageItem("recentSearches");
      let searches: string[] = currentSearches ? JSON.parse(currentSearches) : [];
      searches.push(searchTerm);
      searches = [...new Set(searches)];
      await setAsyncStorageItem("recentSearches", JSON.stringify(searches));
      setRecentSearches(searches);
    } catch (err) {
      console.error("Error saving search term:", err);
    }
  };

  const removeSearchTerm = async (searchTerm: string): Promise<void> => {
    try {
      const currentSearches = await getAsyncStorageItem("recentSearches");
      let searches: string[] = currentSearches ? JSON.parse(currentSearches) : [];
      searches = searches.filter((search) => search !== searchTerm);
      await setAsyncStorageItem("recentSearches", JSON.stringify(searches));
      setRecentSearches(searches);
    } catch (err) {
      console.error("Error removing search term:", err);
    }
  };

  const saveRecentSearchesBySuggestions = async (searchTerm: string): Promise<void> => {
    try {
      const currentSearches = await getAsyncStorageItem(
        "recentSearchesBySuggestions"
      );
      let searches: string[] = currentSearches ? JSON.parse(currentSearches) : [];
      searches.push(searchTerm);
      searches = [...new Set(searches)]; // Remove duplicates
      await setAsyncStorageItem(
        "recentSearchesBySuggestions",
        JSON.stringify(searches)
      );
      setRecentSearchesBySuggestions(searches); // Update local state
    } catch (err) {
      console.error("Error saving search term:", err);
    }
  };

  const handleSearchSubmit = async (): Promise<void> => {
    if (inputValue.length < 3) return;
    await saveSearchTerm(inputValue);
    router.push({
      pathname: "../(tabs)/home/result/[search]",
      params: {
        search: inputValue,
        domainData: domain,
      },
    });
  };

  const handleSearchSubmitBySuggestions = async (): Promise<void> => {
    await saveSearchTerm(inputValue);
    router.push(`../(tabs)/home/result/${inputValue}`);
  };

  // Filter catalogs by one item
  const filterUniqueCatalogsByName = <T extends { descriptor: { name: string } }>(catalogs: T[]): T[] => {
    const uniqueCatalogs: T[] = [];
    const namesSet = new Set<string>();

    catalogs.forEach((catalog) => {
      if (!namesSet.has(catalog.descriptor.name)) {
        namesSet.add(catalog.descriptor.name);
        uniqueCatalogs.push(catalog);
      }
    });

    return uniqueCatalogs;
  };

  const uniqueCatalogs = filterUniqueCatalogsByName(data?.catalogs || []);
  const uniqueVendors = filterUniqueCatalogsByName(data?.vendors || []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Feather
            name="arrow-left"
            style={styles.headerLeftIcon}
            onPress={() => router.back()}
          />
          <Text
            style={{
              ...Fonts.medium(16),
              color: Colors.BLACK_COLOR,
              textAlign: "center",
              // marginLeft: 40,
            }}
          >
            Search anything you want
          </Text>
        </View>

        {/* search bar */}
        <View style={styles.searchContainer}>
          <TextInput
            value={inputValue}
            onChangeText={(newText: string) => setInputValue(newText)}
            autoFocus={true}
            placeholder={
              placeHolder
                ? placeHolder
                : `Search for '${searchTexts[searchTextIndex]}'`
            }
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
            onPress={() => {
              handleSearchSubmit();
            }}
            style={styles.icon}
          >
            <Feather name="search" size={20} color="#8E8A8A" />
          </TouchableOpacity>
        </View>
      </View>
      {inputValue.length < 3 ? (
        <View style={styles.recentSearchContainer}>
          <Text style={styles.recentSearchHeader}>
            {recentSearches.length > 0
              ? "Recent Searches"
              : "Discover something new!"}
          </Text>
          <View style={styles.recentSearchItemsContainer}>
            {[...recentSearches]
              .reverse()
              .slice(0, 5)
              .map((search: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentSearchItem}
                  onPress={() => {
                    setInputValue(search);
                    handleSearchSubmit();
                    router.push({
                      pathname: "../(tabs)/home/result/[search]",
                      params: {
                        search: search,
                        domainData: domain,
                      },
                    });
                  }}
                >
                  <Feather name="clock" size={13} color="#35374B" />
                  <Text style={styles.recentSearchText}>
                    {search.length < 20 ? search : search.slice(0, 20) + "..."}
                  </Text>
                  {/* remove search terms  */}
                  <TouchableOpacity
                    onPress={() => {
                      removeSearchTerm(search);
                    }}
                    style={styles.removeRecentSearch}
                  >
                    <MaterialCommunityIcons
                      name="close"
                      size={14}
                      color="#35374B"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      ) : (
        <View>
          <Text style={{ marginHorizontal: 20 }}>Suggestions</Text>
          {data?.catalogs?.length || data?.vendors?.length ? (
            <SafeAreaView style={{ flex: 1, minHeight: height * 0.8 }}>
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
              >
                {uniqueCatalogs.map((item: CatalogItem) => (
                  <Pressable
                    onPress={() => {
                      router.push({
                        pathname: "../(tabs)/home/result/[search]",
                        params: {
                          search: item.descriptor.name,
                          domainData: domain,
                        },
                      });
                      saveSearchTerm(item.descriptor.name);
                    }}
                    style={styles.searchRow}
                    key={item.id}
                  >
                    <ImageComp
                      source={
                        item.descriptor?.symbol && item.descriptor.symbol.length > 0
                          ? item.descriptor.symbol
                          : "https://res.cloudinary.com/doex3braa/image/upload/v1703058217/martpe/food/sihuigqn0bv4ustt4wyi.png"
                      }
                      imageStyle={{
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                      }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "80%",
                      }}
                    >
                      <View>
                        <Text style={styles.productName}>
                          {item.descriptor.name}
                        </Text>
                        <Text
                          style={{
                            color: "gray",
                            marginLeft: 15,
                            fontSize: 12,
                          }}
                        >
                          {item.domain === "ONDC:RET11" ? "Item" : "Product"}
                        </Text>
                      </View>

                      <GotoArrow />
                    </View>
                  </Pressable>
                ))}

                {/* Render Unique Vendors */}
                {uniqueVendors.map((item: VendorItem) => (
                  <Pressable
                    onPress={() => {
                      router.push(`../(tabs)/home/productListing/${item?.id}`);
                      saveSearchTerm(item.descriptor.name);
                    }}
                    style={styles.searchRow}
                    key={item.id}
                  >
                    <ImageComp
                      source={
                        item.descriptor?.symbol && item.descriptor.symbol.length > 0
                          ? item.descriptor.symbol
                          : "https://res.cloudinary.com/doex3braa/image/upload/v1703058217/martpe/food/sihuigqn0bv4ustt4wyi.png"
                      }
                      imageStyle={{
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                      }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "80%",
                      }}
                    >
                      <View>
                        <Text style={styles.productName}>
                          {item.descriptor.name}
                        </Text>
                        <Text
                          style={{
                            color: "gray",
                            marginLeft: 15,
                            fontSize: 12,
                          }}
                        >
                          {item.domain === "ONDC:RET11"
                            ? "Restaurant"
                            : "Store"}
                        </Text>
                      </View>

                      <GotoArrow />
                    </View>
                  </Pressable>
                ))}
              </ScrollView>
            </SafeAreaView>
          ) : (
            <View>
              {!isLoading ? (
                <View
                  style={{
                    alignItems: "flex-start",
                    marginTop: 20,
                    marginHorizontal: 20,
                  }}
                >
                  <Text>No results found</Text>
                </View>
              ) : (
                <ActivityIndicator size="large" color="red" />
              )}
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
    paddingVertical: width * 0.1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    flexDirection: "column",
    paddingVertical: 10,
    backgroundColor: Colors.WHITE_COLOR,
  },
  containerStyle: {
    backgroundColor: Colors.WHITE_COLOR,
    borderWidth: 0,
    borderRadius: 10,
  },
  headerIcon: {
    color: Colors.WHITE_COLOR,
    marginLeft: 15,
    fontSize: 25,
  },
  headerLeftIcon: {
    color: Colors.BLACK_COLOR,
    marginRight: 15,
    fontSize: 25,
    position: "absolute",
    left: 0,
  },
  removeRecentSearch: {},
  searchRow: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.CARD_BORDER_COLOR,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  productName: {
    ...Fonts.boldMontserrat(14),
    color: Colors.BLACK_COLOR,
    marginLeft: 15,
  },
  searchContainer: {
    flexDirection: "row",
    borderColor: "#C7C4C4",
    borderWidth: 1.5,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
  },
  icon: {
    paddingRight: 20,
  },
  recentSearchContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  recentSearchItemsContainer: {
    marginTop: 10,
    rowGap: 10,
    columnGap: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
  },
  recentSearchHeader: {
    marginVertical: 5,
    fontSize: 16,
    // fontWeight: "600",
    // borderColor: "#000",
    // borderWidth: 2,
  },
  recentSearchItem: {
    // Style for each recent search item
    paddingVertical: Dimensions.get("window").width * 0.01,
    paddingHorizontal: 10,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
  },
  recentSearchText: {
    // Style for the recent search text
    fontSize: 13,
    color: "#35374B",
    marginHorizontal: Dimensions.get("window").width * 0.01,
  },
});