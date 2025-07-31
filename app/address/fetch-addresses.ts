import { AddressType, ApiErrorResponseType } from '../../common-types';

export const fetchAddresses = async (authToken: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users/address`, {
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
