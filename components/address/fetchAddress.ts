// fetchAddress.ts
import { AddressType } from '../../common-types';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BACKEND_BASE_URL;

export const fetchAddress = async (authToken: string): Promise<AddressType[] | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/address`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      }
    );

    if (!response.ok) {
      console.log('fetch address failed');
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    console.log('Fetch address error', error);
    return null;
  }
};