import React, { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import Hero from 'components/Home/Hero';
import ProductItem from 'components/Shop/ProductItem';
import FashionProducts from 'components/Home/FashionProducts';
import BestSellers from 'components/Home/BestSellers';
import OurPhilosophy from 'components/Home/OurPhilosophy';
import { Toaster } from 'react-hot-toast';
import { useStore } from 'store/useStore';

const Home = () => {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getAllProducts();
  }, []);

  const productContent = (
    <ul className='grid grid-cols-1 gap-3 bg-white-bone dark:bg-dark-brown md:grid-cols-2'>
      {products.slice(0, 2).map((product) => {
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
    <>
      <Toaster />
      <Hero />
      <section className='grid min-h-max grid-cols-1 gap-8 p-6 md:min-h-fit md:grid-cols-2 md:grid-rows-1 md:gap-10 md:p-10'>
        <div className='flex flex-col gap-y-8'>
          <h1 className='font-noto text-4xl font-light uppercase italic text-dark-brown dark:text-white-bone md:text-5xl'>
            Care for your clothes like the good friends they are.
          </h1>
          <span className='block text-end font-light uppercase italic dark:text-white-bone md:text-xl'>
            -Joan Crawford
          </span>
        </div>
        {isLoading && (
          <p className='mx-auto text-center font-manrope font-light uppercase text-dark-brown'>
            Loading...
          </p>
        )}
        {isError && (
          <p className='mx-auto text-center font-medium uppercase text-red-700'>
            {error.message}
          </p>
        )}
        {!isLoading && !isError && productContent}
      </section>
      <FashionProducts />
      <BestSellers />
      <OurPhilosophy />
    </>
  );
};

export default Home;
