import { AuthContext, CartContext, WishlistContext } from 'context/Context';
import { useContext } from 'react';

export const useCart = () => useContext(CartContext),
  useAuth = () => useContext(AuthContext),
  useWish = () => useContext(WishlistContext);
