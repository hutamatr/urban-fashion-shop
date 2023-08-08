import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { login, register } from '@api/api';

import { ILogin, IRegister, IUser } from 'types/types';

export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  status: 'pending' | 'fulfilled' | 'rejected' | 'idle';
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password }: IRegister, { rejectWithValue }) => {
    try {
      const response = await register({ username, email, password });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue('Failed to register!');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: ILogin, { rejectWithValue }) => {
    try {
      const response = await login({ email, password });
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue('Failed to login!');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutHandler: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'pending';
      state.errorMessage = null;
      state.successMessage = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.isAuthenticated = !!action.payload.data?.user?.email;
      state.user = action.payload.data;
      state.successMessage = 'Successfully registered new user!';
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.status = 'rejected';
      state.isAuthenticated = false;
      state.user = null;
      state.errorMessage = 'Failed to register new user!';
    });

    builder.addCase(loginUser.pending, (state) => {
      state.status = 'pending';
      state.errorMessage = null;
      state.successMessage = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.isAuthenticated = !!action.payload.data?.user?.email;
      state.user = action.payload.data;
      state.successMessage = 'Successfully logged in!';
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.status = 'rejected';
      state.isAuthenticated = false;
      state.user = null;
      state.errorMessage = 'Failed to login user!';
    });
  },
});

export const { logoutHandler } = authSlice.actions;

export default authSlice.reducer;
