import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit';

import { getCategories, getProduct, getProducts } from '@api/api';

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
    // try {
    const response = await getProducts();
    return response.data;
    // } catch (error) {
    //   if (error instanceof Error) {
    //     return rejectWithValue(error.message);
    //   }
    //   if (error instanceof AxiosError) {
    //     return rejectWithValue(error.response?.data);
    //   }
    //   return rejectWithValue('Failed to fetch products!');
    // }
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (productId: string) => {
    // try {
    const response = await getProduct(productId);
    return response.data;
    // } catch (error) {
    //   if (error instanceof Error) {
    //     return rejectWithValue(error.message);
    //   }
    //   if (error instanceof AxiosError) {
    //     return rejectWithValue(error.response?.data);
    //   }
    //   return rejectWithValue('Failed to fetch product!');
    // }
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await getCategories();
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
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = 'pending';
      state.errorMessage = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.products = action.payload;
      state.successMessage = 'Successfully fetched products!';
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = 'rejected';
      state.errorMessage = 'Failed to get products!';
    });

    builder.addCase(fetchProduct.pending, (state) => {
      state.status = 'pending';
      state.errorMessage = null;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.product = action.payload;
      state.successMessage = 'Successfully fetched product!';
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.status = 'rejected';
      state.errorMessage = 'Failed to get product!';
    });

    builder.addCase(fetchCategories.pending, (state) => {
      state.status = 'pending';
      state.errorMessage = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.categories = action.payload;
      state.successMessage = 'Successfully fetched product!';
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.status = 'rejected';
      state.errorMessage = 'Failed to get product!';
    });
  },
});

export default productSlice.reducer;
