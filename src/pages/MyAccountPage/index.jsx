import React, { useEffect, useState } from 'react';

import AccountDetails from 'components/MyAccount/AccountDetails';
import useAxios from 'hooks/useAxios';

const MyAccount = () => {
  const [user, setUser] = useState({});
  const { requestHttp, loading } = useAxios();

  useEffect(() => {
    const decode = JSON.parse(localStorage.getItem('decode'));
    requestHttp(
      {
        method: 'GET',
        url: `users/${decode.sub}`,
      },
      (data) => {
        setUser(data);
      }
    );
  }, [requestHttp]);

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
      <AccountDetails {...user} loading={loading} />
    </>
  );
};

export default MyAccount;
