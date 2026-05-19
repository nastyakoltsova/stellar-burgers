import type { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients.items;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectFeedsOrders = (state: RootState) => state.feeds.orders;

export const selectFeedsTotals = (state: RootState) => ({
  total: state.feeds.total,
  totalToday: state.feeds.totalToday
});

export const selectFeedsLoading = (state: RootState) => state.feeds.isLoading;

export const selectFeedsError = (state: RootState) => state.feeds.error;

export const selectProfileOrders = (state: RootState) =>
  state.profileOrders.orders;

export const selectProfileOrdersLoading = (state: RootState) =>
  state.profileOrders.isLoading;

export const selectProfileOrdersError = (state: RootState) =>
  state.profileOrders.error;

export const selectUser = (state: RootState) => state.user.user;

export const selectIsAuthenticated = (state: RootState) => !!state.user.user;

export const selectAuthChecked = (state: RootState) => state.user.authChecked;

export const selectFetchingUser = (state: RootState) => state.user.fetchingUser;

export const selectLoginLoading = (state: RootState) => state.user.loginLoading;

export const selectRegisterLoading = (state: RootState) =>
  state.user.registerLoading;

export const selectUpdateLoading = (state: RootState) =>
  state.user.updateLoading;

export const selectAuthError = (state: RootState) => state.user.error;

export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;

export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;

export const selectOrderSubmitPending = (state: RootState) =>
  state.burgerConstructor.orderRequestPending;

export const selectConstructorOrderModalTitle = (state: RootState) =>
  state.burgerConstructor.orderModalTitle;

export const selectConstructorOrderNumber = (state: RootState) =>
  state.burgerConstructor.orderNumber;

export const selectOrderSubmitError = (state: RootState) =>
  state.burgerConstructor.orderError;

export const selectOrderDetail = (state: RootState) => state.orderDetail.item;

export const selectOrderDetailLoading = (state: RootState) =>
  state.orderDetail.isLoading;

export const selectOrderDetailError = (state: RootState) =>
  state.orderDetail.error;

export const selectIngredientQuantities = (
  state: RootState
): Record<string, number> => {
  const { bun, ingredients } = state.burgerConstructor;
  const map: Record<string, number> = {};
  if (bun) map[bun._id] = (map[bun._id] || 0) + 2;
  ingredients.forEach((item) => {
    map[item._id] = (map[item._id] || 0) + 1;
  });
  return map;
};
