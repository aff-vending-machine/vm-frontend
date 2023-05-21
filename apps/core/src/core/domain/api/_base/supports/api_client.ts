import axios, { AxiosInstance } from 'axios';
import { memoizedRefreshToken } from './refresh_token';
import { LOCAL_ACCESS_TOKEN } from '~/utils/constants';
import { getConfig } from '~/config/config';


export const Client = (() => {
  let paivateClient: AxiosInstance;
  let publicClient: AxiosInstance;

  const getPrivate = () => {
    const config = getConfig();
    if (paivateClient == null) {
      paivateClient = axios.create({
        baseURL: config.apiUrl,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      paivateClient.interceptors.request.use(
        async config => {
          const accessToken = localStorage.getItem(LOCAL_ACCESS_TOKEN);

          if (accessToken) {
            config.headers.set('authorization', `Bearer ${accessToken}`, true);
          }

          return config;
        },
        error => Promise.reject(error),
      );

      paivateClient.interceptors.response.use(
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
    }

    paivateClient.defaults.baseURL = config.apiUrl
    return paivateClient;
  }

  const getPublic = () => {
    const config = getConfig();
    if (publicClient == null) {
      publicClient = axios.create({
        baseURL: config.apiUrl,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
    }

    publicClient.defaults.baseURL = config.apiUrl
    return publicClient;
  }

  return { getPrivate, getPublic };
})();
