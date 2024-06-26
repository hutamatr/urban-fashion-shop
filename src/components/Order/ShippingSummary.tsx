import clsx from 'clsx';

import { useAppSelector } from '@store/store';

import { shippingFlatRate } from '@utils/constant';
import { formatCurrencyToFixed } from '@utils/formatted';

import ShippingDetail from './ShippingDetail';

export default function ShippingSummary() {
  const { shippingStatus, customerAddress } = useAppSelector(
    (state) => state.order
  );
  return (
    <section>
      <div
        className={clsx(
          'flex h-fit w-full flex-col gap-y-4 rounded bg-transparent p-4 ring-2 ring-dark-brown',
          'dark:ring-white-bone'
        )}
      >
        <div className='flex flex-row items-center gap-x-4'>
          <h3
            className={clsx(
              'text-lg font-bold text-dark-brown',
              'dark:text-white-bone'
            )}
          >
            Shipping Details
          </h3>
        </div>
        <ShippingDetail
          shippingStatus={shippingStatus}
          shippingCost={formatCurrencyToFixed(shippingFlatRate)}
          shippingAddress={customerAddress}
        />
      </div>
    </section>
  );
}
