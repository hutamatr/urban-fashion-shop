import clsx from 'clsx';

import Loading from '@components/UI/Loading';

import { useAppSelector } from '@store/store';

import { IUser } from 'types/types';

export default function AccountDetails({
  username,
  email,
  address,
  phone_number,
}: IUser) {
  const { status } = useAppSelector((state) => state.auth);

  return (
    <section className='mx-auto p-6'>
      {status === 'pending' && <Loading />}
      {status === 'rejected' && (
        <p className='mx-auto py-6 text-center font-medium uppercase text-red-700'>
          Failed to view user data!
        </p>
      )}
      {status === 'fulfilled' && (
        <>
          <h2
            className={clsx(
              'mb-4 text-lg font-semibold',
              'dark:text-white-bone'
            )}
          >
            User Detail
          </h2>
          <div
            className={clsx('mb-6 flex items-center', 'dark:text-white-bone')}
          >
            <span className='w-24'>Name :</span>
            <span>{username}</span>
          </div>
          <div
            className={clsx('mb-6 flex items-center', 'dark:text-white-bone')}
          >
            <span className='w-24'>Email :</span>
            <span>{email}</span>
          </div>
          <div
            className={clsx('mb-6 flex items-center', 'dark:text-white-bone')}
          >
            <span className='w-24'>Phone :</span>
            <span>{phone_number}</span>
          </div>
          {/* <h2
            className={clsx(
              'mb-4 text-lg font-semibold',
              'dark:text-white-bone'
            )}
          >
            Address :
          </h2> */}
          <div
            className={clsx('mb-6 flex items-center', 'dark:text-white-bone')}
          >
            <span className='w-24'>Address :</span>
            <span>{address}</span>
          </div>
        </>
      )}
    </section>
  );
}
