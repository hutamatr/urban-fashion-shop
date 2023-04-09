import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

import { useStore } from 'store/useStore';

const NavigationFooter = () => {
  const { isAuth, unAuthHandler, getCategories, categories } = useStore(
    (state) => ({
      isAuth: state.isAuth,
      unAuthHandler: state.unAuthHandler,
      getCategories: state.getCategories,
      categories: state.categories,
    }),
    shallow
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    getCategories();
  }, []);

  return (
    <section className='flex flex-col gap-y-6 border-y border-y-dark-brown p-6 text-center dark:border-y-white-bone md:w-full md:flex-row md:justify-evenly md:text-start'>
      <div className='flex flex-col gap-y-3 uppercase md:gap-y-2'>
        <h3 className='font-manrope text-sm font-semibold dark:text-white-bone'>
          Category
        </h3>
        <ul className='flex flex-col gap-y-2 md:gap-y-1'>
          {categories.map((category, index) => {
            return (
              <li key={index}>
                <Link
                  to={`/${category}`}
                  className='font-manrope text-xs dark:text-white-bone'
                >
                  {category}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='flex flex-col gap-y-3 uppercase md:gap-y-2'>
        <h3 className='font-manrope text-sm font-semibold dark:text-white-bone'>
          Menu
        </h3>
        <ul className='flex flex-col gap-y-2 dark:text-white-bone md:gap-y-1'>
          <li>
            <Link to='/' className='font-manrope text-xs'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/shop' className='font-manrope text-xs'>
              Shop
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link to='/account' className='font-manrope text-xs'>
                My Account
              </Link>
            </li>
          )}
          {isAuth ? (
            <li>
              <Link
                to='/'
                className='font-manrope text-xs'
                onClick={() => unAuthHandler()}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/login' className='font-manrope text-xs'>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default NavigationFooter;
