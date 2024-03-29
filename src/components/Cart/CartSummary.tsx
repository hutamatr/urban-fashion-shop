import clsx from 'clsx';

import Loading from '@components/UI/Loading';

import { useAppSelector } from '@store/store';

import TotalPricesOrder from './TotalPricesOrder';

interface ICartSummaryProps {
  totalCartItems: number;
  onPaymentHandler: () => void;
}

export default function CartSummary({
  totalCartItems,
  onPaymentHandler,
}: ICartSummaryProps) {
  const { totalPrice, status, errorMessage } = useAppSelector(
    (state) => state.cart
  );

  const { status: orderStatus } = useAppSelector((state) => state.order);

  return (
    <section>
      <div
        className={clsx(
          'flex h-fit flex-col gap-y-4 rounded bg-dark-brown p-4',
          'dark:bg-white-bone'
        )}
      >
        <div className='flex flex-row items-center gap-x-4'>
          <h3
            className={clsx(
              'text-lg font-semibold text-white-bone',
              'dark:text-dark-brown'
            )}
          >
            Cart Totals
          </h3>
          {status === 'pending' && <Loading />}
          {status === 'rejected' && (
            <span className='text-xs font-medium text-red-600'>
              {errorMessage}
            </span>
          )}
        </div>
        <TotalPricesOrder
          totalCartItems={totalCartItems}
          totalPriceAmount={totalPrice}
        />
      </div>
      <button
        className={clsx(
          'mt-4 w-full rounded-sm py-3 font-medium text-dark-brown ring-2 ring-dark-brown',
          'hover:bg-dark-brown hover:text-white-bone',
          'dark:hover:bg-white-bone dark:hover:text-dark-brown',
          'dark:text-white-bone dark:ring-white-bone'
        )}
        onClick={onPaymentHandler}
      >
        {orderStatus === 'pending' ? 'Loading...' : 'Process to Checkout'}
      </button>
    </section>
  );
}
