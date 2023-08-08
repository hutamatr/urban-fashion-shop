import clsx from 'clsx';

import ProductItem from '@components/Shop/ProductItem';
import Loading from '@components/UI/Loading';

import { useAppSelector } from '@hooks/useReduxT';

export default function BestSellers() {
  const { products, status, errorMessage } = useAppSelector(
    (state) => state.products
  );

  const bestSellersContent = (
    <ul
      className={clsx(
        'grid grid-cols-1 gap-6',
        'sm:grid-cols-2 sm:grid-rows-1',
        'lg:grid-cols-4 lg:gap-16'
      )}
    >
      {products?.data.slice(0, 4).map((product) => {
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
    <section
      className={clsx(
        'grid grid-cols-1 gap-y-4 border-b border-dark-brown p-6 text-dark-brown',
        'dark:border-b-white-bone',
        'md:grid-cols-1 md:p-10'
      )}
    >
      <h1
        className={clsx(
          'mb-2 text-center font-noto text-4xl uppercase',
          'dark:text-white-bone',
          'md:text-5xl'
        )}
      >
        BestSellers
      </h1>
      {status === 'pending' && <Loading />}
      {status === 'rejected' && (
        <p className='mx-auto text-center font-manrope font-medium uppercase text-red-700'>
          {errorMessage}
        </p>
      )}
      {status === 'fulfilled' && bestSellersContent}
    </section>
  );
}
