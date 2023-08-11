import clsx from 'clsx';

import { formatCurrencyToFixed } from '@utils/formatted';

import { Image } from '..';

import { IProduct } from 'types/types';

interface IFigureProps {
  classImage?: string;
  product: IProduct;
}

export function Figure({ product, classImage }: IFigureProps) {
  return (
    <figure
      id={product.id.toString()}
      className={clsx(
        'group/card relative grid min-h-full grid-cols-1 gap-4 overflow-hidden border-b border-b-dark-brown duration-500',
        'hover:bg-dark-brown hover:text-white-bone',
        'dark:border-b-white-bone dark:bg-dark-brown dark:hover:ring-2 dark:hover:ring-white-bone'
      )}
    >
      <Image
        src={`${import.meta.env.VITE_IMAGE_URL}${product.attributes?.images
          .data[0].attributes.url}`}
        alt={product.attributes?.name}
        className={clsx(
          classImage,
          'aspect-square w-full border border-dark-brown duration-500',
          'group-hover/card:scale-105'
        )}
      />
      <figcaption
        className={clsx(
          'px-2 text-sm font-semibold uppercase duration-500',
          'dark:text-white-bone'
        )}
      >
        {product.attributes?.name}
      </figcaption>
      <span
        className={clsx(
          'flex items-center justify-self-end px-2 pb-2 text-sm font-semibold',
          'dark:text-white-bone'
        )}
      >
        {formatCurrencyToFixed(+product.attributes?.price)}
      </span>
    </figure>
  );
}
