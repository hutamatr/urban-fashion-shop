import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { INewProductToCart } from 'types/types';

interface ICart {
  cart: INewProductToCart[];
  totalPrice: number;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  errorMessage: string | null;
  successMessage: string | null;
}

const initialState: ICart = {
  cart: [],
  totalPrice: 0,
  status: 'idle',
  errorMessage: null,
  successMessage: null,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<INewProductToCart>) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product_id === action.payload.product_id
      );

      const existingItem = state.cart[existingItemIndex];

      if (existingItem) {
        state.cart[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      state.totalPrice += +action.payload.price * action.payload.quantity;
    },
    decreaseFromCart: (state, action: PayloadAction<number>) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product_id === action.payload
      );

      const existingItem = state.cart[existingItemIndex];

      const removedTotalPrice = state.totalPrice - +existingItem.price;
      const formattedRemovedTotalPrice = +removedTotalPrice.toFixed(2);

      state.cart[existingItemIndex].quantity = +existingItem.quantity - 1;
      state.totalPrice = formattedRemovedTotalPrice;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.product_id === action.payload
      );

      const existingItem = state.cart[existingItemIndex];

      const removedTotalPrice =
        state.totalPrice - +existingItem.price * existingItem.quantity;
      const formattedRemovedTotalPrice = +removedTotalPrice.toFixed(2);

      state.cart = state.cart.filter(
        (item) => item.product_id !== action.payload
      );
      state.totalPrice = formattedRemovedTotalPrice;
    },
  },
});

export const { addToCart, decreaseFromCart, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
