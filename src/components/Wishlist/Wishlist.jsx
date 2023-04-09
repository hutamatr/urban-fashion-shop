import React from 'react';
import { useNavigate } from 'react-router-dom';

import ProductItem from 'components/Shop/ProductItem';
import { Button } from 'components/UI';
import { useStore } from 'store/useStore';

const Wishlist = () => {
  const wishlistItems = useStore((state) => state.wishlistItems);
  const navigate = useNavigate();

  const gotoShopHandler = () => {
    navigate('/shop');
  };

  return (
    <>
      <section className='flex min-h-[30vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6 dark:border-b-white-bone md:min-h-fit md:py-12'>
        <h1 className='font-noto text-3xl uppercase dark:text-white-bone md:text-4xl'>
          Wishlist
        </h1>
      </section>
      <section className='min-h-screen'>
        {wishlistItems && wishlistItems.length < 1 ? (
          <div className='flex flex-col items-center justify-center'>
            <span className='my-6 grid place-items-center text-xl font-semibold dark:text-white-bone'>
              Wishlist Empty
            </span>
            <Button
              className='bg-dark-brown px-6 py-2 text-white-bone dark:bg-white-bone dark:font-medium dark:text-dark-brown'
              onClick={gotoShopHandler}
            >
              Shop
            </Button>
          </div>
        ) : (
          <ul className='grid grid-cols-2 gap-4 bg-white-bone p-6 dark:bg-dark-brown sm:grid-cols-3 md:gap-16 lg:grid-cols-4'>
            {wishlistItems &&
              wishlistItems.map((item) => {
                return (
                  <ProductItem
                    key={item.id}
                    product={item}
                    linkTo={`/shop/${item.id}`}
                  />
                );
              })}
          </ul>
        )}
      </section>
    </>
  );
};

export default Wishlist;
