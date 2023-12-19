import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosPrivate } from '@utils/axiosInterceptor';

import { RootState } from './store';

import { ICartData, ICartResponse, IError, IProductCart } from 'types/types';

interface ICart {
  cart: IProductCart[];
  totalPrice: number;
  totalQuantity: number;
  totalProducts: number;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string[] | null;
  successMessage: string | null;
}

const initialState: ICart = {
  cart: [],
  totalPrice: 0,
  status: 'idle',
  errorMessage: null,
  successMessage: null,
  totalQuantity: 0,
  totalProducts: 0,
};

export const getCartItem = createAsyncThunk<
  ICartData,
  void,
  { rejectValue: IError }
>('cart/getCart', async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState() as RootState;
    const response: AxiosResponse<ICartData> = await axiosPrivate.get(
      '/carts',
      {
        headers: {
          Authorization: `Bearer ${token.auth.accessToken}`,
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const postCartItem = createAsyncThunk<
  ICartResponse,
  { product_id: number; quantity: number },
  { rejectValue: IError }
>(
  'cart/postCart',
  async ({ product_id, quantity }, { rejectWithValue, getState }) => {
    try {
      const token = getState() as RootState;
      const response: AxiosResponse<ICartResponse> = await axiosPrivate.post(
        '/carts',
        {
          product_id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token.auth.accessToken}`,
          },
        }
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors: AxiosError<IError> = error;

      return rejectWithValue(errors.response?.data as IError);
    }
  }
);

export const updateCartItem = createAsyncThunk<
  ICartResponse,
  { minus?: number; plus?: number; productId: number },
  { rejectValue: IError }
>(
  'cart/updateCart',
  async ({ minus, plus, productId }, { rejectWithValue, getState }) => {
    try {
      const token = getState() as RootState;
      const response: AxiosResponse<ICartResponse> = await axiosPrivate.put(
        `/carts/${productId}`,
        minus ? { minus } : { plus },
        {
          headers: {
            Authorization: `Bearer ${token.auth.accessToken}`,
          },
        }
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errors: AxiosError<IError> = error;

      return rejectWithValue(errors.response?.data as IError);
    }
  }
);

export const deleteCartItem = createAsyncThunk<
  ICartResponse,
  { productId: number },
  { rejectValue: IError }
>('cart/deleteCart', async ({ productId }, { rejectWithValue, getState }) => {
  try {
    const token = getState() as RootState;
    const response: AxiosResponse<ICartResponse> = await axiosPrivate.delete(
      `/carts/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token.auth.accessToken}`,
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProductCart>) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingItem = state.cart[existingItemIndex];

      if (existingItem) {
        state.cart[existingItemIndex].cart_item.quantity +=
          action.payload.cart_item?.quantity;
      } else {
        state.cart.push(action.payload);
      }

      state.totalPrice +=
        action.payload.price * action.payload.cart_item.quantity;
    },
    decreaseFromCart: (state, action: PayloadAction<number>) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload
      );

      const existingItem = state.cart[existingItemIndex];

      const removedTotalPrice = state.totalPrice - existingItem.price;
      const formattedRemovedTotalPrice = +removedTotalPrice.toFixed(2);

      state.cart[existingItemIndex].cart_item.quantity =
        +existingItem.cart_item.quantity - 1;
      state.totalPrice = formattedRemovedTotalPrice;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item?.id === action.payload
      );

      const existingItem = state.cart[existingItemIndex];

      const removedTotalPrice =
        state.totalPrice -
        existingItem?.price * existingItem.cart_item.quantity;
      const formattedRemovedTotalPrice = +removedTotalPrice.toFixed(2);

      state.cart = state.cart.filter((item) => item?.id !== action.payload);
      state.totalPrice = formattedRemovedTotalPrice;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCartItem.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(postCartItem.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.successMessage = action.payload.message;
      })
      .addCase(postCartItem.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });

    builder
      .addCase(updateCartItem.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        // state.cart = action.payload.cart;
        // state.totalPrice = action.payload.totalPrice;
        state.successMessage = action.payload.message;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });

    builder
      .addCase(getCartItem.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.cart = action.payload.cart.products;
        state.totalPrice = action.payload.cart.total_price;
        state.totalQuantity = action.payload.total_quantity;
        state.totalProducts = action.payload.total_products;
      })
      .addCase(getCartItem.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });

    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.successMessage = action.payload.message;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });
  },
});

const { actions, reducer } = cartSlice;

export const { addToCart, decreaseFromCart, removeFromCart } = actions;

export default reducer;
