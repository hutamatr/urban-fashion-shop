import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosPrivate, axiosPublic } from '@utils/axiosInterceptor';

import { RootState } from './store';

import { IAccount, ILogin, IRefreshToken, IRegister, IUser } from 'types/types';

export interface IAuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: IUser | null;
  status: 'pending' | 'fulfilled' | 'rejected' | 'idle';
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  accessToken: null,
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

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const response: AxiosResponse<IRefreshToken> = await axiosPrivate.post(
      '/token/refresh',
      {
        refreshToken: state.auth.accessToken,
      },
      {
        headers: {
          Authorization: `Bearer ${state.auth.accessToken}`,
        },
      }
    );
    const newUser: IAccount = {
      user: {
        ...(state.auth.user as IUser),
      },
      jwt: response.data?.jwt,
    };
    return newUser;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutHandler: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
      state.errorMessage = null;
      state.successMessage = null;
      state.status = 'idle';
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
        state.user = action.payload.user;
        state.successMessage = 'Successfully registered new user!';
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = 'rejected';
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
        state.errorMessage = 'Failed to register new user!';
      })

      .addCase(loginUser.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.isAuthenticated = true;
        state.accessToken = action.payload.jwt;
        state.user = action.payload.user;
        state.successMessage = 'Successfully logged in!';
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'rejected';
        state.isAuthenticated = false;
        state.accessToken = null;
        state.user = null;
        state.errorMessage = 'Failed to login user!';
      })

      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.accessToken = action.payload.jwt;
        state.user = action.payload.user as IAuthState['user'];
      });
  },
});

const { actions, reducer } = authSlice;

export const { logoutHandler } = actions;

export default reducer;
