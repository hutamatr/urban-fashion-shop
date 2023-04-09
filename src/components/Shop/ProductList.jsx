import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import ProductItem from './ProductItem';
import SortProduct from './SortProduct';
import { useStore } from 'store/useStore';

const sortProductsByPrice = (products, ascending) => {
  return products.sort((productA, productB) => {
    const { price: priceA } = productA;
    const { price: priceB } = productB;
    if (ascending) {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });
};

const ProductList = () => {
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

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const isSortedProductList = queryParams.get('sort') === 'low-to-high';

  const sortedProducts = sortProductsByPrice(products, isSortedProductList);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getAllProducts();
  }, []);

  const productContent = (
    <ul className='grid grid-cols-2 gap-3 bg-white-bone p-6 dark:bg-dark-brown sm:grid-cols-3 lg:grid-cols-4'>
      {sortedProducts.map((product) => {
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
    <section className='flex min-w-full flex-col'>
      <SortProduct
        onNavigate={navigate}
        onSortedProduct={isSortedProductList}
      />
      {isLoading && (
        <p className='mx-auto my-[25vh] min-h-[50vh] text-center font-semibold uppercase dark:text-white-bone'>
          Loading...
        </p>
      )}
      {isError && (
        <p className='mx-auto py-6 text-center font-medium uppercase text-red-700'>
          {error.message}
        </p>
      )}
      {!isLoading && !isError && productContent}
    </section>
  );
};

export default ProductList;
