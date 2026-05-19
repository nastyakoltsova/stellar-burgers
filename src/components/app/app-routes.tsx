import { FC } from 'react';
import { Location, Route, Routes, useLocation } from 'react-router-dom';

import { ProtectedRoute } from '@components';
import {
  Feed,
  FeedOrderPage,
  ForgotPassword,
  IngredientPage,
  Login,
  NotFound404,
  Profile,
  ProfileOrderPage,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { ConstructorRoute } from './constructor-route';
import { FeedOrderModal, IngredientModal, ProfileOrderModal } from './modals';
import { Layout } from './layout';

export const AppRoutes: FC = () => {
  const location = useLocation();
  const background = (
    location.state as { background?: Location } | null | undefined
  )?.background;

  const displayLocation = background ?? location;

  return (
    <>
      <Routes location={displayLocation}>
        <Route element={<Layout />}>
          <Route path='/' element={<ConstructorRoute />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<FeedOrderPage />} />
          <Route
            path='/login'
            element={
              <ProtectedRoute guestOnly>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path='/register'
            element={
              <ProtectedRoute guestOnly>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path='/forgot-password'
            element={
              <ProtectedRoute guestOnly>
                <ForgotPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <ProtectedRoute guestOnly>
                <ResetPassword />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders'
            element={
              <ProtectedRoute>
                <ProfileOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <ProfileOrderPage />
              </ProtectedRoute>
            }
          />
          <Route path='/ingredients/:id' element={<IngredientPage />} />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path='/feed/:number' element={<FeedOrderModal />} />
          <Route path='/ingredients/:id' element={<IngredientModal />} />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <ProfileOrderModal />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </>
  );
};
