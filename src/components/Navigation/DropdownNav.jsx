import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dropdown, Avatar } from 'flowbite-react';
import toast from 'react-hot-toast';
import { shallow } from 'zustand/shallow';

import avatarImage from 'assets/image/avatar.webp';
import { useStore } from 'store/useStore';

const DropdownNav = ({ onCloseMenu, className }) => {
  const { unAuthHandler, wishlistItems } = useStore(
    (state) => ({
      unAuthHandler: state.unAuthHandler,
      wishlistItems: state.wishlistItems,
    }),
    shallow
  );

  const logoutHandler = () => {
    unAuthHandler();
    toast.success('Logout Successfully');
  };

  return (
    <div className={`flex md:order-2 ${className}`}>
      <Dropdown
        className='bg-white-bone'
        arrowIcon={false}
        inline={true}
        label={<Avatar alt='Avatar' img={avatarImage} rounded={true} />}
      >
        <Dropdown.Item
          className='duration-300 hover:!bg-dark-brown hover:!text-white-bone'
          onClick={onCloseMenu}
        >
          <NavLink to='wishlist'>
            Wishlist {wishlistItems ? `(${wishlistItems.length})` : null}
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item
          className='whitespace-nowrap duration-300 hover:!bg-dark-brown hover:!text-white-bone'
          onClick={onCloseMenu}
        >
          <NavLink to='account'>My Account</NavLink>
        </Dropdown.Item>
        <Dropdown.Item
          className='duration-300 hover:!bg-dark-brown hover:!text-white-bone'
          onClick={onCloseMenu}
        >
          <NavLink to='/' onClick={logoutHandler}>
            logout
          </NavLink>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default DropdownNav;
