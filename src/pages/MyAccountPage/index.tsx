import clsx from 'clsx';
import { useEffect } from 'react';

import AccountDetails from '@components/MyAccount/AccountDetails';
import Loading from '@components/UI/Loading';

import { useAppDispatch, useAppSelector } from '@store/store';
import { fetchUser } from '@store/userSlice';

import { IUser } from 'types/types';

export default function MyAccount() {
  const { user, status, errorMessage } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      {status === 'pending' && <Loading />}
      {status === 'rejected' && (
        <p className='mx-auto py-6 text-center font-medium uppercase text-red-700'>
          {errorMessage}
        </p>
      )}
      {status === 'fulfilled' && (
        <>
          <section
            className={clsx(
              'flex min-h-[30vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6',
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
              My Account
            </h1>
            <div
              className={clsx(
                'flex flex-col items-center justify-center gap-y-1',
                'dark:text-white-bone'
              )}
            >
              <span className='max-w-md text-lg font-medium uppercase'>
                {user?.username}
              </span>
              <span className='text-sm font-light'>{user?.email}</span>
            </div>
          </section>
          <AccountDetails {...(user as IUser)} />
        </>
      )}
    </>
  );
}
