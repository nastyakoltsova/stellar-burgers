import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

export const fetchOrderByNumber = createAsyncThunk<
  TOrder,
  number,
  { rejectValue: string }
>('orderDetail/fetch', async (number, { rejectWithValue }) => {
  try {
    const data = await getOrderByNumberApi(number);
    const raw = data as {
      success?: boolean;
      orders?: TOrder[];
      message?: string;
    };
    if (raw.success && raw.orders?.length) {
      return raw.orders[0];
    }
    return rejectWithValue((raw.message as string) || 'Заказ не найден');
  } catch (error) {
    return rejectWithValue(
      ((error as { message?: string })?.message ||
        'Не удалось загрузить заказ') as string
    );
  }
});

type OrderDetailState = {
  item: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderDetailState = {
  item: null,
  isLoading: false,
  error: null
};

const orderDetailSlice = createSlice({
  name: 'orderDetail',
  initialState,
  reducers: {
    clearOrderDetail(state) {
      state.item = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка';
      });
  }
});

export const { clearOrderDetail } = orderDetailSlice.actions;
export default orderDetailSlice.reducer;
