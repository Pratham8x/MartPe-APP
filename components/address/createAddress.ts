// createAddress.ts
import { AddressType, ApiErrorResponseType } from '../../common-types';
import Constants from 'expo-constants';

const BASE_URL = Constants.expoConfig?.extra?.BACKEND_BASE_URL;

export const createAddress = async (
  authToken: string,
  type: 'Home' | 'Work' | 'FriendsAndFamily' | 'Other',
  name: string,
  phone: string,
  gps: { lat: number; lon: number },
  houseNo: string,
  street: string,
  city: string,
  state: string,
  pincode: string,
  building?: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/address`,
      {
        method: 'POST',
        body: JSON.stringify({
          type,
          name,
          phone,
          gps,
          houseNo,
          street,
          city,
          state,
          pincode,
          building
        }),
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      }
    );

    if (!response.ok) {
      console.log('create address failed');
      throw new Error();
    }

    return (await response.json()) as AddressType;
  } catch (error) {
    console.log('Create address error', error);
     return null;
  }
};
