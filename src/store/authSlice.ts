import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosPrivate, axiosPublic } from '@utils/axiosInterceptor';

import { RootState } from './store';

import {
  IAccount,
  IChangePassword,
  IError,
  IForgotPassword,
  ILogin,
  IRefreshToken,
  IRegister,
  ISignOut,
} from 'types/types';

export interface IAuthState {
  isAuth: boolean;
  accessToken: string | null;
  status: 'pending' | 'fulfilled' | 'rejected' | 'idle';
  errorMessage: string[] | null;
  successMessage: string | null;
}

const initialState: IAuthState = {
  isAuth: false,
  accessToken: null,
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const registerUser = createAsyncThunk<
  IAccount,
  IRegister,
  { rejectValue: IError }
>(
  'auth/registerUser',
  async ({ email, password, confirmPassword }, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<IAccount> = await axiosPublic.post(
        '/signup',
        {
          email,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
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

export const loginUser = createAsyncThunk<
  IAccount,
  ILogin,
  { rejectValue: IError }
>('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IAccount> = await axiosPublic.post(
      '/signin',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const logoutUser = createAsyncThunk<
  ISignOut,
  void,
  { rejectValue: IError }
>('auth/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ISignOut> = await axiosPublic.post(
      '/signout',
      {},
      { withCredentials: true }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const refreshToken = createAsyncThunk<
  IRefreshToken,
  void,
  { rejectValue: IError }
>('auth/refresh', async (_, { rejectWithValue }) => {
  // const state = getState() as RootState;
  try {
    const response: AxiosResponse<IRefreshToken> = await axiosPublic.get(
      '/refresh',
      {
        withCredentials: true,
      }
    );

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;
    return rejectWithValue(errors.response?.data as IError);
  }
});

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordChanged: IChangePassword, { getState }) => {
    const state = getState() as RootState;
    const response: AxiosResponse<IAccount> = await axiosPrivate.post(
      `/auth/change-password`,
      passwordChanged,
      {
        headers: {
          Authorization: `Bearer ${state.auth.accessToken}`,
        },
      }
    );
    return response.data;
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (userEmail: IForgotPassword) => {
    const response: AxiosResponse = await axiosPublic.post(
      `/auth/forgot-password`,
      userEmail
    );
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addTokenHandler: (state, action: PayloadAction<IRefreshToken>) => {
      state.accessToken = action.payload.access_token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isAuth = true;
        state.accessToken = action.payload.access_token;
        state.successMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.isAuth = false;
        state.accessToken = null;
        state.errorMessage = action.payload?.message as string[];
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isAuth = true;
        state.accessToken = action.payload.access_token;
        state.successMessage = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.isAuth = false;
        state.accessToken = null;
        state.errorMessage = action.payload?.message as string[];
      });

    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.isAuth = true;
      state.accessToken = action.payload.access_token;
    });

    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.isAuth = false;
      state.accessToken = null;
      state.errorMessage = null;
      state.successMessage = action.payload.message;
      state.status = 'idle';
    });
  },
});

const { actions, reducer } = authSlice;

export const { addTokenHandler } = actions;

export default reducer;
