import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedsApi();
    } catch (error) {
      return rejectWithValue(
        (error as { message?: string })?.message ||
          'Не удалось загрузить ленту заказов'
      );
    }
  }
);

export type FeedsState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: FeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    setFeedsFromSocket(
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total?: number;
        totalToday?: number;
      }>
    ) {
      state.orders = action.payload.orders;
      if (typeof action.payload.total === 'number') {
        state.total = action.payload.total;
      }
      if (typeof action.payload.totalToday === 'number') {
        state.totalToday = action.payload.totalToday;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Ошибка загрузки ленты';
      });
  }
});

export const { setFeedsFromSocket } = feedsSlice.actions;
export default feedsSlice.reducer;
