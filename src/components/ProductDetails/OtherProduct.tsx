import clsx from 'clsx';
import { useParams } from 'react-router-dom';

import ProductItem from '@components/Shop/ProductItem';
import Loading from '@components/UI/Loading';

import { useAppSelector } from '@store/store';

export default function OtherProduct() {
  const { productId } = useParams();

  const { products, product, status, errorMessage } = useAppSelector(
    (state) => state.products
  );

  const otherProductContent = (
    <ul
      className={clsx(
        'grid grid-cols-2 gap-4 bg-white-bone',
        'dark:bg-dark-brown',
        'sm:grid-cols-4',
        'md:gap-8',
        'lg:gap-16'
      )}
    >
      {products?.data
        ?.filter(
          (item) =>
            item.attributes.category.data.attributes.name ===
              product?.data.attributes.category.data.attributes.name &&
            item.id.toString() !== productId
        )
        .slice(0, 4)
        .map((product) => {
          return (
            <ProductItem
              key={product.id}
              product={product}
              linkTo={`/shop/${product.id}`}
            />
          );
        })}
    </ul>
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
      {status === 'pending' && <Loading />}
      {status === 'rejected' && (
        <p className='text-center text-xl font-medium text-red-600'>
          {errorMessage}
        </p>
      )}
      {status === 'fulfilled' && otherProductContent}
    </section>
  );
}
