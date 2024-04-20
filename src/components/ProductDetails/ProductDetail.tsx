import clsx from 'clsx';
import { Carousel } from 'flowbite-react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Image } from '@components/UI';

import { useAppSelector } from '@store/store';

import { formatCurrencyToFixed } from '@utils/formatted';

interface IProductDetailProps extends IProductData {
  quantity: number;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onAddToCart: () => void;
  isWishlist: boolean;
  onIsOnWishlist: () => void;
}

export default function ProductDetail({
  product,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onAddToCart,
  isWishlist,
  onIsOnWishlist,
}: Readonly<IProductDetailProps>) {
  const { categories } = useAppSelector((state) => state.products);
  const { isAuth } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const category = () => {
    return categories?.categories.filter((category) => {
      return category.id === product?.category_id;
    });
  };

  const addToCartHandler = () => {
    if (isAuth) {
      onAddToCart();
    } else {
      navigate('/signin', { replace: true });
    }
  };

  return (
    <section
      className={clsx(
        'grid grid-cols-1 border-b border-b-dark-brown',
        'dark:border-b-white-bone',
        'md:mt-14 md:grid-cols-2 md:items-center'
      )}
    >
      <Carousel
        className={clsx(
          'h-96 overflow-hidden rounded-t-md',
          'dark:md:bg-white-bone/50',
          'md:h-full md:bg-dark-brown/50'
        )}
        slideInterval={4000}
      >
        <Image
          key={product?.id}
          src={product?.image_url}
          alt={product?.title}
          className={clsx(
            'w-full rounded-md object-contain object-center',
            'md:h-96 md:w-auto'
          )}
        />
      </Carousel>
      <div
        className={clsx(
          'flex flex-col items-start justify-center gap-y-6 text-dark-brown',
          'md:p-4'
        )}
      >
        <div className={clsx('flex flex-col gap-y-2', 'dark:text-white-bone')}>
          <h1 className='text-xl font-bold uppercase'>{product?.title}</h1>
        </div>
        <div className='flex flex-col gap-y-1'>
          <span className={clsx('text-3xl font-bold', 'dark:text-white-bone')}>
            {formatCurrencyToFixed(
              product?.discount_percentage > 0
                ? product?.discounted_price
                : product?.price
            )}
          </span>
          {product?.discount_percentage > 0 && (
            <div className='flex flex-row items-center gap-x-1'>
              <span className='flex h-6 w-fit items-center rounded bg-red-500/30 px-1 text-xs font-bold text-red-600'>
                {product.discount_percentage}%
              </span>
              <span
                className={clsx(
                  'text-base font-semibold text-dark-brown/50 line-through',
                  'dark:text-white-bone'
                )}
              >
                {formatCurrencyToFixed(product.price)}
              </span>
            </div>
          )}
        </div>
        <div
          className={clsx(
            'flex flex-col-reverse gap-y-4',
            'md:w-full md:flex-row md:items-center md:justify-between'
          )}
        >
          <div className='flex flex-row items-center gap-x-4'>
            <div
              className={clsx(
                'flex max-w-fit border-2 border-dark-brown',
                'dark:border-white-bone'
              )}
            >
              <button
                onClick={onDecreaseQuantity}
                className={clsx(
                  'px-4 py-2 text-lg font-bold',
                  'dark:text-white-bone'
                )}
              >
                -
              </button>
              <input
                type='text'
                value={quantity < 1 ? 1 : quantity}
                min='1'
                max='10'
                readOnly
                className={clsx(
                  'h-full w-10 border-none bg-white-bone text-center',
                  'dark:bg-dark-brown dark:text-white-bone'
                )}
              />
              <button
                onClick={onIncreaseQuantity}
                className={clsx(
                  'px-4 py-2 text-lg font-bold',
                  'dark:text-white-bone'
                )}
              >
                +
              </button>
            </div>
            <p
              className={clsx(
                'text-sm',
                'dark:text-white-bone',
                'md:text-base'
              )}
            >
              Stock: {product?.stock_quantity}
            </p>
          </div>

          <button
            className={clsx(
              'flex items-center gap-x-2 rounded-sm bg-dark-brown px-2 py-[.75rem] text-white-bone',
              'dark:bg-white-bone dark:text-dark-brown'
            )}
            onClick={onIsOnWishlist}
          >
            {isWishlist ? (
              <>
                <MdFavorite
                  className={clsx('text-2xl', 'dark:text-dark-brown')}
                />
                On Wishlist
              </>
            ) : (
              <>
                <MdFavoriteBorder
                  className={clsx('text-2xl', 'dark:text-dark-brown')}
                />
                Add to Wishlist
              </>
            )}
          </button>
        </div>
        <p className={clsx('text-sm', 'dark:text-white-bone')}>
          {product?.description}
        </p>
        <span
          className={clsx(
            'text-xs font-medium uppercase',
            'dark:text-white-bone'
          )}
        >
          Category : {category()?.map((category) => category?.category_name)}
        </span>
        <button
          className={clsx(
            'w-full cursor-pointer rounded border border-dark-brown py-3 font-medium uppercase duration-300',
            'hover:bg-dark-brown hover:text-white-bone disabled:opacity-75',
            'dark:border-white-bone dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown'
          )}
          onClick={addToCartHandler}
        >
          {isAuth ? 'Add to Cart' : 'Login to Add to Cart'}
        </button>
      </div>
    </section>
  );
}
