import clsx from 'clsx';

import { useAppSelector } from '@store/store';

import TotalPricesOrder from './TotalPricesOrder';

interface ICartSummaryProps {
  totalCartItems: number;
  onPaymentHandler: () => void;
}

export default function CartSummary({
  totalCartItems,
  onPaymentHandler,
}: Readonly<ICartSummaryProps>) {
  const { totalPrice } = useAppSelector((state) => state.cart);

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
            Shopping Summary
          </h3>
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
        Process to Checkout
      </button>
    </section>
  );
}
