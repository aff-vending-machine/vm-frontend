import { config } from './config';
import { privateClient, publicClient, uploadClient } from './data';

export const configURL = (url: string) => {
  if (url == undefined || url == null) {
    return
  }

  config.baseUrl = url;
  config.apiUrl = `${url}/api/v1`;

  privateClient.defaults.baseURL = config.apiUrl;
  publicClient.defaults.baseURL = config.apiUrl;
  uploadClient.defaults.baseURL = config.apiUrl;
};
