import clsx from 'clsx';

import { formatCurrencyToFixed } from '@utils/formatted';

interface ITotalPricesOrderProps {
  totalCartItems: number;
  totalPriceAmount: number;
}

export default function TotalPricesOrder({
  totalCartItems,
  totalPriceAmount,
}: ITotalPricesOrderProps) {
  return (
    <>
      <div
        className={clsx(
          'mt-4 flex justify-between',
          'sm:flex-row sm:items-center'
        )}
      >
        <p className={clsx('text-white-bone', 'dark:text-dark-brown')}>
          Subtotal (
          <span className='font-medium'>
            {totalCartItems > 99 ? '99+' : totalCartItems}
          </span>
          {totalCartItems === 1 ? ' Item' : ' Items'} ) :
        </p>
        <span
          className={clsx(
            'font-medium text-white-bone',
            'dark:text-dark-brown'
          )}
        >
          {formatCurrencyToFixed(totalPriceAmount)}
        </span>
      </div>
      <div
        className={clsx(
          'flex justify-between border-t border-t-white-bone/50 py-2 font-bold',
          'dark:border-t-dark-brown/50',
          'sm:flex-row sm:items-center'
        )}
      >
        <p className={clsx('text-white-bone', 'dark:text-dark-brown')}>Total</p>
        <span className={clsx('text-white-bone', 'dark:text-dark-brown')}>
          {formatCurrencyToFixed(totalPriceAmount)}
        </span>
      </div>
    </>
  );
}
