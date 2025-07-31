'use server';

// import { AddressType } from '@/lib/api/common-types';
// import { cookies } from 'next/headers';

export async function fetchAddressAction(addressId: string) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth-token')?.value;

    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/users/address?addressId=${addressId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (!response.ok) {
      throw new Error();
    }
    return (await response.json()) as AddressType;
  } catch (e) {
    console.log('create addr action error:', e);
    return null;
  }
}
