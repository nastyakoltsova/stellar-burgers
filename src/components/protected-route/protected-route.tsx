import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { getCookie } from '../../utils/cookie';

type TProtectedRouteProps = {
  guestOnly?: boolean;
  children: ReactElement;
};

const isAuthenticated = () => !!getCookie('accessToken');

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  children,
  guestOnly = false
}) => {
  const location = useLocation();

  if (guestOnly && isAuthenticated()) {
    return <Navigate to='/' replace />;
  }

  if (!guestOnly && !isAuthenticated()) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return children;
};
