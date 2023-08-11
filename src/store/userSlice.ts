import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { axiosPrivate } from '@utils/axiosInterceptor';

import { RootState } from './store';

import { IUser } from 'types/types';

export interface IUserState {
  user: IUser | null;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: IUserState = {
  user: null,
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const response: AxiosResponse<IUser> = await axiosPrivate.get('/users/me', {
      headers: {
        Authorization: `Bearer ${state.auth.accessToken}`,
      },
    });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.user = action.payload;
        state.successMessage = 'Successfully fetched user!';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'rejected';
        state.user = null;
        state.errorMessage = 'Failed to get user!';
      });
  },
});

const { reducer } = userSlice;

export default reducer;
