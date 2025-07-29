// import { ApiErrorResponseType } from "../common-types";
import { FetchCartType } from "./fetch-carts-type";

export const fetchCarts = async (authToken: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/carts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      const data = await res.json();
      console.log("fetch carts notok", res.status, data);
      console.log("fetch carts failed");
      throw new Error();
    }

    return (await res.json()) as FetchCartType[];
  } catch (error) {
    console.log("Fetch carts error ", error);
    return null;
  }
};
