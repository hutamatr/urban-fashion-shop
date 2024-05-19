import clsx from 'clsx';

import PaymentProtectionLogo from '@components/UI/svg/PaymentProtectionLogo';

export default function Payment() {
  return (
    <section className='flex flex-col gap-y-3'>
      <h2 className={clsx('text-2xl font-semibold', 'dark:text-white-bone')}>
        Payment
      </h2>
      <p className={clsx('text-sm', 'dark:text-white-bone')}>
        All transactions are secure and encrypted.
      </p>
      <div className='w-full'>
        <div
          className={clsx(
            'rounded-t-lg border-2 border-dark-brown bg-dark-brown/20 p-4',
            'dark:border-white-bone dark:bg-white-bone/20'
          )}
        >
          <h3 className={clsx('font-medium', 'dark:text-white-bone')}>
            Payments via Midtrans
          </h3>
        </div>
        <div
          className={clsx(
            'flex flex-col items-center justify-center rounded-b-lg border-x border-b border-dark-brown p-4',
            'dark:border-white-bone'
          )}
        >
          <PaymentProtectionLogo
            className={clsx(
              'h-28 w-28 text-dark-brown',
              'dark:text-white-bone'
            )}
            fill='currentColor'
          />
          <p
            className={clsx(
              'max-w-sm text-center text-sm font-medium',
              'dark:text-white-bone',
              'lg:text-base'
            )}
          >
            After clicking “Pay now”, you will be redirected to Payments via
            Midtrans to complete your purchase securely.
          </p>
        </div>
      </div>
    </section>
  );
}
