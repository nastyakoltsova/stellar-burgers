import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';

import {
  clearOrderDetail,
  fetchOrderByNumber
} from '../../services/slices/orderDetailSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectIngredients,
  selectOrderDetail,
  selectOrderDetailError,
  selectOrderDetailLoading
} from '../../services/selectors';

export const OrderInfo: FC = () => {
  const { number } = useParams();

  const dispatch = useDispatch();

  const ingredients = useSelector(selectIngredients);
  const orderDetail = useSelector(selectOrderDetail);
  const loading = useSelector(selectOrderDetailLoading);
  const loadError = useSelector(selectOrderDetailError);

  useEffect(() => {
    const parsed = number ? Number.parseInt(number, 10) : NaN;
    if (!Number.isNaN(parsed)) {
      dispatch(fetchOrderByNumber(parsed));
    }
    return () => {
      dispatch(clearOrderDetail());
    };
  }, [dispatch, number]);

  const orderInfo = useMemo(() => {
    if (!orderDetail?.ingredients?.length || ingredients.length === 0) {
      return null;
    }

    const date = new Date(orderDetail.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderDetail.ingredients.reduce(
      (acc: TIngredientsWithCount, itemId) => {
        if (!acc[itemId]) {
          const ingredient = ingredients.find((ing) => ing._id === itemId);
          if (ingredient) {
            acc[itemId] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[itemId].count++;
        }

        return acc;
      },
      {}
    );

    const infoValues = Object.values(ingredientsInfo);
    if (infoValues.length === 0) {
      return null;
    }

    const total = infoValues.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderDetail,
      ingredientsInfo,
      date,
      total
    };
  }, [orderDetail, ingredients]);

  if (!loadError && (loading || !orderDetail)) {
    return <Preloader />;
  }

  if (loadError) {
    return <p className={`text text_type_main-default p-15`}>{loadError}</p>;
  }

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
