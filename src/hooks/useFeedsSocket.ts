import { useEffect } from 'react';

import { useDispatch } from '../services/store';
import { setFeedsFromSocket } from '../services/slices/feedsSlice';

import type { TOrder } from '@utils-types';
import { getWsOrdersAllUrl } from '../utils/orders-ws-url';

type TFeedsWsMessage = {
  success?: boolean;
  orders?: TOrder[];
  total?: number;
  totalToday?: number;
};

export const useFeedsSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const url = getWsOrdersAllUrl();
    if (!url) {
      return;
    }

    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string) as TFeedsWsMessage;
        if (!data.success || !Array.isArray(data.orders)) {
          return;
        }

        dispatch(
          setFeedsFromSocket({
            orders: data.orders,
            total: data.total,
            totalToday: data.totalToday
          })
        );
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
