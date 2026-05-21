import { TOrder } from '@utils-types';

import orderDetailReducer, { fetchOrderByNumber } from '../orderDetailSlice';

const order: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Burger',
  createdAt: '',
  updatedAt: '',
  number: 12345,
  ingredients: []
};

describe('orderDetail reducer', () => {
  it('обрабатывает pending', () => {
    const state = orderDetailReducer(
      undefined,
      fetchOrderByNumber.pending('', 12345)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = orderDetailReducer(
      { item: null, isLoading: true, error: null },
      fetchOrderByNumber.fulfilled(order, '', 12345)
    );

    expect(state.isLoading).toBe(false);
    expect(state.item).toEqual(order);
  });

  it('обрабатывает rejected', () => {
    const state = orderDetailReducer(
      { item: null, isLoading: true, error: null },
      fetchOrderByNumber.rejected(null, '', 12345, 'Заказ не найден')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Заказ не найден');
  });
});
