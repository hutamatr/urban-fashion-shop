import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { MdDeleteOutline, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Image } from '@components/UI';

import { useAppDispatch, useAppSelector } from '@store/store';
import { deleteWishlist, postWishlist } from '@store/wishlist.slice';

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
        toast.error('Please login first', { duration: 1500 });
      }, 1000);
      return;
    }

    if (!isWishlist) {
      setIsWishlist(true);
      dispatch(postWishlist({ product_id: product?.id }));
      toast.success('Added to wishlist', { duration: 1500 });
    } else {
      setIsWishlist(false);
      dispatch(deleteWishlist(product?.id));
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
      <div className={clsx('grid w-full grid-cols-1 gap-y-3 py-2', 'md:p-4')}>
        <div className={clsx('flex flex-col gap-y-1', 'md:gap-y-3')}>
          <p
            className={clsx(
              'text-sm font-semibold',
              'dark:text-white-bone',
              'md:text-base'
            )}
          >
            {product?.title}
          </p>
          <div className='flex flex-row items-center gap-x-2'>
            <span
              className={clsx(
                'text-sm font-semibold',
                'dark:text-white-bone',
                'md:text-base'
              )}
            >
              {formatCurrencyToFixed(
                product?.discount_percentage > 0
                  ? product?.discounted_price
                  : product?.price
              )}
            </span>
            {product?.discount_percentage > 0 && (
              <div className='flex flex-row items-center gap-x-1'>
                <span
                  className={clsx(
                    'hidden h-6 w-fit items-center rounded bg-red-500/30 px-1 text-xs font-semibold text-red-600',
                    'md:flex'
                  )}
                >
                  {product.discount_percentage}%
                </span>
                <span
                  className={clsx(
                    'text-xs font-medium text-dark-brown/50 line-through',
                    'dark:text-white-bone'
                  )}
                >
                  {formatCurrencyToFixed(product.price)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          className={clsx(
            'flex flex-row items-center justify-between gap-x-8',
            'md:justify-end'
          )}
        >
          <div
            className={clsx('flex flex-row items-center gap-x-2', 'md:gap-x-1')}
          >
            <button
              className={clsx('block', 'md:hidden')}
              onClick={addWishlistHandler}
            >
              {isWishlist ? (
                <MdFavorite className='cursor-pointer text-2xl text-red-600' />
              ) : (
                <MdFavoriteBorder className='cursor-pointer text-2xl text-dark-brown' />
              )}
            </button>
            <button
              className={clsx(
                'hidden max-w-fit self-end rounded px-3 py-2 text-sm font-semibold duration-300',
                `${
                  isWishlist
                    ? 'text-dark-brown/50 dark:text-white-bone/50'
                    : 'hover:bg-dark-brown hover:text-white-bone'
                }`,
                'dark:text-white-bone',
                'md:block'
              )}
              onClick={addWishlistHandler}
            >
              {isWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            </button>
            <span
              className={clsx(
                'hidden h-8 border-x border-x-dark-brown text-dark-brown',
                'dark:border-x-white-bone dark:text-white-bone',
                'md:block'
              )}
            ></span>
            <MdDeleteOutline
              className={clsx(
                'cursor-pointer text-2xl text-red-600',
                'dark:text-red-500'
              )}
              onClick={onRemove.bind(null, product?.id)}
            />
          </div>
          <div className='mr-4 flex flex-row gap-x-2'>
            <button
              className={clsx(
                'text-xl font-bold',
                'disabled:text-dark-brown/50',
                'dark:text-white-bone dark:disabled:text-white-bone/50',
                'md:text-2xl'
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
              className={clsx(
                'max-w-[3rem] rounded border-none bg-white-bone p-1 text-center text-sm font-semibold',
                'md:text-base'
              )}
            />
            <button
              className={clsx(
                'text-xl font-bold',
                'disabled:text-dark-brown/50',
                'dark:text-white-bone dark:disabled:text-white-bone/50',
                'md:text-2xl'
              )}
              onClick={onIncrease.bind(null, product?.id)}
              disabled={quantity === product?.stock_quantity}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
