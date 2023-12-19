// import { loadStripe } from '@stripe/stripe-js';
import clsx from 'clsx';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import CartList from '@components/Cart/CartList';
import CartSummary from '@components/Cart/CartSummary';
import { Loading } from '@components/UI';

import { getCartItem } from '@store/cartSlice';
// import { paymentOrder } from '@store/orderSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getWishlists } from '@store/wishlistSlice';

// import { IOrder, IProductsOrder } from 'types/types';

// const stripePromise = loadStripe(
//   'pk_test_51Ncl4SIAnOD2G6K2AeMVopSQwSHAIVZ6NIv3Ag2Zk0M7FtKFrM9jRO7CLUuWi04lomuazHhJWEsFzm4lFwE1gRe200V2395JAf'
// );

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
      dispatch(getCartItem());
      dispatch(getWishlists());
    }
  }, [dispatch, isAuth]);

  const totalCartItems = cart?.reduce((curr, item) => {
    return curr + item.cart_item.quantity;
  }, 0);

  // const PaymentHandler = async () => {
  //   if (!isAuth) {
  //     navigate('/signin', { replace: true });
  //     return;
  //   }

  //   const productsToOrder: IProductsOrder[] = cart.map((product) => ({
  //     id: product.product?.id,
  //     name: product.product?.title,
  //     price: product.product?.price,
  //     quantity: product.quantity,
  //   }));

  //   const newOrder: IOrder = {
  //     user_id: user?.id as number,
  //     email: user?.email as string,
  //     total_price: totalPrice,
  //     products_list: productsToOrder,
  //   };

  //   try {
  //     const stripe = await stripePromise;
  //     const result = await dispatch(paymentOrder(newOrder)).unwrap();
  //     await stripe?.redirectToCheckout({
  //       sessionId: result.stripeSession.id,
  //     });
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.error(error);
  //     toast.error('Payment failed!', { duration: 3000 });
  //   }
  // };

  return (
    <>
      <Toaster position='top-center' />
      <section className='mb-6 flex min-h-screen flex-col gap-y-4'>
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
            cart.length === 0 ? 'md:grid-cols-1' : 'md:grid-cols-[3fr_1.5fr]',
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
