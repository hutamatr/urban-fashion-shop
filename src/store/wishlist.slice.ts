import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { axiosPrivate } from '@utils/axiosInterceptor';

interface IWishListState {
  wishlists: IWishlist[];
  wishlist: IWishlist | null;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string[] | null;
  successMessage: string | null;
}

const initialState: IWishListState = {
  wishlists: [],
  wishlist: null,
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const postWishlist = createAsyncThunk<
  IWishlistResponse,
  IWishlistPost,
  { rejectValue: IError }
>('wishlist/postWishlist', async ({ product_id }, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IWishlistResponse> = await axiosPrivate.post(
      '/wishlists',
      {
        product_id,
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const getWishlists = createAsyncThunk<
  IWishlistData,
  void,
  { rejectValue: IError }
>('wishlist/getWishlists', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IWishlistData> =
      await axiosPrivate.get(`/wishlists`);

    return response.data;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const getWishlist = createAsyncThunk<
  IWishlist,
  number,
  { rejectValue: IError }
>('wishlist/getWishlist', async (productId, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IWishlist> = await axiosPrivate.get(
      `/wishlists/${productId}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const deleteWishlist = createAsyncThunk<
  IWishlistResponse,
  number,
  { rejectValue: IError }
>('wishlist/deleteWishlist', async (productId, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<IWishlistResponse> =
      await axiosPrivate.delete(`/wishlists/${productId}`);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errors: AxiosError<IError> = error;

    return rejectWithValue(errors.response?.data as IError);
  }
});

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postWishlist.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(postWishlist.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.successMessage = action.payload.message;
        state.wishlist = action.payload.wishlist as IWishlist;
      })
      .addCase(postWishlist.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });

    builder
      .addCase(getWishlists.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(getWishlists.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.wishlists = action.payload.wishlists;
      })
      .addCase(getWishlists.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });

    builder
      .addCase(getWishlist.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.wishlist = action.payload;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });

    builder
      .addCase(deleteWishlist.pending, (state) => {
        state.status = 'pending';
        state.errorMessage = null;
      })
      .addCase(deleteWishlist.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.wishlists = state.wishlists.filter(
          (item) => item.product_id !== action.meta.arg
        );
        state.wishlist = null;
        state.successMessage = action.payload.message;
      })
      .addCase(deleteWishlist.rejected, (state, action) => {
        state.status = 'rejected';
        state.errorMessage = action.payload?.message as string[];
      });
  },
});

const { reducer } = wishlistSlice;

// export const { removeWishlist, addWishlist } = actions;

export default reducer;
