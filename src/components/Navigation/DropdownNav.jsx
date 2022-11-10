import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Avatar } from "flowbite-react";

import { useAuth, useWish } from "../../hooks/useStoreContext";

import avatarImage from "../../assets/image/avatar.webp";

const DropdownNav = ({ onCloseMenu, className }) => {
  const { unAuth } = useAuth();
  const { wishListItems } = useWish();

  return (
    <div className={`flex md:order-2 ${className}`}>
      <Dropdown
        className="bg-white-bone"
        arrowIcon={false}
        inline={true}
        label={<Avatar alt="Avatar" img={avatarImage} rounded={true} />}
      >
        <Dropdown.Item
          className="duration-300 hover:!bg-dark-brown hover:!text-white-bone"
          onClick={onCloseMenu}
        >
          <NavLink to={"wishlist"}>
            Wishlist {wishListItems.length ? `(${wishListItems.length})` : null}
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item
          className="whitespace-nowrap duration-300 hover:!bg-dark-brown hover:!text-white-bone"
          onClick={onCloseMenu}
        >
          <NavLink to={"account"}>My Account</NavLink>
        </Dropdown.Item>
        <Dropdown.Item
          className="duration-300 hover:!bg-dark-brown hover:!text-white-bone"
          onClick={onCloseMenu}
        >
          <NavLink to={"/"} onClick={() => unAuth(true, "Logout Successfully")}>
            logout
          </NavLink>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default DropdownNav;
