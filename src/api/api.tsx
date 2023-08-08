import axios, { AxiosResponse, GenericAbortSignal } from 'axios';

import {
  ICategoriesData,
  ILogin,
  INewProductToCart,
  IProductData,
  IProductsData,
  IRegister,
  IUser,
} from 'types/types';

export const url = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Authorization: `bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
});

export async function register(
  { username, email, password }: IRegister,
  signal?: GenericAbortSignal | undefined
) {
  const res: AxiosResponse<IUser> = await url.post(
    '/auth/local/register',
    {
      username,
      email,
      password,
    },
    {
      signal,
    }
  );

  return res;
}

export async function login(
  { email, password }: ILogin,
  signal?: GenericAbortSignal | undefined
) {
  const res: AxiosResponse<IUser> = await url.post(
    '/auth/local',
    {
      password,
      identifier: email,
    },
    {
      signal,
    }
  );

  return res;
}

export async function getProducts(signal?: GenericAbortSignal | undefined) {
  const res: AxiosResponse<IProductsData> = await url.get(
    '/products?populate=*',
    {
      signal,
    }
  );
  return res;
}

export async function getProduct(
  productId: string,
  signal?: GenericAbortSignal | undefined
) {
  const res: AxiosResponse<IProductData> = await url.get(
    `/products/${productId}?populate=*`,
    {
      signal,
    }
  );
  return res;
}

export async function getCategories(signal?: GenericAbortSignal | undefined) {
  const res: AxiosResponse<ICategoriesData> = await url.get('/categories', {
    signal,
  });
  return res;
}

export async function postPayment(
  products: INewProductToCart[],
  signal?: GenericAbortSignal | undefined
) {
  const res: AxiosResponse<{
    stripeSession: {
      id: string;
    };
  }> = await url.post(
    '/orders',
    { products },
    {
      signal,
    }
  );
  return res;
}
