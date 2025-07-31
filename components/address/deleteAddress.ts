
// deleteAddress.ts
import { AddressType, ApiErrorResponseType } from '../../common-types';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BACKEND_BASE_URL;

export const deleteAddress = async (authToken: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/address`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      }
    );

    if (!response.ok) {
      console.log('delete address failed');
      throw new Error();
    }

    return await response.json();
  } catch (error) {
    console.log('Delete address error', error);
    return null;
  }
};
