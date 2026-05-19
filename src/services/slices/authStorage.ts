import { deleteCookie, setCookie } from '../../utils/cookie';

export const persistAuthTokens = (
  accessToken: string,
  refreshToken: string
) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

export const clearAuthStorage = () => {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
};
