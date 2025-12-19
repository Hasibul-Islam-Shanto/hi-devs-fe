'use server';
import { cookies } from 'next/headers';

export const login = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );

  if (response.ok) {
    const data = await response.json();
    const cookieStore = await cookies();
    cookieStore.set('accessToken', data.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 30, // 30 minutes
    });

    cookieStore.set('refreshToken', data.tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    cookieStore.set('user', JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return data;
  }
  const responseData = await response.json();
  return { success: false, message: responseData.message || 'Login failed' };
};

export const logoutFromServer = async () => {
  const cookieStore = await cookies();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: cookieStore.get('refreshToken')?.value,
      }),
    },
  );

  if (response.ok) {
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
    cookieStore.delete('user');
    return { success: true };
  } else {
    return { success: false, message: 'Logout failed' };
  }
};

export const signup = async (
  name: string,
  username: string,
  email: string,
  password: string,
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
      }),
    },
  );

  if (response.ok) {
    const data = await response.json();
    return { success: true, user: data.user };
  } else {
    const responseData = await response.json();
    return { success: false, message: responseData.message || 'Signup failed' };
  }
};
