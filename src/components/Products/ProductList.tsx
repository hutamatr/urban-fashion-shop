import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { LoadingProductSkeleton } from '@components/UI';

import useFIlterSortProduct from '@hooks/useFIlterSortProduct';

import FilterProduct from './FilterProduct';
import ProductItem from './ProductItem';
import SortProduct from './SortProduct';

export default function ProductList() {
  const {
    filterValue,
    setFilterValue,
    FilterProductHandler,
    productStatus,
    productErrorMessage,
    isSortedProductList,
  } = useFIlterSortProduct();

  const navigate = useNavigate();

  return (
    <section className='layout mb-16 flex flex-col'>
      <div
        className={clsx(
          'flex w-full flex-col items-end justify-between gap-x-4',
          'md:flex-row'
        )}
      >
        <FilterProduct
          filterValue={filterValue}
          onFilteredProductValue={setFilterValue}
        />
        <SortProduct
          onNavigate={navigate}
          onSortedProduct={isSortedProductList}
        />
      </div>
      <ul
        className={clsx(
          'grid grid-cols-2 gap-4 bg-white-bone',
          'dark:bg-dark-brown',
          'sm:grid-cols-3',
          'md:gap-6',
          'lg:grid-cols-4'
        )}
      >
        {productStatus === 'pending' && <LoadingProductSkeleton length={12} />}
        {productStatus === 'fulfilled' &&
          FilterProductHandler?.map((product) => {
            return <ProductItem product={product} key={product.id} />;
          })}
      </ul>
      {productStatus === 'rejected' &&
        productErrorMessage?.map((error) => (
          <p
            key={error}
            className='mx-auto py-6 text-center font-medium uppercase text-red-700'
          >
            {error}
          </p>
        ))}
    </section>
  );
}
