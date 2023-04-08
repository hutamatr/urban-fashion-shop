import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetcherProducts = async () => {
  try {
    const response = await API({ method: 'GET', url: 'products' });
    if (response.status !== 200) {
      throw new Error('Failed get products data');
    }
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const fetcherCategories = async () => {
  try {
    const response = await API({
      method: 'GET',
      url: 'products/categories',
    });
    if (response.status !== 200) {
      throw new Error('Failed get products data');
    }
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const fetcherUser = async () => {
  const userId = JSON.parse(localStorage.getItem('decode'));
  try {
    const response = await API({
      method: 'GET',
      url: `users/${userId?.sub}`,
    });

    if (response.status !== 200) {
      throw new Error('Failed get user data');
    }
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await API({
      method: 'POST',
      url: 'auth/login',
      data: loginData,
    });

    if (response.status !== 200) {
      throw new Error('Failed get user data');
    }
    const data = await response.data;
    return data;
  } catch (error) {
    return error;
  }
};
