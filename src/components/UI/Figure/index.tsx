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
      id={product.id.toString()}
      className={clsx(
        'group/card relative grid min-h-full grid-cols-1 gap-4 overflow-hidden rounded-t border-b border-b-dark-brown duration-500',
        'dark:border-b-white-bone dark:bg-dark-brown'
      )}
    >
      <Image
        src={product.image_url}
        alt={product.title}
        className={clsx(
          classImage,
          'aspect-square w-full rounded border border-dark-brown duration-500',
          'group-hover/card:scale-105'
        )}
      />
      <figcaption
        className={clsx(
          'px-2 text-left text-sm font-semibold uppercase duration-500',
          'dark:text-white-bone'
        )}
      >
        {product.title}
      </figcaption>
      <span
        className={clsx(
          'flex items-center justify-self-end px-2 pb-2 text-sm font-semibold',
          'dark:text-white-bone'
        )}
      >
        {formatCurrencyToFixed(product.price)}
      </span>
    </figure>
  );
}
