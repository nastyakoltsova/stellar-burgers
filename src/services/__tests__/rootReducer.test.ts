import { rootReducer } from '../rootReducer';

describe('rootReducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state.ingredients).toEqual({
      items: [],
      isLoading: false,
      error: null
    });
    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: [],
      orderRequestPending: false,
      orderModalTitle: '',
      orderNumber: null,
      orderError: null
    });
    expect(state.user.user).toBeNull();
    expect(state.user.authChecked).toBe(true);
    expect(state.feeds.orders).toEqual([]);
    expect(state.profileOrders.orders).toEqual([]);
    expect(state.orderDetail.item).toBeNull();
  });
});
