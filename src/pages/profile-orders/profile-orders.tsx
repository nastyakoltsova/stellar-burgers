import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { FC, useEffect } from 'react';

import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';
import { useProfileOrdersSocket } from '../../hooks/useProfileOrdersSocket';

import { useDispatch, useSelector } from '../../services/store';
import {
  selectProfileOrders,
  selectProfileOrdersLoading
} from '../../services/selectors';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useProfileOrdersSocket();

  const orders = useSelector(selectProfileOrders);
  const loading = useSelector(selectProfileOrdersLoading);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (loading && orders.length === 0) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
