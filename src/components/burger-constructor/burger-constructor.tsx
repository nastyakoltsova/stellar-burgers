import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  submitOrder,
  clearOrderFeedback
} from '../../services/slices/burgerConstructorSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorBun,
  selectConstructorIngredients,
  selectConstructorOrderNumber,
  selectConstructorOrderModalTitle,
  selectIsAuthenticated,
  selectOrderSubmitPending
} from '../../services/selectors';
import type { TConstructorIngredient } from '@utils-types';

import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const orderSubmitPending = useSelector(selectOrderSubmitPending);
  const orderNumber = useSelector(selectConstructorOrderNumber);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const constructorItems = useMemo(
    () => ({
      bun,
      ingredients
    }),
    [bun, ingredients]
  );

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const closeOrderModal = () => dispatch(clearOrderFeedback());

  const onOrderClick = async () => {
    if (!bun || orderSubmitPending) {
      return;
    }
    if (!isAuthenticated) {
      navigate('/login', { replace: false, state: { from: location } });
      return;
    }

    const fillingIds = ingredients.map((i) => i._id);
    const ids = [bun._id, ...fillingIds, bun._id];

    try {
      await dispatch(submitOrder(ids)).unwrap();
    } catch {}
  };

  const showingOrderLoader = orderSubmitPending && orderNumber === null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={showingOrderLoader}
      constructorItems={constructorItems}
      orderNumber={showingOrderLoader ? null : orderNumber}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
