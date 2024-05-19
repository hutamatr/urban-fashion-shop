import clsx from 'clsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingProductSkeleton } from '@components/UI';
import WishlistItem from '@components/Wishlist/WishlistItem';

import { useAppDispatch, useAppSelector } from '@store/store';
import { getWishlists } from '@store/wishlist.slice';

export default function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { wishlists, status } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlists());
  }, [dispatch]);

  const gotoShopHandler = () => {
    navigate('/shop');
  };

  const wishlistsLoading = (
    <ul
      className={clsx(
        'layout grid grid-cols-2 gap-4 bg-white-bone pt-6',
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
        'layout grid grid-cols-2 gap-4 bg-white-bone pt-6',
        'dark:bg-dark-brown',
        'sm:grid-cols-3',
        'md:gap-6',
        'lg:grid-cols-4'
      )}
    >
      {wishlists?.map((item) => {
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
    <div className='layout flex flex-col items-center justify-center'>
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
          'layout my-6 flex flex-col items-start justify-center gap-y-4',
          'md:my-16 md:min-h-fit'
        )}
      >
        <h1
          className={clsx(
            'font-noto text-4xl uppercase',
            'dark:text-white-bone',
            'md:text-5xl'
          )}
        >
          Wishlist
        </h1>
      </section>
      <section className='min-h-screen'>
        {status === 'pending' && wishlistsLoading}
        {status === 'fulfilled' && wishlists?.length >= 1 && wishlistsContent}
        {status === 'fulfilled' && wishlists?.length === 0 && wishlistsEmpty}
      </section>
    </>
  );
}
