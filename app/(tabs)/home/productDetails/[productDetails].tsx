import React, { FC, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useGlobalSearchParams } from "expo-router";

import ProductHeader from "../../../../components/ProductDetails/ProductHeader";
import ProductPricing from "../../../../components/ProductDetails/ProductPricing";
import Services from "../../../../components/ProductDetails/Services";
import SellerDetails from "../../../../components/ProductDetails/Seller";
import AddToCart from "../../../../components/ProductDetails/AddToCart";
import Search from "../../../../components/common/Search";
import ImageCarousel from "../../../../components/ProductDetails/ImageCarousel";
import MoreBySeller from "../../../../components/ProductDetails/MoreBySeller";
import VariantGroup from "../../../../components/ProductDetails/VariantGroup";
import Loader from "../../../../components/common/Loader";
import { getProductById } from "../../../../gql/api/home/productDetails";

interface ID {
  productDetails: string;
}

interface ID {
  productDetails: string;
  [key: string]: string;
}

const ProductDetails: FC = () => {
  const { productDetails } = useGlobalSearchParams<ID>();

  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // will only fetch the data once after rendering
  const payload = {
    getProductByIdId: productDetails,
  };
  useEffect(() => {
    async function productDataFetch() {
      const response = await getProductById(payload);
      console.log(`product details response: `, response);
      const { getProductById: data } = response || {};
      setProductData(data);
      console.log("productDetail:", productDetails);
      setIsLoading(false);
    }
    productDataFetch();
  }, [productDetails]);

  if (isLoading) {
    return <Loader />;
  }

  if (!productData && !isLoading) {
    return <Text style={{ color: "black" }}>No data available</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Search
          placeholder="Search for anything.."
          showBackArrow={true}
          showLocation={false}
        />
      </View>
      <ProductHeader
        itemName={productData?.descriptor?.name}
        category={productData?.domainName}
        storeName={productData?.provider?.descriptor?.name as string}
        productId={productDetails}
        quantity={productData?.quantity?.unitized?.measure?.value}
        unit={productData?.quantity?.unitized?.measure?.unit}
      />
      <ScrollView style={styles.scrollView}>
        <ImageCarousel url={productData?.descriptor?.images} />
        <ProductPricing
          storeName={productData?.provider?.descriptor?.name}
          storeId={productData?.provider?.id}
          description={productData?.descriptor?.short_desc}
          maxPrice={productData?.price?.maximum_value}
          price={productData?.price?.value}
          discount={productData?.price?.offer_percent}
        />

        {productData?.parent_item_id && (
          <VariantGroup
            parentId={productData?.parent_item_id}
            locationId={productData?.location_id}
            bppId={productData?.bpp_id}
            domain={productData?.domain}
            cityCode={productData?.city_code}
            vendorId={productData?.provider?.id}
            initialPrimaryVariant={
              productData?.quantity?.unitized?.measure?.value +
              productData?.quantity?.unitized?.measure?.unit
            }
            // initialSecondaryVariant={productData?.attributes?.size}
            attributes={productData?.attributes}
            variants={productData.variants}
            selectedProductId={productDetails}
          />
        )}

        {/* {productData?.customizable && (
          <CustomizationGroup
            customizable={productData?.customizable}
            customGroup={productData?.custom_group}
            bppId={productData?.bpp_id}
            domain={productData?.domain}
            cityCode={productData?.city_code}
            providerId={productData?.provider_id}
          />
        )} */}

        <Services
          productId={productDetails}
          storeId={productData?.provider?.id}
          returnableDays={10}
          isReturnable
          isCashOnDeliveryAvailable
        />
        {productData?.provider?.catalogs.length > 1 && (
          <MoreBySeller
            originalId={productDetails}
            products={productData?.provider?.catalogs}
            sellerName={""}
            sellerDetails={""}
            sellerSymbol={""}
            sellerContact={""}
          />
        )}

        <SellerDetails
          sellerName={productData?.provider?.descriptor?.name}
          sellerDetails={productData?.provider?.descriptor?.short_desc}
          sellerSymbol={productData?.provider?.descriptor?.symbol}
          sellerContact={
            productData?.meta?.ondc_org_contact_details_consumer_care
          }
        />
      </ScrollView>

      {/* add to cart */}
      <View style={styles.stickyFooter}>
        <AddToCart
          storeId={productData?.provider?.id}
          itemId={productDetails}
          price={productData?.price?.value}
          maxLimit={Math.min(
            productData?.quantity?.maximum?.count,
            productData?.quantity?.available?.count
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Or your preferred background color
  },
  headerContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  header: {
    paddingHorizontal: Dimensions.get("window").width * 0.03,
  },
  scrollView: {
    flex: 1, // Takes up all available space that isn't taken by the header or footer
  },
  stickyFooter: {
    position: "absolute",
    bottom: 5,
    left: 10,
    right: 10,
    // Add any additional styling for your footer
  },
});
