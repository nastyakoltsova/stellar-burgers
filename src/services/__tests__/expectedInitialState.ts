import type { RootState } from '../store';

export const expectedInitialRootState: RootState = {
  ingredients: {
    items: [],
    isLoading: false,
    error: null
  },
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  },
  profileOrders: {
    orders: [],
    isLoading: false,
    error: null
  },
  burgerConstructor: {
    bun: null,
    ingredients: [],
    orderRequestPending: false,
    orderModalTitle: '',
    orderNumber: null,
    orderError: null
  },
  orderDetail: {
    item: null,
    isLoading: false,
    error: null
  },
  user: {
    user: null,
    fetchingUser: false,
    authChecked: true,
    loginLoading: false,
    registerLoading: false,
    updateLoading: false,
    error: null
  }
};
