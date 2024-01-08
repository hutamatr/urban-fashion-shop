import clsx from 'clsx';
import { useLocation } from 'react-router-dom';

import { shippingFlatRate } from '@utils/constant';
import { formatCurrencyToFixed } from '@utils/formatted';

interface ITotalPricesOrderProps {
  totalCartItems: number;
  totalPriceAmount: number;
}

export default function TotalPricesOrder({
  totalCartItems,
  totalPriceAmount,
}: Readonly<ITotalPricesOrderProps>) {
  const location = useLocation();

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
          {totalCartItems === 1 ? ' Item' : ' Items'} )
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
      {location.pathname === '/checkout' && (
        <div className='flex flex-row items-center justify-between'>
          <p className={clsx('text-white-bone', 'dark:text-dark-brown')}>
            Shipping (Flat rate)
          </p>
          <span className={clsx('text-white-bone', 'dark:text-dark-brown')}>
            {formatCurrencyToFixed(shippingFlatRate)}
          </span>
        </div>
      )}
      <div
        className={clsx(
          'flex justify-between border-t border-t-white-bone/50 py-2 font-bold',
          'dark:border-t-dark-brown/50',
          'sm:flex-row sm:items-center'
        )}
      >
        <p className={clsx('text-white-bone', 'dark:text-dark-brown')}>Total</p>
        <span className={clsx('text-white-bone', 'dark:text-dark-brown')}>
          {formatCurrencyToFixed(
            location.pathname === '/checkout'
              ? totalPriceAmount + shippingFlatRate
              : totalPriceAmount
          )}
        </span>
      </div>
    </>
  );
}
