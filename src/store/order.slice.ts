import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosPrivate } from '@utils/axiosInterceptor';
import { PENDING_PAYMENT } from '@utils/constant';

import { RootState } from './store';

interface IOrderState {
  productsOrder: IProduct[];
  snapToken: string;
  snapRedirectURL: string;
  orderStatus: 'PENDING_PAYMENT' | 'PAID' | 'CANCELED';
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string[] | null;
  successMessage: string | null;
}

const initialState: IOrderState = {
  productsOrder: [],
  snapToken: '',
  snapRedirectURL: '',
  orderStatus: PENDING_PAYMENT,
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const paymentOrder = createAsyncThunk<
  IOrderResponse,
  IOrder,
  { rejectValue: IError }
>(
  'order/payment',
  async (
    { first_name, last_name, phone_number, city, postal_code, address },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const response: AxiosResponse<IOrderResponse> = await axiosPrivate.post(
        '/transactions',
        {
          first_name,
          last_name,
          phone_number,
          city,
          postal_code,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${state.auth?.accessToken}`,
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

// export const updateStatusPayment = createAsyncThunk<>(
//   'order/updateStatus',
//   () => {
//     try {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       const errors: AxiosError<IError> = error;

//       return rejectWithValue(errors.response?.data as IError);
//     }
//   }
// );

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
      .addCase(paymentOrder.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.orderStatus = action.payload.data.status;
        state.snapToken = action.payload.data.snap_token;
        state.snapRedirectURL = action.payload.data.snap_redirect_url;
        state.productsOrder = action.payload.data.products;
        state.successMessage = action.payload.message;
      })
      .addCase(paymentOrder.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });
  },
});

const { reducer } = orderSlice;

export default reducer;
