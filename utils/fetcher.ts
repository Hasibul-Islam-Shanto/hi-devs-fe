import env from './env';
import { cookies } from 'next/headers';

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

interface FetchOptions extends Omit<RequestInit, 'method' | 'body'> {
  params?: Record<string, string | number | boolean>;
  isAuthenticated?: boolean;
  token?: string;
}

const buildUrl = (
  url: string,
  params?: Record<string, string | number | boolean>,
) => {
  const fullURL = url.startsWith('http') ? url : `${env.apiBaseUrl}${url}`;
  if (!params) return fullURL;
  const queryString = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)]),
  ).toString();

  return queryString ? `${fullURL}?${queryString}` : fullURL;
};

const getAuthToken = async (isAuthenticated?: boolean, token?: string) => {
  if (token) return token;
  if (isAuthenticated) {
    try {
      const cookieStore = await cookies();
      const authToken = cookieStore.get('authToken')?.value;
      return authToken || null;
    } catch {
      return null;
    }
  }
};

const fetcher = async <T>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  options?: FetchOptions,
): Promise<T> => {
  try {
    const fullURL = buildUrl(url, options?.params);
    const authToken = await getAuthToken(
      options?.isAuthenticated,
      options?.token,
    );
    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...options?.headers,
      },
      ...options,
    };
    if (data && ['POST', 'PATCH', 'DELETE'].includes(method)) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(fullURL, config);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`,
      );
    }
    return (await response.json()) as T;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('An unknown error occurred');
  }
};

export const get = <T>(url: string, options?: FetchOptions) =>
  fetcher<T>('GET', url, undefined, options);
