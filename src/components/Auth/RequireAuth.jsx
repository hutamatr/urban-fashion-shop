import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useStore } from 'store/useStore';

const RequireAuth = () => {
  const isAuth = useStore((state) => state.isAuth);
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location.pathname }} replace />
  );
};

export default RequireAuth;
