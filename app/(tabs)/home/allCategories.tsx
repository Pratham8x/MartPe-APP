import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import {
  personalCareCategoryData,
  electronicsCategoryData,
  foodCategoryData,
  groceriesCategoryData,
  homeAndDecorCategoryData,
  fashionCategoryData,
  getCategoryColor,
} from "../../../constants/categories";
import { router, useLocalSearchParams } from "expo-router";
import ImageComp from "../../../components/common/ImageComp";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BackArrow } from "../../../constants/icons/tabIcons";
import { widthPercentageToDP } from "react-native-responsive-screen";

const AllCategories = () => {
  const { category } = useLocalSearchParams();

  let categoryColor;
  if (Array.isArray(category)) {
    // If category is an array, handle it here. For example, you might take the first element:
    categoryColor = getCategoryColor(category[0]);
  } else {
    // If category is a string, you can pass it directly:
    categoryColor = getCategoryColor(category);
  }

  const header = (title: string) => (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "flex-start", // Align items to the start
        paddingVertical: 10,
        paddingHorizontal: 10, // Add padding horizontally
      }}
    >
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ zIndex: 10, padding: 10, marginLeft: 15 }}
      >
        <BackArrow />
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            position: "absolute",
            zIndex: -1,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );

  const displayCategoriesData = (
    categoryData: any,
    categoryColor: string,
    domain: string
  ) => {
    return (
      categoryData && (
        <ScrollView
          style={{
            backgroundColor: "#fff",
          }}
          contentContainerStyle={{
            justifyContent: "space-between",
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: Dimensions.get("screen").width * 0.03,
            paddingBottom: Dimensions.get("screen").width * 0.25,
          }}
        >
          {categoryData.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                const searchParams = {
                  search: item?.name,
                };
                if (domain && domain !== "") {
                  searchParams["domainData"] = domain;
                }
                router.push({
                  pathname: "/(tabs)/home/result/[search]",
                  params: searchParams,
                });
              }}
              key={index}
              style={{
                flexDirection: "column",
                width: Dimensions.get("screen").width * 0.25,
                marginVertical: 10,
              }}
            >
              <View
                style={{
                  marginHorizontal: Dimensions.get("screen").width * 0.03,
                  marginTop: Dimensions.get("screen").width * 0.05,
                  marginBottom: Dimensions.get("screen").width * 0.01,
                  borderRadius: 10,

                  // shadowColor: "#515151",
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 7,
                  // },
                  // shadowOpacity: 0.41,
                  // shadowRadius: 9.11,
                  // paddingHorizontal: 10,
                  // paddingVertical: 10,
                  // elevation: 2,

                  alignItems: "center",
                }}
              >
                <ImageComp
                  source={{
                    uri: item.image,
                  }}
                  imageStyle={{
                    minHeight: Dimensions.get("screen").width * 0.3,
                    // aspectRatio: 1,
                    width: Dimensions.get("screen").width * 0.3,
                  }}
                  resizeMode="contain"
                />
              </View>
              <Text
                style={{
                  color: "#3D3B40",
                  textAlign: "center",
                  flexShrink: 1,

                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )
    );
  };

  let title = "All Categories";
  let categoryData = [];
  let domain = "";

  switch (category) {
    case "personalCare":
      title = "All Personal Care Categories";
      categoryData = personalCareCategoryData;
      domain = "ONDC:RET13";
      break;
    case "electronics":
      title = "All Electronics Categories";
      categoryData = electronicsCategoryData;
      domain = "ONDC:RET14";
      break;
    case "food":
      title = "All Food Categories";
      categoryData = foodCategoryData;
      domain = "ONDC:RET11";
      break;
    case "groceries":
      title = "All Grocery Categories";
      categoryData = groceriesCategoryData;
      domain = "ONDC:RET10";
      break;
    case "homeAndDecor":
      title = "All Home & Decor Categories";
      categoryData = homeAndDecorCategoryData;
      domain = "ONDC:RET16";
      break;
    case "fashion":
      title = "All Fashion Categories";
      categoryData = fashionCategoryData;
      domain = "ONDC:RET12";
      break;
    default:
      title = "All Categories";
      categoryData = [];
      domain = "";
  }

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: "#fff",
        minHeight: "100%",
      }}
    >
      {header(title)}
      {/* all categories */}
      {displayCategoriesData(categoryData, categoryColor, domain)}
    </View>
  );
};

export default AllCategories;
