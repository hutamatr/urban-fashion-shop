import clsx from 'clsx';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import BestSellers from '@components/Home/BestSellers';
import FashionProducts from '@components/Home/FashionProducts';
import Hero from '@components/Home/Hero';
import OurPhilosophy from '@components/Home/OurPhilosophy';
import ProductItem from '@components/Shop/ProductItem';
import Loading from '@components/UI/Loading';

import { fetchAllProducts } from '@store/productSlice';

import { useAppDispatch, useAppSelector } from '@hooks/useReduxT';

export default function Home() {
  const dispatch = useAppDispatch();
  const { products, status, errorMessage } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(fetchAllProducts(null));
  }, [dispatch]);

  const productContent = (
    <ul
      className={clsx(
        'grid grid-cols-1 gap-3 bg-white-bone',
        'dark:bg-dark-brown',
        'md:grid-cols-2'
      )}
    >
      {products?.data.slice(0, 2).map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            linkTo={`shop/${product.id}`}
          />
        );
      })}
    </ul>
  );

  return (
    <>
      <Toaster position='top-center' />
      <Hero />
      <section
        className={clsx(
          'grid min-h-max grid-cols-1 items-center gap-8',
          'md:min-h-fit md:grid-cols-2 md:grid-rows-1 md:gap-10 md:p-10'
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
        {status === 'pending' && <Loading />}
        {status === 'rejected' && (
          <p className='mx-auto text-center font-medium uppercase text-red-700'>
            {errorMessage}
          </p>
        )}
        {status === 'fulfilled' && productContent}
      </section>
      <FashionProducts />
      <BestSellers />
      <OurPhilosophy />
    </>
  );
}
