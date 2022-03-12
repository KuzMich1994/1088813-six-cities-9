import axios, {AxiosInstance, AxiosProxyConfig, AxiosRequestConfig} from 'axios';
import {BASE_URL, REQUEST_TIMEOUT} from '../const';
import {getToken} from './token';


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  )

  return api;
};
