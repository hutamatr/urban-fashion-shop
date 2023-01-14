import { useContext } from "react";

import { CartContext, AuthContext, WishlistContext } from "context/Context";

export const useCart = () => useContext(CartContext),
  useAuth = () => useContext(AuthContext),
  useWish = () => useContext(WishlistContext);
