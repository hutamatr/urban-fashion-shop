import axios from 'axios';

import { refreshToken } from '@store/authSlice';
import { store } from '@store/store';

import { URL } from './constant';

const axiosPublic = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

const axiosPrivate = axios.create({
  baseURL: URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
  withCredentials: true,
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
      error.response.data.message[0] === 'jwt expired' &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true;
      const newAccessToken = await store.dispatch(refreshToken()).unwrap();
      prevRequest.headers['Authorization'] =
        `Bearer ${newAccessToken?.access_token}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);

export { axiosPrivate, axiosPublic };
