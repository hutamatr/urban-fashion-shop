import axios from 'axios';

import { refreshToken } from '@store/authSlice';
import { store } from '@store/store';

export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken;

    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (
      (error?.response?.status === 401 || error?.response?.status === 403) &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true;
      const newAccessToken = await store.dispatch(refreshToken()).unwrap();
      prevRequest.headers['Authorization'] = `Bearer ${newAccessToken?.jwt}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);
