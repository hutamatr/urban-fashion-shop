import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Image } from '@components/UI';

import { useAppDispatch, useAppSelector } from '@store/store';
import { postWishlist } from '@store/wishlistSlice';

import { formatCurrencyToFixed } from '@utils/formatted';

interface ICartItemProps extends INewProductToCart {
  onDecrease: (_id: number) => void;
  onIncrease: (_id: number) => void;
  onRemove: (_id: number) => void;
  onWishlistHandler: (_productId: number) => boolean;
}

export default function CartItem({
  quantity,
  product,
  onDecrease,
  onIncrease,
  onRemove,
  onWishlistHandler,
}: Readonly<ICartItemProps>) {
  const isProductOnWishlist = onWishlistHandler(product?.id);
  const [isWishlist, setIsWishlist] = useState(isProductOnWishlist);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setIsWishlist(isProductOnWishlist);
  }, [isProductOnWishlist]);

  const addWishlistHandler = () => {
    if (!isAuth) {
      navigate('/signin', { replace: true });
      setTimeout(() => {
        toast.error('Please login first', { duration: 3000 });
      }, 1000);
      return;
    }

    if (!isProductOnWishlist) {
      setIsWishlist(true);
      dispatch(postWishlist({ product_id: product?.id }));
      toast.success('Added to wishlist', { duration: 3000 });
    }
  };

  return (
    <li
      key={product?.id}
      className={clsx(
        'flex flex-row gap-x-4 rounded border border-dark-brown',
        'dark:border-white-bone'
      )}
    >
      <Image
        src={product?.image_url}
        alt={product?.title}
        className={clsx(
          'w-28 border-r border-r-dark-brown object-contain',
          'dark:border-r-white-bone',
          'md:h-full md:w-64'
        )}
      />
      <div className='flex w-full flex-col gap-y-3 p-4'>
        <p
          className={clsx(
            'text-sm font-medium uppercase',
            'dark:text-white-bone'
          )}
        >
          {product?.title}
        </p>
        <div className='flex flex-row gap-x-2'>
          <button
            className={clsx(
              'text-2xl font-bold',
              'disabled:invisible',
              'dark:text-white-bone'
            )}
            onClick={onDecrease.bind(null, product?.id)}
            disabled={quantity === 1}
          >
            -
          </button>
          <input
            type='text'
            value={quantity}
            readOnly
            className='max-w-[4rem] rounded p-1 text-center'
          />
          <button
            className={clsx('text-2xl font-bold', 'dark:text-white-bone')}
            onClick={onIncrease.bind(null, product?.id)}
          >
            +
          </button>
        </div>
        <span
          className={clsx(
            'text-sm font-bold text-dark-brown',
            'dark:text-white-bone'
          )}
        >
          {formatCurrencyToFixed(product?.price)} x {quantity}
        </span>
        <div className='flex flex-row items-center gap-x-4 self-end'>
          <button
            className={clsx(
              'max-w-fit self-end rounded px-3 py-2 text-sm font-semibold duration-300',
              `${
                isWishlist
                  ? 'text-dark-brown/50 dark:text-white-bone/50'
                  : 'hover:bg-dark-brown hover:text-white-bone'
              }`,
              'dark:text-white-bone'
            )}
            disabled={isWishlist}
            onClick={addWishlistHandler}
          >
            {isWishlist ? 'Already in wishlist' : 'Add to wishlist'}
          </button>
          <button
            className={clsx(
              'max-w-fit self-end rounded px-3 py-2 text-sm font-semibold duration-300',
              'hover:bg-dark-brown hover:text-white-bone',
              'dark:text-white-bone'
            )}
            onClick={onRemove.bind(null, product?.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
