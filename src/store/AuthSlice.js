import jwt from 'jwt-decode';

import { loginUser } from 'api/api';

const calculateAutoLogoutTime = (expireDate) => {
  const currentTimeInMilliseconds = new Date().getTime();
  const expireTimeInMilliseconds = new Date(expireDate).getTime();

  const remainingAutoLogoutTime =
    expireTimeInMilliseconds - currentTimeInMilliseconds;

  return remainingAutoLogoutTime;
};

const getStorageItems = () => {
  const authToken = localStorage.getItem('auth_token');
  const expireToken = localStorage.getItem('exp_token');

  const remainingTime = calculateAutoLogoutTime(expireToken);

  if (remainingTime <= 5000) {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('exp_token');
    return null;
  }
  return {
    authToken,
    remainingTime,
  };
};

const storage = getStorageItems();
let localToken;

if (storage) localToken = storage.authToken;

export const createAuthSlice = (set) => ({
  isAuth: localToken ? !!localToken : null,
  auth_token: localToken ? localToken : null,
  isLoadingAuth: false,
  isErrorAuth: false,
  errorAuth: null,
  unAuthHandler: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('exp_token');
    localStorage.removeItem('decode');
    set({ isAuth: null, auth_token: null });
  },
  authHandler: async (loginData) => {
    try {
      set({ isLoading: true });
      const productsData = await loginUser(loginData);
      localStorage.setItem('auth_token', productsData.token);
      localStorage.setItem('decode', JSON.stringify(jwt(productsData.token)));
      set({
        isLoading: false,
        isAuth: !!productsData.token,
        auth_token: productsData.token,
      });
    } catch (error) {
      set({ isError: true, isLoading: false, error });
    }
  },
});
