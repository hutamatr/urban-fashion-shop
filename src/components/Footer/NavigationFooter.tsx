import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { logoutHandler } from '@store/authSlice';

import { useAppDispatch, useAppSelector } from '@hooks/useReduxT';

export default function NavigationFooter() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  const logOutUserHandler = () => {
    dispatch(logoutHandler());
  };

  return (
    <section
      className={clsx(
        'flex flex-col gap-y-6 p-6 text-center',
        '',
        'md:w-full md:flex-row md:justify-evenly md:text-start'
      )}
    >
      <div className={clsx('flex flex-col gap-y-3 uppercase', 'md:gap-y-2')}>
        <h3
          className={clsx(
            'font-manrope text-sm font-semibold',
            'dark:text-white-bone'
          )}
        >
          Category
        </h3>
        <ul className={clsx('flex flex-col gap-y-2', 'md:gap-y-1')}>
          {categories?.data.map((category) => {
            return (
              <li key={category?.id}>
                <Link
                  to={`/${category?.attributes.name}`}
                  className={clsx(
                    'font-manrope text-xs',
                    'dark:text-white-bone'
                  )}
                >
                  {category?.attributes.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={clsx('flex flex-col gap-y-3 uppercase', 'md:gap-y-2')}>
        <h3
          className={clsx(
            'font-manrope text-sm font-semibold',
            'dark:text-white-bone'
          )}
        >
          Menu
        </h3>
        <ul
          className={clsx(
            'flex flex-col gap-y-2',
            'dark:text-white-bone',
            'md:gap-y-1'
          )}
        >
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
          {isAuthenticated && (
            <li>
              <Link to='/account' className='font-manrope text-xs'>
                My Account
              </Link>
            </li>
          )}
          {isAuthenticated ? (
            <li>
              <Link
                to='/'
                className='font-manrope text-xs'
                onClick={logOutUserHandler}
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
}
