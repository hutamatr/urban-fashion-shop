import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosPrivate, axiosPublic } from '@utils/axiosInterceptor';

import { RootState } from './store';

import {
  IAccount,
  IChangePassword,
  IForgotPassword,
  ILogin,
  IRefreshToken,
  IRegister,
  IUser,
} from 'types/types';

export interface IAuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: IUser | null;
  status: 'pending' | 'fulfilled' | 'rejected' | 'idle';
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password }: IRegister) => {
    const response: AxiosResponse<IAccount> = await axiosPublic.post(
      '/auth/local/register',
      {
        username,
        email,
        password,
      }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: ILogin) => {
    const response: AxiosResponse<IAccount> = await axiosPublic.post(
      '/auth/local',
      {
        identifier: email,
        password,
      }
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const response: AxiosResponse = await axiosPublic({
    method: 'GET',
    url: '/auth/logout',
    withCredentials: true,
  });
  return response.data;
});

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const response: AxiosResponse<IRefreshToken> = await axiosPublic.post(
      '/token/refresh',
      {
        refreshToken: state.auth.refreshToken,
      }
    );

    return response.data;
  }
);

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
      state.accessToken = action.payload.jwt;
      state.refreshToken = action.payload.refreshToken;
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
        state.isAuthenticated = true;
        state.accessToken = action.payload.jwt;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.successMessage = 'Successfully registered new user!';
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'rejected';
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.errorMessage = 'Failed to register new user!';
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isAuthenticated = true;
        state.accessToken = action.payload.jwt;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.successMessage = 'Successfully logged in!';
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'rejected';
        state.isAuthenticated = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.user = null;
        state.errorMessage = 'Failed to login user!';
      });

    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.jwt;
      state.refreshToken = action.payload.refreshToken;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.errorMessage = null;
      state.successMessage = null;
      state.status = 'idle';
    });
  },
});

const { actions, reducer } = authSlice;

export const { addTokenHandler } = actions;

export default reducer;
