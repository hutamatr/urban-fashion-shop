import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingProductSkeleton } from '@components/UI';

import { useAppDispatch, useAppSelector } from '@store/store';
import { getWishlists } from '@store/wishlistSlice';

import WishlistItem from './WishlistItem';

const Wishlist = () => {
  const [wishlistsData, setWishlistsData] = useState<IWishlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { wishlists } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlists());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setWishlistsData(wishlists);
      setIsLoading(false);
    }, 1500);
  }, [wishlists]);

  const gotoShopHandler = () => {
    navigate('/shop');
  };

  const wishlistsLoading = (
    <ul
      className={clsx(
        'grid grid-cols-2 gap-4 bg-white-bone pt-6',
        'dark:bg-dark-brown',
        'sm:grid-cols-3',
        'md:gap-6',
        'lg:grid-cols-4'
      )}
    >
      <LoadingProductSkeleton length={8} />
    </ul>
  );

  const wishlistsContent = (
    <ul
      className={clsx(
        'grid grid-cols-2 gap-4 bg-white-bone pt-6',
        'dark:bg-dark-brown',
        'sm:grid-cols-3',
        'md:gap-6',
        'lg:grid-cols-4'
      )}
    >
      {wishlistsData?.map((item) => {
        return (
          <WishlistItem
            key={item.id}
            wishlist={item}
            linkTo={`/shop/${item.product_id}`}
          />
        );
      })}
    </ul>
  );

  const wishlistsEmpty = (
    <div className='flex flex-col items-center justify-center'>
      <span
        className={clsx(
          'my-6 grid place-items-center text-xl font-semibold',
          'dark:text-white-bone'
        )}
      >
        Wishlist Empty
      </span>
      <button
        className={clsx(
          'bg-dark-brown px-6 py-2 text-white-bone',
          'dark:bg-white-bone dark:font-medium dark:text-dark-brown'
        )}
        onClick={gotoShopHandler}
      >
        Shop
      </button>
    </div>
  );

  return (
    <>
      <section
        className={clsx(
          'flex min-h-[30vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6',
          'dark:border-b-white-bone',
          'md:min-h-fit md:py-12'
        )}
      >
        <h1
          className={clsx(
            'font-noto text-3xl uppercase',
            'dark:text-white-bone',
            'md:text-4xl'
          )}
        >
          Wishlist
        </h1>
      </section>
      <section className='min-h-screen'>
        {isLoading && wishlistsLoading}
        {!isLoading && wishlistsData?.length >= 1 && wishlistsContent}
        {!isLoading && wishlistsData?.length === 0 && wishlistsEmpty}
      </section>
    </>
  );
};

export default Wishlist;
