import { API_BASE_URL, SOCKET_URL, API_TIMEOUT } from '../constants/api.constants';
import { APP_NAME, APP_DESCRIPTION } from '../constants/app.constants';

export const appConfig = {
  name: APP_NAME,
  description: APP_DESCRIPTION,
  api: {
    baseUrl: API_BASE_URL,
    timeout: API_TIMEOUT,
  },
  socket: {
    url: SOCKET_URL,
  },
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

export type AppConfig = typeof appConfig;
export default appConfig;
