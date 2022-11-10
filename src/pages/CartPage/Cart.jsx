import React from "react";

import CartList from "../../components/Cart/CartList";
import ShoppingSummary from "../../components/Cart/ShoppingSummary";
import { useCart } from "../../hooks/useStoreContext";

const Cart = () => {
  const { items } = useCart();

  const totalCartItems = items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  return (
    <section className="mb-6 flex min-h-screen flex-col gap-y-4 border-b border-b-dark-brown p-6">
      <div className="flex flex-row items-center justify-between gap-x-4">
        <h1 className="font-noto text-3xl font-medium">Cart</h1>
      </div>
      <div
        className={`grid grid-rows-1 md:grid-cols-[3fr_1.5fr] md:gap-x-4 ${
          totalCartItems < 1 ? "gap-y-[30vh]" : "gap-y-[20vh]"
        }`}
      >
        <CartList />
        <ShoppingSummary totalCartItems={totalCartItems} />
      </div>
    </section>
  );
};

export default Cart;
