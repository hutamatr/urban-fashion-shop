import React, { useContext } from "react";

import CartContext from "../store/CartContext";

const Cart = () => {
  const cartContext = useContext(CartContext);

  console.log(cartContext.items);

  return (
    <section className="mt-10 border-b border-b-dark-brown p-6">
      <h1 className="p-4 font-noto text-3xl">Cart</h1>
      <ul>
        {/* {cartItems.map((item) => {
          const { id, date, products, userId } = item;
          return (
            <li key={id}>
              <span>{date}</span>
              <ul>
                {products.map((product) => {
                  return <li key={product.productId}>{product.quantity}</li>;
                })}
              </ul>
              <span>{userId}</span>
            </li>
          );
        })} */}
      </ul>
    </section>
  );
};

export default Cart;
