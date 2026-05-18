import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  submitOrder,
  clearOrderFeedback
} from '../../services/slices/burgerConstructorSlice';
import { fetchProfileOrders } from '../../services/slices/profileOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectConstructorBun,
  selectConstructorIngredients,
  selectConstructorOrderNumber,
  selectConstructorOrderModalTitle,
  selectOrderSubmitPending
} from '../../services/selectors';
import type { TOrder, TConstructorIngredient } from '@utils-types';

import { BurgerConstructorUI } from '@ui';

import { getCookie } from '../../utils/cookie';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const bun = useSelector(selectConstructorBun);
  const ingredients = useSelector(selectConstructorIngredients);
  const orderSubmitPending = useSelector(selectOrderSubmitPending);
  const orderModalTitleStored = useSelector(selectConstructorOrderModalTitle);
  const orderNumber = useSelector(selectConstructorOrderNumber);

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

  const orderModalData: TOrder | null =
    orderNumber !== null
      ? ({
          number: orderNumber,
          name: orderModalTitleStored,
          _id: '',
          status: 'done',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ingredients: []
        } as TOrder)
      : null;

  const closeOrderModal = () => dispatch(clearOrderFeedback());

  const onOrderClick = async () => {
    if (!bun || orderSubmitPending) {
      return;
    }
    if (!getCookie('accessToken')) {
      navigate('/login', { replace: false, state: { from: location } });
      return;
    }

    const fillingIds = ingredients.map((i) => i._id);
    const ids = [bun._id, ...fillingIds, bun._id];

    try {
      await dispatch(submitOrder(ids)).unwrap();
      dispatch(fetchProfileOrders());
    } catch {}
  };

  const showingOrderLoader = orderSubmitPending && orderNumber === null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={showingOrderLoader}
      constructorItems={constructorItems}
      orderModalData={showingOrderLoader ? null : orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
