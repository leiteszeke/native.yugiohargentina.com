declare module '*.png';
declare module '*.jpg';

declare module 'react-native-dotenv' {
  export const ENV: 'local' | 'development' | 'production';
  export const IS_DEBUG: boolean;

  export const SENTRY_DSN: string;

  export const API_URL: string;
  export const LANDING_URL: string;
  export const SITE_URL: string;
}
