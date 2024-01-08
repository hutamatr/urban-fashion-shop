import clsx from 'clsx';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Image } from '@components/UI';

import { addToCart, postCartItem } from '@store/cart.slice';
import { useAppDispatch } from '@store/store';
import { deleteWishlist } from '@store/wishlist.slice';

import { formatCurrencyToFixed } from '@utils/formatted';

interface IWishlistItemProps {
  wishlist: IWishlist;
  linkTo: string;
}

const quantity = 1;

const WishlistItem = ({ wishlist, linkTo }: IWishlistItemProps) => {
  const dispatch = useAppDispatch();

  const deleteWishlistHandler = () => {
    dispatch(deleteWishlist(wishlist.product_id));
  };

  const addToCartHandler = useCallback(() => {
    const itemToCart: IProductCart = {
      id: wishlist.product.id,
      title: wishlist.product.title,
      description: wishlist.product.description,
      image_url: wishlist.product.image_url,
      price: wishlist.product.price,
      discount_percentage: wishlist.product.discount_percentage,
      discounted_price: wishlist.product.discounted_price,
      stock_quantity: wishlist.product.stock_quantity,
      cart_item: {
        quantity,
      },
    };
    dispatch(addToCart(itemToCart));
    dispatch(
      postCartItem({
        product_id: wishlist?.product_id,
        quantity,
      })
    );
  }, [wishlist, dispatch]);

  return (
    <li>
      <figure
        id={wishlist?.id.toString()}
        className={clsx(
          'group/card relative grid min-h-full grid-cols-1 gap-4 overflow-hidden rounded-t border-b border-b-dark-brown duration-500',
          'dark:border-b-white-bone dark:bg-dark-brown'
        )}
      >
        <Link to={linkTo} className='flex flex-col gap-y-3'>
          <Image
            src={wishlist?.product?.image_url}
            alt={wishlist?.product?.title}
            className={clsx(
              'aspect-square w-full rounded border border-dark-brown duration-500',
              'group-hover/card:scale-105'
            )}
          />
          <figcaption
            className={clsx(
              'px-2 text-sm font-semibold uppercase duration-500',
              'dark:text-white-bone'
            )}
          >
            {wishlist?.product?.title}
          </figcaption>
        </Link>
        <div className='flex flex-row items-center justify-between'>
          <span className='text-xs font-medium text-red-600'>
            {wishlist?.product?.deleted_at && 'Product Deleted'}
          </span>
          <div className='flex flex-col justify-self-end'>
            <span
              className={clsx('text-base font-bold', 'dark:text-white-bone')}
            >
              {formatCurrencyToFixed(
                wishlist?.product?.discount_percentage > 0
                  ? wishlist?.product?.discounted_price
                  : wishlist?.product?.price
              )}
            </span>
            {wishlist?.product.discount_percentage > 0 && (
              <div className='flex flex-row items-center gap-x-2'>
                <span className='text-xs font-medium text-dark-brown/50 line-through'>
                  {formatCurrencyToFixed(wishlist?.product.price)}
                </span>
                <span className='text-xs font-bold text-red-600'>
                  {wishlist?.product.discount_percentage}%
                </span>
              </div>
            )}
          </div>
        </div>
        <div className='flex w-full flex-row items-center gap-x-4 pb-4'>
          <button
            className='w-full rounded bg-red-600 px-4 py-1 text-sm font-medium text-white-bone'
            onClick={deleteWishlistHandler}
          >
            Delete
          </button>
          <button
            className={clsx(
              'w-full rounded bg-dark-brown px-4 py-1 text-sm font-medium text-white-bone',
              'disabled:cursor-not-allowed disabled:bg-dark-brown/50 disabled:dark:bg-white-bone/50',
              'dark:bg-white-bone dark:text-dark-brown'
            )}
            onClick={addToCartHandler}
            disabled={!!wishlist?.product?.deleted_at}
          >
            + Cart
          </button>
        </div>
      </figure>
    </li>
  );
};

export default WishlistItem;
