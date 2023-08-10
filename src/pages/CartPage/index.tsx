import { loadStripe } from '@stripe/stripe-js';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import CartList from '@components/Cart/CartList';
import CartSummary from '@components/Cart/CartSummary';
import Loading from '@components/UI/Loading';

import { paymentOrder } from '@store/orderSlice';
import { fetchProducts } from '@store/productSlice';
import { useAppDispatch, useAppSelector } from '@store/store';

import { INewProductToCart, IProduct } from 'types/types';

const stripePromise = loadStripe(
  'pk_test_51Ncl4SIAnOD2G6K2AeMVopSQwSHAIVZ6NIv3Ag2Zk0M7FtKFrM9jRO7CLUuWi04lomuazHhJWEsFzm4lFwE1gRe200V2395JAf'
);

export default function Cart() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);
  const { products, status, errorMessage } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const getProductById = (products: IProduct[], productId: number) => {
    const productLookup = products.reduce<IProduct[]>((lookup, product) => {
      lookup[product.id] = product;
      return lookup;
    }, {} as IProduct[]);
    return productLookup[productId];
  };

  const cartWithProducts: INewProductToCart[] = useMemo(() => {
    if (!products?.data) {
      return [];
    }
    return cart.map((item) => ({
      product_id: item.product_id,
      price: item.price,
      quantity: item.quantity,
      email: user?.email as string,
      product: getProductById(products.data, item.product_id),
    }));
  }, [cart, products?.data, user?.email]);

  const totalCartItems = useMemo(
    () =>
      cart.reduce((curr, item) => {
        return curr + item.quantity;
      }, 0),
    [cart]
  );

  const PaymentHandler = async () => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      const stripe = await stripePromise;
      const result = await dispatch(paymentOrder(cartWithProducts)).unwrap();
      await stripe?.redirectToCheckout({
        sessionId: result.stripeSession.id,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      toast.error('Payment failed!', { duration: 3000 });
    }
  };

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
          {status === 'pending' && <Loading />}
          {status === 'rejected' && (
            <p className='mx-auto py-6 text-center font-medium uppercase text-red-700'>
              {errorMessage}
            </p>
          )}
          {status === 'fulfilled' && <CartList cartItems={cartWithProducts} />}
          {cart.length > 0 && (
            <>
              <CartSummary
                totalCartItems={totalCartItems}
                onPaymentHandler={PaymentHandler}
              />
            </>
          )}
        </div>
      </section>
    </>
  );
}
