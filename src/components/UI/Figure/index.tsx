import clsx from 'clsx';

import { formatCurrencyToFixed } from '@utils/formatted';

import { Image } from '..';

interface IFigureProps {
  classImage?: string;
  product: IProduct;
}

export function Figure({ product, classImage }: Readonly<IFigureProps>) {
  return (
    <figure
      id={product?.id.toString()}
      className={clsx(
        'group/card relative flex h-full flex-col items-start justify-start overflow-hidden rounded-t border-b border-b-dark-brown duration-500',
        'dark:border-b-white-bone dark:bg-dark-brown',
        'md:h-[25rem]'
      )}
    >
      <Image
        src={product?.image_url}
        alt={product?.title}
        className={clsx(
          classImage,
          'aspect-square w-full rounded border border-dark-brown duration-500',
          'group-hover/card:scale-105'
        )}
      />
      <figcaption
        className={clsx(
          'px-2 py-2 text-left text-sm font-semibold duration-500',
          'dark:text-white-bone'
        )}
      >
        {product?.title}
      </figcaption>
      <div className='flex flex-col justify-self-end px-2'>
        <span className={clsx('text-base font-bold', 'dark:text-white-bone')}>
          {formatCurrencyToFixed(
            product?.discount_percentage > 0
              ? product?.discounted_price
              : product?.price
          )}
        </span>
        {product?.discount_percentage > 0 && (
          <div className='flex flex-row items-center gap-x-2'>
            <span
              className={clsx(
                'text-xs font-medium text-dark-brown/50 line-through',
                'dark:text-white-bone'
              )}
            >
              {formatCurrencyToFixed(product.price)}
            </span>
            <span className='text-xs font-bold text-red-600'>
              {product.discount_percentage}%
            </span>
          </div>
        )}
      </div>
    </figure>
  );
}
