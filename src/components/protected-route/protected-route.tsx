import { FC, ReactElement } from 'react';
import { Navigate, useLocation, Location } from 'react-router-dom';

import { Preloader } from '@ui';

import { getCookie } from '../../utils/cookie';
import { useSelector } from '../../services/store';
import { selectAuthChecked, selectUser } from '../../services/selectors';

type TProtectedRouteProps = {
  guestOnly?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  children,
  guestOnly = false
}) => {
  const location = useLocation();
  const user = useSelector(selectUser);
  const authChecked = useSelector(selectAuthChecked);
  const hasToken = !!getCookie('accessToken');

  if (hasToken && !authChecked) {
    return <Preloader />;
  }

  const isAuthenticated = !!user;

  if (guestOnly) {
    if (isAuthenticated) {
      const redirectPath =
        (location.state as { from?: Location })?.from?.pathname || '/';
      return <Navigate to={redirectPath} replace />;
    }
    return children;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  return children;
};
