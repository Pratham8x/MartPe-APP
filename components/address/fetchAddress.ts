import { AddressType } from '../../common-types';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BACKEND_BASE_URL;

export const fetchAddressAction = async (
  authToken: string,
  addressId: string
): Promise<AddressType | null> => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/address?addressId=${addressId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      }
    );

    if (!response.ok) {
      console.log('fetch address failed');
      throw new Error();
    }

    const data = await response.json();
    return data as AddressType; // ✅ Adjust if nested
  } catch (error) {
    console.log('fetch address error:', error);
    return null;
  }
};
