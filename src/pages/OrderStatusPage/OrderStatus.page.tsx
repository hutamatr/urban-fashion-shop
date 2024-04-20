import clsx from 'clsx';
import { useEffect } from 'react';

import OrderItem from '@components/Order/OrderItem';
import OrderSummary from '@components/Order/OrderSummary';
import ShippingSummary from '@components/Order/ShippingSummary';

import { fetchUserOrder } from '@store/order.slice';
import { useAppDispatch, useAppSelector } from '@store/store';

import useQueryParams from '@hooks/useQueryParams';

export default function OrderStatus() {
  const { productsOrder } = useAppSelector((state) => state.order);

  const dispatch = useAppDispatch();
  const queryParams = useQueryParams();

  useEffect(() => {
    const transactionId = queryParams?.transaction_id;
    if (transactionId) {
      dispatch(fetchUserOrder(transactionId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <section className='mb-6 flex flex-col gap-y-4'>
      <div
        className={clsx(
          'flex min-h-[10vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown',
          'dark:border-b-white-bone',
          'md:min-h-fit md:py-12'
        )}
      >
        <h1
          className={clsx(
            'font-noto text-3xl uppercase',
            'dark:text-white-bone',
            'md:text-4xl'
          )}
        >
          Order Status
        </h1>
      </div>

      <div
        className={clsx(
          'flex flex-col-reverse gap-y-4',
          'md:grid md:grid-cols-12 md:gap-x-4'
        )}
      >
        <ul
          className={clsx(
            'flex flex-col gap-y-4 overflow-auto',
            'md:col-span-8 md:row-span-4'
          )}
        >
          {productsOrder?.map((item) => (
            <OrderItem product={item} key={item.id} />
          ))}
        </ul>
        <div className='col-span-4 flex flex-col gap-y-4'>
          <OrderSummary />
          <ShippingSummary />
        </div>
      </div>
    </section>
  );
}
