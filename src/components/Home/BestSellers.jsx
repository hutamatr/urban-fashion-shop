import React, { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import ProductItem from 'components/Shop/ProductItem';
import { useStore } from 'store/useStore';

const BestSellers = () => {
  const { getAllProducts, products, isLoading, isError, error } = useStore(
    (state) => ({
      getAllProducts: state.getAllProducts,
      products: state.products,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  useEffect(() => {
    getAllProducts();
  }, []);

  const bestSellersContent = (
    <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:grid-rows-1 lg:grid-cols-4 lg:gap-16'>
      {products.slice(0, 4).map((product) => {
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
    <section className='grid grid-cols-1 gap-y-4 border-b border-dark-brown p-6 text-dark-brown dark:border-b-white-bone md:grid-cols-1 md:p-10'>
      <h1 className='mb-2 text-center font-noto text-4xl uppercase dark:text-white-bone md:text-5xl'>
        BestSellers
      </h1>
      {isLoading && (
        <p className='mx-auto text-center font-manrope font-light uppercase dark:text-white-bone'>
          Loading...
        </p>
      )}
      {isError && (
        <p className='mx-auto text-center font-manrope font-medium uppercase text-red-700'>
          {error.message}
        </p>
      )}
      {!isLoading && !isError && bestSellersContent}
    </section>
  );
};

export default BestSellers;
