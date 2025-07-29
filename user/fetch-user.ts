import { FetchUserType } from './fetch-user-type';

export const fetchUser = async (authToken: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_BASE_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (res.status !== 200) {
      console.log('fetch user failed');
      const data = await res.json();
      return { status: res.status, data };
    }

    const data = (await res.json()) as FetchUserType;
    return { status: 200, data };
  } catch (error) {
    console.log('Fetch user error ', error);
    return { status: 500, data: { error: { message: 'fetch user failed' } } };
  }
};
