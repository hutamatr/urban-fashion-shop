import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createAuthSlice } from './AuthSlice';
import { createCartSlice } from './CartSlice';
import { createWishListSlice } from './WishlistSlice';
import { createProductSlice } from './ProductSlice';
import { createUserSlice } from './UserSlice';

export const useStore = create(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createCartSlice(...a),
      ...createWishListSlice(...a),
      ...createProductSlice(...a),
      ...createUserSlice(...a),
    }),
    {
      name: 'shop-storage',
    }
  )
);
