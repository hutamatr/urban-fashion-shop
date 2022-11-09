import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Avatar } from "flowbite-react";

import { useAuth, useWish } from "../../hooks/useStoreContext";
import useAxios from "../../hooks/useAxios";

import avatarImage from "../../assets/image/avatar.webp";

const DropdownNav = ({ onCloseMenu, className }) => {
  const [userEmail, setUserEmail] = useState({
    username: "",
    email: "",
  });

  const { unAuth } = useAuth();
  const { wishListItems } = useWish();
  const { requestHttp, error } = useAxios();

  useEffect(() => {
    const decode = JSON.parse(localStorage.getItem("decode"));
    requestHttp(
      {
        method: "GET",
        url: `users/${decode.sub}`,
      },
      (data) => {
        const { email, username } = data;
        setUserEmail({
          username,
          email,
        });
      }
    );
  }, [requestHttp]);

  return (
    <div className={`flex md:order-2 ${className}`}>
      <Dropdown
        className="bg-white-bone"
        arrowIcon={false}
        inline={true}
        label={<Avatar alt="Avatar" img={avatarImage} rounded={true} />}
      >
        <Dropdown.Header>
          {error.isError ? (
            <span className="block text-xs font-medium text-red-700">
              {error.errorMessage}
            </span>
          ) : (
            <>
              <span className="block text-sm">{userEmail.username}</span>
              <span className="block truncate text-sm font-medium">
                {userEmail.email}
              </span>
            </>
          )}
        </Dropdown.Header>
        <Dropdown.Item
          className="duration-300 hover:!bg-dark-brown hover:!text-white-bone"
          onClick={onCloseMenu}
        >
          <NavLink to={"wishlist"}>
            Wishlist {wishListItems.length ? `(${wishListItems.length})` : null}
          </NavLink>
        </Dropdown.Item>
        <Dropdown.Item
          className="duration-300 hover:!bg-dark-brown hover:!text-white-bone"
          onClick={onCloseMenu}
        >
          <NavLink to={"account"}> My Account</NavLink>
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
