import React from "react";

import CartList from "../components/Cart/CartList";

const Cart = () => {
  return (
    <section className="mt-16 flex flex-col gap-y-4 border-b border-b-dark-brown p-6">
      <h1 className="font-noto text-3xl font-medium">Cart</h1>
      <CartList />
    </section>
  );
};

export default Cart;
