import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { postPayment } from '@api/api';

import { INewProductToCart } from 'types/types';

interface IOrderState {
  response: {
    stripeSession: {
      id: string;
    };
  };
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: IOrderState = {
  response: {
    stripeSession: {
      id: '',
    },
  },
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const paymentOrder = createAsyncThunk(
  'order/payment',
  async (products: INewProductToCart[]) => {
    const response = await postPayment(products);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(paymentOrder.pending, (state) => {
      state.status = 'pending';
      state.errorMessage = null;
    });
    builder.addCase(paymentOrder.fulfilled, (state, payload) => {
      state.status = 'fulfilled';
      state.response = payload.payload;
      state.successMessage = 'Successfully placed order!';
    });
    builder.addCase(paymentOrder.rejected, (state) => {
      state.status = 'rejected';
      state.errorMessage = 'Failed to place order!';
    });
  },
});

export default orderSlice.reducer;
