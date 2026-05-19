import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  TLoginData,
  TRegisterData
} from '../../utils/burger-api';
import { TUser } from '@utils-types';
import { getCookie } from '../../utils/cookie';

import { clearAuthStorage, persistAuthTokens } from './authStorage';

const unwrapAuthPayload = <
  R extends {
    accessToken?: string;
    refreshToken?: string;
    success?: boolean;
    user?: TUser;
    message?: string;
  }
>(
  payload: unknown
): Pick<R, 'accessToken' | 'refreshToken' | 'success' | 'user' | 'message'> =>
  payload as R;

export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/register', async (data, { rejectWithValue }) => {
  try {
    const raw = await registerUserApi(data);
    const res = unwrapAuthPayload(raw);
    if (res.success && res.accessToken && res.refreshToken && res.user) {
      persistAuthTokens(res.accessToken, res.refreshToken);
      return res.user;
    }
    return rejectWithValue((res.message as string) || 'Ошибка регистрации');
  } catch (error) {
    return rejectWithValue(
      ((error as { message?: string })?.message ||
        'Ошибка регистрации') as string
    );
  }
});

export const loginUser = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('user/login', async (credentials, { rejectWithValue }) => {
  try {
    const raw = await loginUserApi(credentials);
    const res = unwrapAuthPayload(raw);
    if (res.success && res.accessToken && res.refreshToken && res.user) {
      persistAuthTokens(res.accessToken, res.refreshToken);
      return res.user;
    }
    return rejectWithValue((res.message as string) || 'Ошибка авторизации');
  } catch (error) {
    return rejectWithValue(
      ((error as { message?: string })?.message ||
        'Ошибка авторизации') as string
    );
  }
});

export const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const raw = await getUserApi();
      const res = unwrapAuthPayload(raw);
      if (res.success && res.user) {
        return res.user;
      }
      clearAuthStorage();
      return rejectWithValue('Не удалось получить пользователя');
    } catch (error) {
      clearAuthStorage();
      return rejectWithValue(
        ((error as { message?: string })?.message ||
          'Не удалось получить пользователя') as string
      );
    }
  },
  {
    condition: () => !!getCookie('accessToken')
  }
);

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('user/update', async (data, { rejectWithValue }) => {
  try {
    const raw = await updateUserApi(data);
    const res = unwrapAuthPayload(raw);
    if (res.success && res.user) {
      return res.user;
    }
    return rejectWithValue(
      (res.message as string) || 'Не удалось обновить данные'
    );
  } catch (error) {
    return rejectWithValue(
      ((error as { message?: string })?.message ||
        'Не удалось обновить данные') as string
    );
  }
});

export const logoutUser = createAsyncThunk('user/logout', async () => {
  try {
    await logoutApi();
  } finally {
    clearAuthStorage();
  }
});

export type UserState = {
  user: TUser | null;
  fetchingUser: boolean;
  authChecked: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  updateLoading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  fetchingUser: false,
  authChecked: !getCookie('accessToken'),
  loginLoading: false,
  registerLoading: false,
  updateLoading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.fetchingUser = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.fetchingUser = false;
        state.authChecked = true;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.fetchingUser = false;
        state.authChecked = true;
        state.user = null;
        if (action.payload) state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.authChecked = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.error = action.payload || 'Ошибка входа';
      })

      .addCase(registerUser.pending, (state) => {
        state.registerLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.authChecked = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerLoading = false;
        state.error = action.payload || 'Ошибка регистрации';
      })

      .addCase(updateUser.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload || 'Ошибка обновления';
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.authChecked = true;
      });
  }
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
