import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { orderBurgerApi } from '../../utils/burger-api';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export const submitOrder = createAsyncThunk(
  'burgerConstructor/submitOrder',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      return await orderBurgerApi(ingredientIds);
    } catch (error) {
      return rejectWithValue(
        (error as { message?: string })?.message || 'Не удалось оформить заказ'
      );
    }
  }
);

export type BurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequestPending: boolean;
  orderModalTitle: string;
  orderNumber: number | null;
  orderError: string | null;
};

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: [],
  orderRequestPending: false,
  orderModalTitle: '',
  orderNumber: null,
  orderError: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const ing = action.payload;
      if (ing.type === 'bun') {
        state.bun = ing;
        return;
      }
      state.ingredients.push({ ...ing, id: uuidv4() });
    },
    removeIngredient(state, action: PayloadAction<{ id: string }>) {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload.id
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ index: number; direction: 'up' | 'down' }>
    ) {
      const { index, direction } = action.payload;
      const delta = direction === 'up' ? -1 : 1;
      const toIndex = index + delta;
      if (
        index < 0 ||
        index >= state.ingredients.length ||
        toIndex < 0 ||
        toIndex >= state.ingredients.length
      ) {
        return;
      }
      const list = [...state.ingredients];
      const swap = list[index];
      list[index] = list[toIndex];
      list[toIndex] = swap;
      state.ingredients = list;
    },
    clearOrderFeedback(state) {
      state.orderRequestPending = false;
      state.orderModalTitle = '';
      state.orderNumber = null;
      state.orderError = null;
    },
    resetConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.orderRequestPending = true;
        state.orderModalTitle = 'Оформляем заказ...';
        state.orderNumber = null;
        state.orderError = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.orderRequestPending = false;
        state.orderModalTitle = action.payload.name;
        state.orderNumber = action.payload.order.number;
        state.bun = null;
        state.ingredients = [];
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.orderRequestPending = false;
        state.orderModalTitle = '';
        state.orderNumber = null;
        state.orderError = (action.payload as string) || 'Ошибка заказа';
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearOrderFeedback,
  resetConstructor
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
