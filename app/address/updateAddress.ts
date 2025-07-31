'use server';

import { AddressType } from '@/lib/api/common-types';
import { cookies } from 'next/headers';

export async function updateAddressAction(
  addressId: string,
  type?: 'Home' | 'Work' | 'FriendsAndFamily' | 'Other',
  name?: string,
  phone?: string,
  gps?: { lat: number; lon: number },
  houseNo?: string,
  street?: string,
  city?: string,
  state?: string,
  pincode?: string,
  building?: string
) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth-token')?.value;

    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/users/address?addressId=${addressId}`,
      {
        method: 'PUT',
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
        }
      }
    );
    if (!response.ok) {
      const data = await response.json();
      console.log('data notok:', data);
      throw new Error();
    }
    // const data = (await response.json()) as AddressType;
    return { success: true };
  } catch (e) {
    console.log('update addr action error:', e);
    return { success: false, error: { message: 'update address failed' } };
  }
}
