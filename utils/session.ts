import { SessionOptions } from 'iron-session';

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: 'hidev_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
};

export const defaultSessionData = {
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
};
