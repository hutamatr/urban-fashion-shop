import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosPublic } from '@utils/axiosInterceptor';

import {
  ICategoriesData,
  IError,
  IProductData,
  IProductsData,
  IProductsMeta,
} from 'types/types';

interface IProductsState {
  products: IProductsData | null;
  categories: ICategoriesData | null;
  product: IProductData | null;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string[] | null;
  successMessage: string | null;
}

const initialState: IProductsState = {
  products: null,
  categories: null,
  product: null,
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const fetchAllProducts = createAsyncThunk<
  IProductsData,
  IProductsMeta,
  { rejectValue: IError }
>('products/fetchProducts', async ({ skip, limit }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IProductsData> = await axiosPublic.get(
      `/products?skip=${skip}?limit=${limit}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const fetchProduct = createAsyncThunk<
  IProductData,
  number,
  { rejectValue: IError }
>('products/fetchProduct', async (productId, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IProductData> = await axiosPublic.get(
      `/products/${productId}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const fetchCategories = createAsyncThunk<
  ICategoriesData,
  void,
  { rejectValue: IError }
>('products/fetchCategories', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ICategoriesData> =
      await axiosPublic.get('/categories');
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const fetchProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (
    {
      productId,
      skip,
      limit,
    }: { productId?: number; skip: number; limit: number },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const promises = () => {
        if (productId) {
          return [
            dispatch(fetchAllProducts({ skip, limit })),
            dispatch(fetchCategories()),
            dispatch(fetchProduct(productId)),
          ];
        } else {
          return [
            dispatch(fetchAllProducts({ skip, limit })),
            dispatch(fetchCategories()),
          ];
        }
      };

      const actions = await Promise.all(promises());
      return actions.map(unwrapResult);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors: AxiosError<IError> = error;

      return rejectWithValue(errors.response?.data as IError);
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.products = action.payload;
        state.successMessage = 'Successfully get products!';
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      })

      .addCase(fetchProduct.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.product = action.payload;
        state.successMessage = 'Successfully get product!';
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      })

      .addCase(fetchCategories.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.categories = action.payload;
        state.successMessage = 'Successfully get categories!';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });
  },
});

const { reducer } = productSlice;

export default reducer;
