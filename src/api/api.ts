// import { AxiosResponse, GenericAbortSignal } from 'axios';

// import { axiosPrivate, axiosPublic } from '@utils/axiosInterceptor';

// import {
//   ICategoriesData,
//   INewProductToCart,
//   IProductData,
//   IProductsData,
// } from 'types/types';

// export async function register(
//   { username, email, password }: IRegister,
//   signal?: GenericAbortSignal | undefined
// ) {
//   const res: AxiosResponse<IUser> = await axiosPublic.post(
//     '/auth/local/register',
//     {
//       username,
//       email,
//       password,
//     },
//     {
//       signal,
//     }
//   );

//   return res;
// }

// export async function login(
//   { email, password }: ILogin,
//   signal?: GenericAbortSignal | undefined
// ) {
//   const res: AxiosResponse<IUser> = await axiosPublic.post(
//     '/auth/local',
//     {
//       identifier: email,
//       password,
//     },
//     {
//       signal,
//     }
//   );

//   return res;
// }

// export async function refresh(token: string) {
//   const res: AxiosResponse<IRefreshToken> = await axiosPublic.post(
//     '/token/refresh',
//     {
//       refreshToken: token,
//     }
//   );

//   return res;
// }

// export async function getProducts(signal?: GenericAbortSignal | undefined) {
//   const res: AxiosResponse<IProductsData> = await axiosPublic.get(
//     '/products?populate=*',
//     {
//       signal,
//     }
//   );
//   return res;
// }

// export async function getProduct(
//   productId: string,
//   signal?: GenericAbortSignal | undefined
// ) {
//   const res: AxiosResponse<IProductData> = await axiosPublic.get(
//     `/products/${productId}?populate=*`,
//     {
//       signal,
//     }
//   );
//   return res;
// }

// export async function getCategories(signal?: GenericAbortSignal | undefined) {
//   const res: AxiosResponse<ICategoriesData> = await axiosPublic.get(
//     '/categories',
//     {
//       signal,
//     }
//   );
//   return res;
// }

// export async function postPayment(
//   products: INewProductToCart[],
//   accessToken: string,
//   signal?: GenericAbortSignal | undefined
// ) {
//   const res: AxiosResponse<{
//     stripeSession: {
//       id: string;
//     };
//   }> = await axiosPrivate.post(
//     '/orders',
//     { products },
//     {
//       signal,
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );
//   return res;
// }
