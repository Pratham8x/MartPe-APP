import { ApiErrorResponseType } from '../common-types';
import { SearchStoresResponseType } from './search-stores-type';

export const searchStores = async (input: {
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
  console.log('page ---->', input.page);
  console.log(
    '---->',
    `${process.env.BACKEND_BASE_URL}/search/stores?query=${input.query}&lat=${
      input.lat
    }&lon=${input.lon}&pincode=${input.pincode}${
      input.domain ? `&domain=${input.domain?.replace('ONDC:', '')}` : ''
    }${input.page ? `&page=${input.page}` : ''}${
      input.category ? `&category=${input.category}` : ''
    }${input.size ? `&size=${input.size}` : ''}${
      input.quicksearch ? `&quicksearch=${input.quicksearch}` : ''
    }`
  );

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}/search/stores?query=${input.query}&lat=${
        input.lat
      }&lon=${input.lon}&pincode=${input.pincode}${
        input.domain ? `&domain=${input.domain?.replace('ONDC:', '')}` : ''
      }${input.page ? `&page=${input.page}` : ''}${
        input.category ? `&category=${input.category}` : ''
      }${input.size ? `&size=${input.size}` : ''}${
        input.quicksearch ? `&quicksearch=${input.quicksearch}` : ''
      }`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!res.ok) {
      console.log('search stores failed');
      throw new Error();
    }

    return (await res.json()) as SearchStoresResponseType;
  } catch (error) {
    console.log('Search stores error ', error);
    return null;
  }
};
