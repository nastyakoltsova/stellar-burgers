import { combineReducers } from '@reduxjs/toolkit';

import burgerConstructorReducer from './slices/burgerConstructorSlice';
import feedsReducer from './slices/feedsSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import orderDetailReducer from './slices/orderDetailSlice';
import profileOrdersReducer from './slices/profileOrdersSlice';
import userReducer from './slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  feeds: feedsReducer,
  profileOrders: profileOrdersReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetail: orderDetailReducer,
  user: userReducer
});
