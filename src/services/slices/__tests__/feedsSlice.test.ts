import { TOrder } from '@utils-types';

import feedsReducer, { fetchFeeds } from '../feedsSlice';

const orders: TOrder[] = [
  {
    _id: 'order-1',
    status: 'done',
    name: 'Burger',
    createdAt: '',
    updatedAt: '',
    number: 1,
    ingredients: []
  }
];

const feedsPayload = {
  success: true,
  orders,
  total: 100,
  totalToday: 10
};

describe('feeds reducer', () => {
  it('обрабатывает pending', () => {
    const state = feedsReducer(undefined, fetchFeeds.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = feedsReducer(
      {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: null
      },
      fetchFeeds.fulfilled(feedsPayload, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  it('обрабатывает rejected', () => {
    const state = feedsReducer(
      {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: true,
        error: null
      },
      fetchFeeds.rejected(null, '', undefined, 'Ошибка ленты')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка ленты');
  });
});
