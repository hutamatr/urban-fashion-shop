import clsx from 'clsx';
import { useState } from 'react';
import { CgClose, CgMenuRight } from 'react-icons/cg';
import { Link, NavLink } from 'react-router-dom';

import CartBadge from '@components/Cart/CartBadge';
import { Image } from '@components/UI';

import { useAppSelector } from '@hooks/useReduxT';

import LogoImg from '@assets/image/logo/logo-no-background.svg';

import DropdownNav from './DropdownNav';
import SwitcherTheme from './SwitcherTheme';

export default function Navigation() {
  const [menuView, setMenuView] = useState(false);

  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);

  const cartItemsTotal = cart.reduce((curr, item) => {
    return curr + item.quantity;
  }, 0);

  const menuHandler = () => setMenuView((prevState) => !prevState);
  const menuViewClose = () => setMenuView(false);

  return (
    <nav
      className={clsx(
        'layout relative flex flex-row items-center justify-between bg-white-bone py-6',
        'dark:bg-dark-brown',
        'sm:static'
      )}
    >
      <Link to='/' replace={true} className='flex items-center gap-x-3'>
        <Image
          src={LogoImg}
          alt='Urban Fashion'
          className={clsx('w-36', 'md:w-56')}
        />
        {/* <h1 className='font-noto text-2xl font-semibold text-dark-brown dark:text-white-bone'>
          urban fashion
        </h1> */}
      </Link>
      <div className='flex flex-row gap-x-6'>
        <CartBadge
          onCartItems={cartItemsTotal}
          className={clsx('dark:text-white-bone', 'sm:hidden')}
        />
        {isAuthenticated && (
          <DropdownNav
            className={clsx('sm:hidden')}
            onCloseMenu={menuViewClose}
          />
        )}
        <button className={clsx('sm:hidden')} onClick={menuHandler}>
          {menuView ? (
            <CgClose className={clsx('h-6 w-6', 'dark:text-white-bone')} />
          ) : (
            <CgMenuRight className={clsx('h-6 w-6', 'dark:text-white-bone')} />
          )}
        </button>
      </div>
      <ul
        className={clsx(
          menuView ? 'top-0' : 'translate-x-96 sm:top-full',
          'fixed right-0 top-16 flex h-screen w-[70vw] flex-col items-center gap-y-6 rounded-bl-xl bg-white-bone px-6 py-4 text-center font-manrope text-sm font-semibold uppercase text-neutral-500 shadow-md duration-700',
          'dark:bg-dark-brown',
          'sm:static sm:top-0 sm:h-fit sm:min-h-0 sm:w-auto sm:translate-x-0 sm:flex-row sm:items-center sm:gap-x-8 sm:bg-transparent sm:py-0 sm:opacity-100 sm:shadow-none sm:duration-75'
        )}
      >
        <li
          onClick={menuViewClose}
          className={clsx(
            'w-fit rounded-sm px-2 py-1 text-dark-brown duration-300',
            'hover:bg-dark-brown hover:text-white-bone',
            'dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown'
          )}
        >
          <NavLink to='/'>Home</NavLink>
        </li>
        <li
          onClick={menuViewClose}
          className={clsx(
            'w-fit rounded-sm px-2 py-1 text-dark-brown duration-300',
            'hover:bg-dark-brown hover:text-white-bone',
            'dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown'
          )}
        >
          <NavLink to='/shop'>Shop</NavLink>
        </li>

        {!isAuthenticated && (
          <li
            onClick={menuViewClose}
            className={clsx(
              'w-fit rounded-sm px-2 py-1 text-dark-brown duration-300',
              'hover:bg-dark-brown hover:text-white-bone',
              'dark:text-white-bone dark:hover:bg-white-bone dark:hover:text-dark-brown'
            )}
          >
            <NavLink to='/login'>Login</NavLink>
          </li>
        )}

        <CartBadge
          onCartItems={cartItemsTotal}
          className={clsx('hidden', 'dark:text-white-bone', 'sm:block')}
        />

        {isAuthenticated && (
          <li>
            <DropdownNav
              onCloseMenu={menuViewClose}
              className={clsx('hidden', 'sm:block')}
            />
          </li>
        )}
        <SwitcherTheme />
      </ul>
    </nav>
  );
}
