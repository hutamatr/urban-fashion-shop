import React, { useEffect } from "react";

import CartList from "../components/Cart/CartList";
import { useCart } from "../hooks/useStoreContext";
import { formatCurrencyToFixed } from "../utils/formatCurrency";

const Cart = () => {
  const { totalPriceAmount } = useCart();

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart_items"));
    console.log(cartItems);
  }, []);

  return (
    <section className="mb-6 flex min-h-screen flex-col gap-y-4 border-b border-b-dark-brown p-6">
      <div className="flex flex-row items-center justify-between gap-x-4">
        <h1 className="font-noto text-3xl font-medium">Cart</h1>
        {totalPriceAmount !== 0 && (
          <p className="font-semibold">
            Total : <span>Rp. {formatCurrencyToFixed(totalPriceAmount)}</span>
          </p>
        )}
      </div>
      <CartList />
    </section>
  );
};

export default Cart;
