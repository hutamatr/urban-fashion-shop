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
          'layout my-6 flex flex-col items-start justify-center gap-y-4',
          'md:my-16 md:min-h-fit'
        )}
      >
        <h1
          className={clsx(
            'font-noto text-4xl uppercase',
            'dark:text-white-bone',
            'md:text-5xl'
          )}
        >
          Shop
        </h1>
      </section>
      <ProductList />
    </>
  );
}
