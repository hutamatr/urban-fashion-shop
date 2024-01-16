import clsx from 'clsx';

import { Image } from '@components/UI';

import { formatCurrencyToFixed } from '@utils/formatted';

interface IOrderItemProps {
  product: IProductOrder;
}

export default function OrderItem({ product }: Readonly<IOrderItemProps>) {
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
          'w-32 border-r border-r-dark-brown object-contain',
          'dark:border-r-white-bone',
          'md:h-fit'
        )}
      />
      <div className={clsx('grid w-full grid-cols-1 gap-y-3 py-2')}>
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
                'text-sm font-medium text-dark-brown',
                'dark:text-white-bone'
              )}
            >
              {product?.transaction_item?.quantity} x
            </span>
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
      </div>
    </li>
  );
}
