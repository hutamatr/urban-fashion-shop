import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosPrivate } from '@utils/axiosInterceptor';

import { RootState } from './store';

export interface IUserState {
  user: IUser | null;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string[] | null;
  successMessage: string | null;
}

const initialState: IUserState = {
  user: null,
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const fetchUser = createAsyncThunk<
  IUserResponse,
  void,
  { rejectValue: IError }
>('user/fetchUser', async (_, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const response: AxiosResponse<IUserResponse> = await axiosPrivate.get(
      `/users/${state.auth.userId}`,
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

export const updateUserDetail = createAsyncThunk<
  IUserResponse,
  IUserUpdate,
  { rejectValue: IError }
>('user/updateUserDetail', async (userData, { getState, rejectWithValue }) => {
  try {
    const state = getState() as RootState;
    const response: AxiosResponse<IUserResponse> = await axiosPrivate.put(
      `/users/${state.user.user?.id}`,
      userData,
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
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.user = null;
        state.errorMessage = action.payload?.message as string[];
      });

    builder
      .addCase(updateUserDetail.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addCase(updateUserDetail.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
      })
      .addCase(updateUserDetail.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });
  },
});

const { reducer } = userSlice;

export default reducer;
