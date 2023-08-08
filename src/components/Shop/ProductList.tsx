import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Loading from '@components/UI/Loading';

import { useAppSelector } from '@hooks/useReduxT';

import FilterProduct from './FilterProduct';
import ProductItem from './ProductItem';
import SortProduct from './SortProduct';

export default function ProductList() {
  const [filterValue, setFilterValue] = useState('all');
  const { products, status, errorMessage } = useAppSelector(
    (state) => state.products
  );

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const isSortedProductList = queryParams.get('sort') === 'low-to-high';

  const sortProductsByPrice = useMemo(() => {
    const sortedProducts = products?.data
      ?.slice()
      ?.sort((productA, productB) => {
        const { price: priceA } = productA.attributes;
        const { price: priceB } = productB.attributes;
        return isSortedProductList ? +priceA - +priceB : +priceB - +priceA;
      });
    return sortedProducts;
  }, [isSortedProductList, products?.data]);

  const FilterProductHandler = useMemo(() => {
    if (filterValue === 'all') return sortProductsByPrice;
    const filteredProducts = sortProductsByPrice?.filter(
      (product) =>
        product?.attributes.categories.data[0].attributes.name === filterValue
    );
    return filteredProducts;
  }, [filterValue, sortProductsByPrice]);

  const productContent = (
    <ul
      className={clsx(
        'grid grid-cols-2 gap-4 bg-white-bone',
        'dark:bg-dark-brown',
        'sm:grid-cols-3',
        'md:gap-6',
        'lg:grid-cols-4'
      )}
    >
      {FilterProductHandler?.map((product) => {
        return (
          <ProductItem
            product={product}
            linkTo={`${product.id}`}
            key={product.id}
          />
        );
      })}
    </ul>
  );

  return (
    <section className='mb-16 flex min-w-full flex-col'>
      <div
        className={clsx(
          'flex w-full flex-col items-end justify-end gap-x-4',
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
      {status === 'pending' && <Loading />}
      {status === 'rejected' && (
        <p className='mx-auto py-6 text-center font-medium uppercase text-red-700'>
          {errorMessage}
        </p>
      )}
      {status === 'fulfilled' && productContent}
    </section>
  );
}
