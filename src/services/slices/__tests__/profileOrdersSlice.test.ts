import { TOrder } from '@utils-types';

import profileOrdersReducer, { fetchProfileOrders } from '../profileOrdersSlice';

const orders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Burger',
    createdAt: '',
    updatedAt: '',
    number: 42,
    ingredients: []
  }
];

describe('profileOrders reducer', () => {
  it('обрабатывает pending', () => {
    const state = profileOrdersReducer(
      undefined,
      fetchProfileOrders.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = profileOrdersReducer(
      { orders: [], isLoading: true, error: null },
      fetchProfileOrders.fulfilled(orders, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(orders);
  });

  it('обрабатывает rejected', () => {
    const state = profileOrdersReducer(
      { orders: [], isLoading: true, error: null },
      fetchProfileOrders.rejected(null, '', undefined, 'Ошибка истории')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка истории');
  });
});
