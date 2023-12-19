import clsx from 'clsx';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import BestSellers from '@components/Home/BestSellers';
import FashionProducts from '@components/Home/FashionProducts';
import Hero from '@components/Home/Hero';
import OurPhilosophy from '@components/Home/OurPhilosophy';
import ProductItem from '@components/Shop/ProductItem';
import { LoadingProductSkeleton } from '@components/UI';

import { getCartItem } from '@store/cartSlice';
import { fetchProducts } from '@store/productSlice';
import { useAppDispatch, useAppSelector } from '@store/store';
import { getWishlists } from '@store/wishlistSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const { products, status, errorMessage } = useAppSelector(
    (state) => state.products
  );
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    dispatch(fetchProducts({ skip: 0, limit: 6 }));
    if (isAuth) {
      dispatch(getCartItem());
      dispatch(getWishlists());
    }
  }, [dispatch, isAuth]);

  return (
    <>
      <Toaster position='top-center' />
      <Hero />
      <section
        className={clsx(
          'mt-4 grid min-h-max grid-cols-1 items-center gap-8',
          'md:mt-0 md:min-h-fit md:grid-cols-2 md:grid-rows-1 md:gap-10 md:p-10'
        )}
      >
        <div className='flex flex-col gap-y-8'>
          <h1
            className={clsx(
              'font-noto text-4xl font-light uppercase italic text-dark-brown',
              'dark:text-white-bone',
              'md:text-5xl'
            )}
          >
            Care for your clothes like the good friends they are.
          </h1>
          <span
            className={clsx(
              'block text-end font-light uppercase italic',
              'dark:text-white-bone',
              'md:text-xl'
            )}
          >
            -Joan Crawford
          </span>
        </div>
        <ul
          className={clsx(
            'grid grid-cols-1 gap-3 gap-x-4 bg-white-bone',
            'dark:bg-dark-brown',
            'md:grid-cols-2'
          )}
        >
          {status === 'pending' && <LoadingProductSkeleton length={2} />}
          {status === 'fulfilled' &&
            products?.products.slice(0, 2).map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })}
        </ul>
        {status === 'rejected' &&
          errorMessage?.map((error) => (
            <p
              key={error}
              className='mx-auto text-center font-medium uppercase text-red-700'
            >
              {error}
            </p>
          ))}
      </section>
      <FashionProducts />
      <BestSellers />
      <OurPhilosophy />
    </>
  );
}
