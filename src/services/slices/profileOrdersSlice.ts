import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (error) {
      return rejectWithValue(
        (error as { message?: string })?.message ||
          'Не удалось загрузить историю заказов'
      );
    }
  }
);

export type ProfileOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ProfileOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {
    setProfileOrdersFromSocket(state, action: PayloadAction<TOrder[]>) {
      state.orders = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as string) || 'Ошибка загрузки истории заказов';
      });
  }
});

export const { setProfileOrdersFromSocket } = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;
