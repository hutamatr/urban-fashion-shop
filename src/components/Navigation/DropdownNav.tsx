import clsx from 'clsx';
import { Dropdown } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

import Avatar from '@components/UI/svg/Avatar';

import { logoutUser } from '@store/auth.slice';
import { persistor, useAppDispatch } from '@store/store';

interface IDropdownNavProps {
  onCloseMenu: () => void;
  className?: string;
}

export default function DropdownNav({
  onCloseMenu,
  className,
}: Readonly<IDropdownNavProps>) {
  const dispatch = useAppDispatch();

  const logoutUserHandler = () => {
    dispatch(logoutUser());
    persistor.pause();
    persistor.flush().then(() => {
      return persistor.purge();
    });
    window.location.reload();
  };

  return (
    <div className={clsx(className, 'flex', 'md:order-2')}>
      <Dropdown
        className={clsx('bg-white-bone', 'dark:bg-dark-brown')}
        arrowIcon={false}
        inline={true}
        label={
          <Avatar
            className={clsx('h-5 w-5 text-dark-brown', 'dark:text-white-bone')}
            fill='currentColor'
          />
        }
      >
        <Dropdown.Item
          className={clsx(
            'duration-500',
            'hover:!bg-dark-brown hover:!text-white-bone',
            'dark:hover:!bg-white-bone dark:hover:!text-dark-brown'
          )}
          onClick={onCloseMenu}
        >
          <NavLink to='wishlist'>Wishlist</NavLink>
        </Dropdown.Item>
        <Dropdown.Item
          className={clsx(
            'whitespace-nowrap duration-500',
            'hover:!bg-dark-brown hover:!text-white-bone',
            'dark:hover:!bg-white-bone dark:hover:!text-dark-brown'
          )}
          onClick={onCloseMenu}
        >
          <NavLink to='account'>My Account</NavLink>
        </Dropdown.Item>
        <Dropdown.Item
          className={clsx(
            'text-red-500 duration-500',
            'hover:!bg-dark-brown hover:!text-white-bone',
            'dark:text-red-500 dark:hover:!bg-white-bone dark:hover:!text-dark-brown'
          )}
          onClick={onCloseMenu}
        >
          <NavLink to='/' onClick={logoutUserHandler}>
            Logout
          </NavLink>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
