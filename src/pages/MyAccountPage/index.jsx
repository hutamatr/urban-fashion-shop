import React, { useEffect } from 'react';
import { shallow } from 'zustand/shallow';

import AccountDetails from 'components/MyAccount/AccountDetails';
import { useStore } from 'store/useStore';

const MyAccount = () => {
  const { user, getUser, isLoading, isError, error } = useStore(
    (state) => ({
      user: state.user,
      getUser: state.getUser,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    }),
    shallow
  );

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <section className='flex min-h-[30vh] flex-col items-center justify-center gap-y-4 border-b border-b-dark-brown p-6 dark:border-b-white-bone md:min-h-fit md:py-12'>
        <h1 className='font-noto text-3xl uppercase dark:text-white-bone md:text-4xl'>
          My Account
        </h1>
        <div className='flex flex-col items-center justify-center gap-y-1 dark:text-white-bone'>
          <span className='max-w-md text-lg font-medium uppercase'>
            {user.username}
          </span>
          <span className='text-sm font-light'>{user.email}</span>
        </div>
      </section>
      <AccountDetails
        {...user}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </>
  );
};

export default MyAccount;
