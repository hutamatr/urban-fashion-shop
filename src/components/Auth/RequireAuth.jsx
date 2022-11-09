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
      to={"/login"}
      state={{ from: location.pathname }}
      replace={true}
    />
  );
};

export default RequireAuth;
