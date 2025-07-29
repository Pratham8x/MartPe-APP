import { ApiErrorResponseType } from "../../common-types";
import { SearchProductsResponseType } from "./search-products-type";

export const searchProducts = async (input: {
  lat: number;
  lon: number;
  pincode: string;
  query: string;
  domain?: string;
  page?: number;
  category?: string;
  size?: number;
  quicksearch?: string;
}) => {
  console.log("page ---->", input.page);
  console.log(
    "---->",
    `${process.env.BACKEND_BASE_URL}/search/products?query=${input.query}&lat=${
      input.lat
    }&lon=${input.lon}&pincode=${input.pincode}${
      input.domain ? `&domain=${input.domain?.replace("ONDC:", "")}` : ""
    }${input.page ? `&page=${input.page}` : ""}${
      input.category ? `&category=${input.category}` : ""
    }${input.size ? `&size=${input.size}` : ""}${
      input.quicksearch ? `&quicksearch=${input.quicksearch}` : ""
    }`
  );

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}/search/products?query=${
        input.query
      }&lat=${input.lat}&lon=${input.lon}&pincode=${input.pincode}${
        input.domain ? `&domain=${input.domain?.replace("ONDC:", "")}` : ""
      }${input.page ? `&page=${input.page}` : ""}${
        input.category ? `&category=${input.category}` : ""
      }${input.size ? `&size=${input.size}` : ""}${
        input.quicksearch ? `&quicksearch=${input.quicksearch}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(res);

    if (!res.ok) {
      console.log("search products failed");
      throw new Error();
    }

    return (await res.json()) as SearchProductsResponseType;
  } catch (error) {
    console.log("Search products error ", error);
    return null;
  }
};
