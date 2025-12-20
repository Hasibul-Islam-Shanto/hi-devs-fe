import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  isPublicRoute,
  isAuthRoute,
  isProtectedRoute,
  isExcludedRoute,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_SIGNIN_REDIRECT,
} from '@/constants/routes';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const isAuthenticated = !!accessToken;

  if (isExcludedRoute(pathname)) {
    return NextResponse.next();
  }

  if (isProtectedRoute(pathname) && !isAuthenticated) {
    const signInUrl = new URL(DEFAULT_SIGNIN_REDIRECT, request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isAuthenticated && isAuthRoute(pathname)) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
