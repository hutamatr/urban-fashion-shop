import clsx from 'clsx';
import { useEffect } from 'react';

import ProductList from '@components/Products/ProductList';

import { fetchProducts } from '@store/product.slice';
import { useAppDispatch } from '@store/store';

export default function Products() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    dispatch(fetchProducts({ skip: 0, limit: 0 }));
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
