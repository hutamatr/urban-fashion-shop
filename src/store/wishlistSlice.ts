import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { IProduct } from 'types/types';

interface IWishListState {
  wishlist: IProduct[];
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: IWishListState = {
  wishlist: [],
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlist: (state, action: PayloadAction<IProduct>) => {
      const existingItemIndex = state.wishlist.findIndex(
        (item) => item.id === action.payload.id
      );

      const existingItem = state.wishlist[existingItemIndex];

      if (existingItem) {
        state.errorMessage = `${existingItem.attributes.name} already in wishlist`;
      } else {
        state.wishlist = [...state.wishlist, action?.payload];
        state.successMessage = `${action?.payload.attributes.name} added to wishlist`;
      }
    },
    removeWishlist: (state, action: PayloadAction<number>) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      state.successMessage = `Successfully removed item from wishlist`;
    },
  },
});

export const { addWishlist, removeWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
