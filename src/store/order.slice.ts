import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosPrivate } from '@utils/axiosInterceptor';
import { PENDING_PAYMENT } from '@utils/constant';

import { RootState } from './store';

interface IOrderState {
  userOrders: IOrders[];
  productsOrder: IProductOrder[];
  transactionId: string;
  customerFullName: string;
  customerEmail: string;
  paymentMethod: string;
  orderDate: string;
  snapToken: string;
  snapRedirectURL: string;
  orderStatus: 'PENDING_PAYMENT' | 'PAID' | 'CANCELED';
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string[] | null;
  successMessage: string | null;
}

const initialState: IOrderState = {
  userOrders: [],
  productsOrder: [],
  transactionId: '',
  customerFullName: '',
  customerEmail: '',
  paymentMethod: '',
  orderDate: '',
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

export const fetchUserOrders = createAsyncThunk<
  IOrdersResponse,
  void,
  { rejectValue: IError }
>('order/fetchOrders', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const response: AxiosResponse<IOrdersResponse> = await axiosPrivate.get(
      '/transactions/user',
      {
        headers: {
          Authorization: `Bearer ${state.auth.accessToken}`,
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

export const fetchUserOrder = createAsyncThunk<
  IOrderResponse,
  string,
  { rejectValue: IError }
>('order/fetchOrder', async (transactionId, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const response: AxiosResponse<IOrderResponse> = await axiosPrivate.get(
      `/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${state.auth.accessToken}`,
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

export const cancelPayment = createAsyncThunk<
  IOrderResponse,
  { transaction_id: string },
  { rejectValue: IError }
>('order/cancel', async ({ transaction_id }, { rejectWithValue, getState }) => {
  try {
    const state = getState() as RootState;
    const response: AxiosResponse<IOrderResponse> = await axiosPrivate.post(
      '/transactions/cancel',
      {
        transaction_id: transaction_id,
      },
      {
        headers: {
          Authorization: `Bearer ${state.auth.accessToken}`,
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
        state.orderStatus = action.payload.transaction.status;
        state.customerFullName = `${action.payload.transaction.first_name} ${action.payload.transaction.last_name}`;
        state.customerEmail = action.payload.transaction.email;
        state.transactionId = action.payload.transaction.id;
        state.paymentMethod = action.payload.transaction.payment_method;
        state.orderDate = action.payload.transaction.created_at;
        state.snapToken = action.payload.transaction.snap_token;
        state.snapRedirectURL = action.payload.transaction.snap_redirect_url;
        state.productsOrder = action.payload.transaction.products;
        state.successMessage = action.payload.message as string;
      })
      .addCase(paymentOrder.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });

    builder.addCase(fetchUserOrders.pending, (state) => {
      state.status = 'pending';
      state.errorMessage = null;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.userOrders = action.payload.transaction;
    });
    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.status = 'rejected';
      state.errorMessage = action.payload?.message as string[];
    });

    builder.addCase(fetchUserOrder.pending, (state) => {
      state.status = 'pending';
      state.errorMessage = null;
    });
    builder.addCase(fetchUserOrder.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.orderStatus = action.payload.transaction.status;
      state.customerFullName = `${action.payload.transaction.first_name} ${action.payload.transaction.last_name}`;
      state.customerEmail = action.payload.transaction.email;
      state.transactionId = action.payload.transaction.id;
      state.paymentMethod = action.payload.transaction.payment_method;
      state.orderDate = action.payload.transaction.created_at;
      state.snapToken = action.payload.transaction.snap_token;
      state.snapRedirectURL = action.payload.transaction.snap_redirect_url;
      state.productsOrder = action.payload.transaction.products;
      state.successMessage = action.payload.message as string;
    });

    builder.addCase(cancelPayment.pending, (state) => {
      state.status = 'pending';
      state.errorMessage = null;
    });
    builder.addCase(cancelPayment.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.orderStatus = action.payload.transaction.status;
      state.successMessage = action.payload.message as string;
    });
    builder.addCase(cancelPayment.rejected, (state, action) => {
      state.status = 'rejected';
      state.errorMessage = action.payload?.message as string[];
    });
  },
});

const { reducer } = orderSlice;

export default reducer;
