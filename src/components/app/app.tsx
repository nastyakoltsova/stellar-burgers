import { FC, useEffect } from 'react';
import {
  Location,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  Modal,
  AppHeader,
  IngredientDetails,
  OrderInfo,
  ProtectedRoute
} from '@components';
import { Preloader } from '@ui';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  IngredientPage,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { fetchUser } from '../../services/slices/userSlice';
import {
  selectIngredientsLoading,
  selectIngredientsError
} from '../../services/selectors';
import { useDispatch, useSelector } from '../../services/store';

import '../../index.css';
import styles from './app.module.css';

const Layout: FC = () => {
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

const ConstructorRoute: FC = () => {
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  if (isIngredientsLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className={`${styles.error} text text_type_main-medium pt-4`}>
        {error}
      </div>
    );
  }

  return <ConstructorPage />;
};

const FeedOrderModal: FC = () => {
  const navigate = useNavigate();
  const { number } = useParams();
  const location = useLocation();
  const background = (location.state as { background?: Location })?.background;

  const onClose = () => {
    navigate(background?.pathname ?? '/feed', { replace: true });
  };

  const title = number ? `#${number}` : '';

  return (
    <Modal title={title} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};

const ProfileOrderModal: FC = () => {
  const navigate = useNavigate();
  const { number } = useParams();
  const location = useLocation();
  const background = (location.state as { background?: Location })?.background;

  const onClose = () => {
    navigate(background?.pathname ?? '/profile/orders', { replace: true });
  };

  const title = number ? `#${number}` : '';

  return (
    <Modal title={title} onClose={onClose}>
      <OrderInfo />
    </Modal>
  );
};

const IngredientModal: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const background = (location.state as { background?: Location })?.background;

  const onClose = () => {
    navigate(background?.pathname ?? '/', { replace: true });
  };

  return (
    <Modal title='Детали ингредиента' onClose={onClose}>
      <IngredientDetails />
    </Modal>
  );
};

const FeedWithOrderModal: FC = () => (
  <>
    <Feed />
    <FeedOrderModal />
  </>
);

const ProfileOrdersWithOrderModal: FC = () => (
  <>
    <ProfileOrders />
    <ProfileOrderModal />
  </>
);

const AppRoutes: FC = () => {
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
          <Route path='/feed/:number' element={<FeedWithOrderModal />} />
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
                <ProfileOrdersWithOrderModal />
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

const App: FC = () => (
  <div className={styles.app}>
    <AppRoutes />
  </div>
);

export default App;
