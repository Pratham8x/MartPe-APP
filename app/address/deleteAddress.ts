'use server';

import { cookies } from 'next/headers';

export async function deleteAddressAction(id: string) {
  try {
    const cookieStore = await cookies();
    const at = cookieStore.get('auth-token')?.value;

    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}/users/address?addressId=${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${at}`
        }
      }
    );
    if (!response.ok) {
      throw new Error();
    }
    return { success: true };
  } catch (e) {
    console.log('delete addr action error:', e);
    return { success: false };
  }
}
