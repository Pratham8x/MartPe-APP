import { AddressType } from '../../common-types';
import Constants from 'expo-constants';


const BASE_URL = Constants.expoConfig?.extra?.BACKEND_BASE_URL;

export const fetchAddresses = async (authToken: string) => {
  try {
    const res = await fetch(`${BASE_URL}/users/address`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-cache'
    });

    if (!res.ok) {
      console.log('fetch addresses failed');
      throw new Error();
    }

    return (await res.json()) as AddressType[];
  } catch (error) {
    console.log('Fetch addresses error ', error);
    return null;
  }
};
