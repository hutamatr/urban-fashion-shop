import React, { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import ProductItem from 'components/Shop/ProductItem';
import { useStore } from 'store/useStore';

const OtherProduct = () => {
  const { products, getAllProducts, isLoading, isError, error } = useStore(
    (state) => ({
      products: state.products,
      getAllProducts: state.getAllProducts,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  useEffect(() => {
    getAllProducts();
  }, []);

  const otherProductContent = (
    <ul className='grid grid-cols-2 gap-4 bg-white-bone dark:bg-dark-brown sm:grid-cols-4 md:gap-8 lg:gap-16'>
      {products.slice(0, 4).map((product) => {
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
      <h1 className='p-4 text-center font-noto text-3xl font-semibold dark:text-white-bone sm:text-left'>
        You May Also Like
      </h1>
      {isLoading && (
        <p className='text-center text-xl font-medium dark:text-white-bone'>
          Loading...
        </p>
      )}
      {isError && (
        <p className='text-center text-xl font-medium text-red-600'>
          {error.message}
        </p>
      )}
      {!isLoading && !isError && otherProductContent}
    </section>
  );
};

export default OtherProduct;
