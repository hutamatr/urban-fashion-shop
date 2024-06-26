import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import AccountDetails from '@components/MyAccount/AccountDetails';
import ChangePassword from '@components/MyAccount/ChangePassword';

import { useAppDispatch, useAppSelector } from '@store/store';
import { fetchUser } from '@store/user.slice';

export default function MyAccount() {
  const [isChangePassword, setIsChangePassword] = useState(false);

  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const switchToChangePasswordHandler = () => {
    setIsChangePassword(false);
  };

  const switchToProfileHandler = () => {
    setIsChangePassword(true);
  };

  return (
    <>
      <Toaster position='top-center' />
      <section
        className={clsx(
          'layout my-6 flex flex-col items-center justify-center gap-y-4',
          'md:my-16 md:min-h-fit'
        )}
      >
        <h1
          className={clsx(
            'font-noto text-4xl uppercase',
            'dark:text-white-bone',
            'md:text-5xl'
          )}
        >
          My Account
        </h1>
        <div
          className={clsx(
            'flex w-full flex-col items-center justify-center gap-y-1',
            'dark:text-white-bone'
          )}
        >
          <span className='text-lg font-medium uppercase'>
            {user?.first_name && user.last_name
              ? `${user.first_name} ${user.last_name}`
              : user?.email}
          </span>
          <span className='text-sm font-light'>
            {user?.first_name && user?.last_name ? user?.email : ''}
          </span>
        </div>
      </section>
      <section className={clsx('layout grid grid-cols-1', 'md:grid-cols-12')}>
        <div
          className={clsx(
            'flex flex-row items-center gap-x-4 p-4',
            'md:col-start-1 md:col-end-4 md:flex-col md:items-start md:gap-y-2 md:border-r-2 md:border-r-dark-brown/50',
            'dark:border-r-white-bone/50'
          )}
        >
          <button
            onClick={switchToChangePasswordHandler}
            className={clsx(
              'text-dark-brown underline',
              'dark:text-white-bone'
            )}
          >
            Profile
          </button>
          <button
            onClick={switchToProfileHandler}
            className={clsx(
              'text-dark-brown underline',
              'dark:text-white-bone'
            )}
          >
            Change Password
          </button>
        </div>
        <div className={clsx('mb-8', 'md:col-start-4 md:col-end-13 md:p-6')}>
          {isChangePassword ? <ChangePassword /> : <AccountDetails />}
        </div>
      </section>
    </>
  );
}
