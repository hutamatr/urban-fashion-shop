import React, { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import CartList from 'components/Cart/CartList';
import CartSummary from 'components/Cart/CartSummary';
import { useStore } from 'store/useStore';

const Cart = () => {
  const {
    items: cartItems,
    totalCart,
    totalCartHandler,
  } = useStore(
    (state) => ({
      items: state.items,
      totalCart: state.totalCart,
      totalCartHandler: state.totalCartHandler,
    }),
    shallow
  );

  useEffect(() => {
    totalCartHandler();
  }, [cartItems]);

  return (
    <section className='mb-6 flex min-h-screen flex-col gap-y-4'>
      <div className='flex min-h-[10vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown dark:border-b-white-bone md:min-h-fit md:py-12'>
        <h1 className='font-noto text-3xl uppercase dark:text-white-bone md:text-4xl'>
          Cart
        </h1>
      </div>
      <div
        className={`grid grid-rows-1 px-6 md:grid-cols-[3fr_1.5fr] md:gap-x-4 ${
          totalCart < 1 ? 'gap-y-[30vh]' : 'gap-y-[20vh]'
        }`}
      >
        <CartList />
        <CartSummary totalCartItems={totalCart} />
      </div>
    </section>
  );
};

export default Cart;
