import { FC } from 'react';
import {
  Location,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

import { Modal, IngredientDetails, OrderInfo } from '@components';

export const FeedOrderModal: FC = () => {
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

export const ProfileOrderModal: FC = () => {
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

export const IngredientModal: FC = () => {
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
