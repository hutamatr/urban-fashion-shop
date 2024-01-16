import clsx from 'clsx';
import { Table } from 'flowbite-react';
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { cancelPayment, fetchUserOrders } from '@store/order.slice';
import { useAppDispatch, useAppSelector } from '@store/store';

import { formatCurrencyToFixed } from '@utils/formatted';

export default function Orders() {
  const dispatch = useAppDispatch();
  const { userOrders } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const cancelOrderHandler = async (transactionId: string) => {
    const response = await dispatch(
      cancelPayment({ transaction_id: transactionId })
    );

    if (response.meta.requestStatus === 'fulfilled') {
      window.location.reload();
    }

    if (response.meta.requestStatus === 'rejected') {
      const payload = response.payload as IError;
      payload.message.forEach((message: string) => {
        toast.error(message, { duration: 1500 });
      });
    }
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <section className='mb-6 flex min-h-[80vh] flex-col gap-y-4'>
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
            Orders
          </h1>
        </div>

        <div className='overflow-x-auto'>
          {userOrders.length === 0 && (
            <p
              className={clsx(
                'my-8 w-full text-center text-lg font-semibold',
                'dark:text-white-bone'
              )}
            >
              Orders Empty
            </p>
          )}
          {userOrders.length > 0 && (
            <Table>
              <Table.Head>
                <Table.HeadCell>Order Id</Table.HeadCell>
                <Table.HeadCell>Date</Table.HeadCell>
                <Table.HeadCell>Status</Table.HeadCell>
                <Table.HeadCell>Total</Table.HeadCell>
                <Table.HeadCell>
                  <span className='sr-only'>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className='divide-y'>
                {userOrders.map((order) => (
                  <Table.Row
                    key={order.id}
                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                  >
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
                      {order.id}
                    </Table.Cell>
                    <Table.Cell>
                      {new Date(order.created_at).toDateString()}
                    </Table.Cell>
                    <Table.Cell>{order.status}</Table.Cell>
                    <Table.Cell>
                      {formatCurrencyToFixed(order.total_price)}
                    </Table.Cell>
                    <Table.Cell>
                      {order.status === 'PENDING_PAYMENT' && (
                        <div className='flex flex-row items-center gap-x-3'>
                          <Link
                            to={order.snap_redirect_url}
                            target='_blank'
                            className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                          >
                            Pay
                          </Link>
                          <button
                            className='font-medium text-cyan-600 hover:underline dark:text-cyan-500'
                            onClick={cancelOrderHandler.bind(null, order.id)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
      </section>
    </>
  );
}
