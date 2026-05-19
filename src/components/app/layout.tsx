import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '@components';

import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchUser } from '../../services/slices/userSlice';
import { useDispatch } from '../../services/store';

export const Layout: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Outlet />
    </>
  );
};
