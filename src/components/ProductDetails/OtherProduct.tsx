import clsx from 'clsx';
import { useParams } from 'react-router-dom';

import ProductItem from '@components/Shop/ProductItem';
import { LoadingProductSkeleton } from '@components/UI';

import { useAppSelector } from '@store/store';

export default function OtherProduct() {
  const { productId } = useParams();

  const { products, status, errorMessage } = useAppSelector(
    (state) => state.products
  );

  return (
    <section className='mb-6 flex flex-col gap-y-6 px-6'>
      <h1
        className={clsx(
          'p-4 text-center font-noto text-3xl font-semibold',
          'dark:text-white-bone',
          'sm:text-left'
        )}
      >
        You May Also Like
      </h1>
      <ul
        className={clsx(
          'grid grid-cols-2 gap-4 bg-white-bone',
          'dark:bg-dark-brown',
          'sm:grid-cols-4',
          'md:gap-6',
          'lg:gap-16'
        )}
      >
        {status === 'pending' && <LoadingProductSkeleton length={4} />}
        {status === 'fulfilled' &&
          products?.products
            ?.filter((item) => item.id.toString() !== productId)
            .slice(0, 4)
            .map((product) => {
              return <ProductItem key={product.id} product={product} />;
            })}
      </ul>
      {status === 'rejected' && (
        <p className='text-center text-xl font-medium text-red-600'>
          {errorMessage}
        </p>
      )}
    </section>
  );
}
