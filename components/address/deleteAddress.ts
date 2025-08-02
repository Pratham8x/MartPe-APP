
// deleteAddress.ts
import { AddressType, ApiErrorResponseType } from '../../common-types';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BACKEND_BASE_URL;

// Fixed deleteAddress.ts
export const deleteAddress = async (authToken: string, addressId: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/address`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          addressId // This was completely missing!
        }),
        cache: 'no-cache'
      }
    );

    if (!response.ok) {
      console.log('delete address failed', response.status);
      const errorText = await response.text();
      console.log('Delete error response:', errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.log('Delete address error', error);
    throw error; // Re-throw instead of returning null for better error handling
  }
};