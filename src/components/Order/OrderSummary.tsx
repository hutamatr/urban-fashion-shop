import clsx from 'clsx';

import { useAppSelector } from '@store/store';

import OrderDetailItem from './OrderDetailItem';

export default function OrderSummary() {
  const {
    orderStatus,
    customerFullName,
    customerEmail,
    transactionId,
    paymentMethod,
    orderDate,
  } = useAppSelector((state) => state.order);

  return (
    <section>
      <div
        className={clsx(
          'flex h-fit flex-col gap-y-4 rounded bg-transparent p-4 ring-2 ring-dark-brown',
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
            Transaction Details
          </h3>
        </div>
        <OrderDetailItem title='Transaction ID' value={transactionId} />
        <OrderDetailItem title='Full Name' value={customerFullName} />
        <OrderDetailItem title='Email' value={customerEmail} />
        <OrderDetailItem title='Payment Method' value={paymentMethod} />
        <OrderDetailItem
          title='Order Date'
          value={new Date(orderDate).toLocaleString()}
        />
        <OrderDetailItem title='Order Status' value={orderStatus} />
      </div>
    </section>
  );
}
