import clsx from 'clsx';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import CartList from '@components/Cart/CartList';
import CartSummary from '@components/Cart/CartSummary';
import { Loading } from '@components/UI';

import { getCartItem } from '@store/cart.slice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getWishlists } from '@store/wishlist.slice';

export default function Cart() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);
  const { products, status, errorMessage } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isAuth) {
      Promise.all([dispatch(getCartItem()), dispatch(getWishlists())]);
    }
  }, [dispatch, isAuth]);

  const totalCartItems = cart?.reduce((curr, item) => {
    return curr + item.cart_item.quantity;
  }, 0);

  return (
    <>
      <Toaster position='top-center' />
      <section className='mb-6 flex flex-col gap-y-4'>
        <div
          className={clsx(
            'flex min-h-[10vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown',
            'dark:border-b-white-bone',
            'md:min-h-fit md:py-12'
          )}
        >
          <h1
            className={clsx(
              'font-noto text-3xl uppercase',
              'dark:text-white-bone',
              'md:text-4xl'
            )}
          >
            Cart
          </h1>
        </div>

        <div
          className={clsx(
            cart.length === 0 ? 'lg:grid-cols-1' : 'lg:grid-cols-[3fr_1.5fr]',
            'grid grid-rows-1 gap-y-8',
            'md:gap-x-4'
          )}
        >
          {products && status === 'pending' && <Loading />}
          {products && status === 'rejected' && (
            <p className='mx-auto py-6 text-center font-medium uppercase text-red-700'>
              {errorMessage}
            </p>
          )}
          <CartList cartItems={cart} />
          {cart.length > 0 && (
            <CartSummary
              totalCartItems={totalCartItems}
              onPaymentHandler={() => navigate('/checkout')}
            />
          )}
        </div>
      </section>
    </>
  );
}
