import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useStoreContext";

const RequireAuth = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate
      to={location.pathname}
      state={{ from: location }}
      replace={true}
    />
  );
};

export default RequireAuth;
