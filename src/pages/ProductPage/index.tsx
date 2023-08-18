import clsx from 'clsx';
import { useEffect } from 'react';

import ProductList from '@components/Shop/ProductList';

import { fetchAllProducts } from '@store/productSlice';
import { useAppDispatch } from '@store/store';

export default function Product() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    dispatch(fetchAllProducts(null));
  }, [dispatch]);

  return (
    <>
      <section
        className={clsx(
          'mb-4 flex min-h-[25vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6',
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
          Shop
        </h1>
      </section>
      <ProductList />
    </>
  );
}
