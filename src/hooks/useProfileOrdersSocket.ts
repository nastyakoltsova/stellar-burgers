import { useEffect } from 'react';

import { useDispatch } from '../services/store';
import { setProfileOrdersFromSocket } from '../services/slices/profileOrdersSlice';

import type { TOrder } from '@utils-types';
import { getWsUserOrdersUrl } from '../utils/orders-ws-url';
import { getCookie } from '../utils/cookie';

type TOrdersWsPayload = {
  success?: boolean;
  orders?: TOrder[];
};

export const useProfileOrdersSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('accessToken');
    const url = token ? getWsUserOrdersUrl(token) : null;

    if (!url) {
      return;
    }

    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string) as TOrdersWsPayload;
        if (data.success && Array.isArray(data.orders)) {
          dispatch(setProfileOrdersFromSocket(data.orders));
        }
      } catch {}
    };

    ws.onerror = () => {
      ws.close();
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);
};
