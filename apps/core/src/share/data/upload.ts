import axios from 'axios';
import { memoizedRefreshToken } from './refreshToken';
import { LOCAL_ACCESS_TOKEN } from '../constants';
import { config } from '../config';

export const uploadClient = axios.create({
  baseURL: config.apiUrl,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'multipart/form-data',
  },
});

uploadClient.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN);

    if (accessToken) {
      config.headers.set('authorization', `Bearer ${accessToken}`, true);
    }

    return config;
  },
  error => Promise.reject(error),
);

uploadClient.interceptors.response.use(
  response => response,
  async error => {
    const config = error?.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const token = await memoizedRefreshToken();

      if (token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${token}`,
        };
      }

      return axios(config);
    }

    return Promise.reject(error);
  },
);
