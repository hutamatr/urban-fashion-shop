import clsx from 'clsx';

import { Image } from '@components/UI';

import { formatCurrencyToFixed } from '@utils/formatted';

import { INewProductToCart } from 'types/types';

interface ICartItemProps extends INewProductToCart {
  onDecrease: (_id: number) => void;
  onIncrease: (_id: number) => void;
  onRemove: (_id: number) => void;
}

export default function CartItem({
  product_id,
  quantity,
  price,
  product,
  onDecrease,
  onIncrease,
  onRemove,
}: ICartItemProps) {
  return (
    <li
      key={product_id}
      className={clsx(
        'flex flex-row gap-x-4 border border-dark-brown',
        'dark:border-white-bone'
      )}
    >
      <Image
        src={`${import.meta.env.VITE_IMAGE_URL}${product?.attributes.image
          .data[0].attributes.url}`}
        alt={product?.attributes.name}
        className={clsx(
          'w-28 border-r border-r-dark-brown object-contain',
          'dark:border-r-white-bone',
          'md:w-48'
        )}
      />
      <div className='flex w-full flex-col gap-y-3 p-4'>
        <p
          className={clsx(
            'text-sm font-medium uppercase',
            'dark:text-white-bone'
          )}
        >
          {product?.attributes.name}
        </p>
        <div className='flex flex-row gap-x-2'>
          <button
            className={clsx(
              'text-2xl font-bold',
              'disabled:invisible',
              'dark:text-white-bone'
            )}
            onClick={onDecrease.bind(null, product_id)}
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
            onClick={onIncrease.bind(null, product_id)}
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
          {formatCurrencyToFixed(+price)} x {quantity}
        </span>
        <button
          className={clsx(
            'max-w-fit self-end px-3 py-2 text-sm font-semibold duration-300',
            'hover:bg-dark-brown hover:text-white-bone',
            'dark:text-white-bone'
          )}
          onClick={onRemove.bind(null, product_id)}
        >
          Remove
        </button>
      </div>
    </li>
  );
}
