import clsx from 'clsx';
import { Link } from 'react-router-dom';

import { logoutUser } from '@store/auth.slice';
import { useAppDispatch, useAppSelector } from '@store/store';

export default function NavigationFooter() {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  const logOutUserHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <section
      className={clsx(
        'flex flex-col items-start gap-y-6 text-left',
        'md:mb-8 md:w-full md:flex-row md:justify-evenly md:p-6 md:text-start'
      )}
    >
      <div className={clsx('flex flex-col gap-y-3 uppercase', 'md:gap-y-2')}>
        <h3
          className={clsx(
            'font-manrope text-lg font-bold',
            'dark:text-white-bone'
          )}
        >
          Category
        </h3>
        <ul className={clsx('flex flex-col gap-y-3', 'md:gap-y-1')}>
          {categories?.categories?.map((category) => {
            return (
              <li key={category.id}>
                <Link
                  to={`/${category.category_name}`}
                  className={clsx(
                    'font-manrope text-sm',
                    'dark:text-white-bone'
                  )}
                >
                  {category.category_name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={clsx('flex flex-col gap-y-3 uppercase', 'md:gap-y-2')}>
        <h3
          className={clsx(
            'font-manrope text-lg font-bold',
            'dark:text-white-bone'
          )}
        >
          Menu
        </h3>
        <ul
          className={clsx(
            'flex flex-col gap-y-3',
            'dark:text-white-bone',
            'md:gap-y-1'
          )}
        >
          <li>
            <Link to='/' className='font-manrope text-sm'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/shop' className='font-manrope text-sm'>
              Shop
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link to='/account' className='font-manrope text-sm'>
                My Account
              </Link>
            </li>
          )}
          {isAuth ? (
            <li>
              <Link
                to='/'
                className='font-manrope text-sm'
                onClick={logOutUserHandler}
              >
                Logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to='/signin' className='font-manrope text-sm'>
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}
