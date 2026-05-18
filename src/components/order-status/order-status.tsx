import type { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const normalize = (status: string) => status.trim().toLowerCase();

const STATUS_MAP: Record<string, { text: string }> = {
  pending: { text: 'Готовится' },
  done: { text: 'Выполнен' },
  created: { text: 'Создан' }
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const key = normalize(status);
  const entry = STATUS_MAP[key];
  const text = entry?.text ?? (key.includes('cancel') ? 'Отменён' : 'Изменён');

  let textStyle = '#F2F2F3';
  if (key === 'pending') textStyle = '#E52B1A';
  else if (key === 'done') textStyle = '#00CCCC';
  else if (key.includes('cancel')) textStyle = '#F2F2F3';

  return <OrderStatusUI textStyle={textStyle} text={text} />;
};
