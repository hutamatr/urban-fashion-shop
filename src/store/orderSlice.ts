import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosPrivate } from '@utils/axiosInterceptor';

import { RootState } from './store';

import { IOrder } from 'types/types';

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
  async (products: IOrder, { getState }) => {
    const state = getState() as RootState;
    const response: AxiosResponse<{
      stripeSession: {
        id: string;
      };
    }> = await axiosPrivate.post(
      '/orders',
      { products },
      {
        headers: {
          Authorization: `Bearer ${state.auth?.accessToken}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(paymentOrder.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(paymentOrder.fulfilled, (state, payload) => {
        state.status = 'fulfilled';
        state.response = payload.payload;
        state.successMessage = 'Successfully placed order!';
      })
      .addCase(paymentOrder.rejected, (state) => {
        state.status = 'rejected';
        state.errorMessage = 'Failed to place order!';
      });
  },
});

const { reducer } = orderSlice;

export default reducer;
