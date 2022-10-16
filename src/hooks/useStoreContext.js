import { useContext } from "react";

import { CartContext, AuthContext } from "../context/Context";

export const useCart = () => useContext(CartContext);
export const useAuth = () => useContext(AuthContext);
