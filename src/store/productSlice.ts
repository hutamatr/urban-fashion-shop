import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosPublic } from '@utils/axiosInterceptor';

import { ICategoriesData, IProductData, IProductsData } from 'types/types';

interface IProductsState {
  products: IProductsData | null;
  categories: ICategoriesData | null;
  product: IProductData | null;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string | null;
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

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response: AxiosResponse<IProductsData> = await axiosPublic.get(
      '/products?populate=*'
    );
    return response.data;
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId: string) => {
    const response: AxiosResponse<IProductData> = await axiosPublic.get(
      `/products/${productId}?populate=*`
    );
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response: AxiosResponse<ICategoriesData> = await axiosPublic.get(
      '/categories'
    );
    return response.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (productId: string | null, { dispatch }) => {
    const promises = () => {
      if (productId) {
        return [
          dispatch(fetchProducts()),
          dispatch(fetchCategories()),
          dispatch(fetchProduct(productId)),
        ];
      } else {
        return [dispatch(fetchProducts()), dispatch(fetchCategories())];
      }
    };

    const actions = await Promise.all(promises());
    return actions.map(unwrapResult);
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.products = action.payload;
        state.successMessage = 'Successfully fetched products!';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'rejected';
        state.errorMessage = 'Failed to get products!';
      })

      .addCase(fetchProduct.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.product = action.payload;
        state.successMessage = 'Successfully fetched product!';
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.status = 'rejected';
        state.errorMessage = 'Failed to get product!';
      })

      .addCase(fetchCategories.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.categories = action.payload;
        state.successMessage = 'Successfully fetched product!';
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = 'rejected';
        state.errorMessage = 'Failed to get product!';
      });
  },
});

const { reducer } = productSlice;

export default reducer;
