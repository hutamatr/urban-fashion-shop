import { useContext } from "react";

import CartContext from "../store/CartContext";

const useCartContext = () => {
  return useContext(CartContext);
};

export default useCartContext;
