import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { OrderInfo } from '@components';

export const FeedOrderPage: FC = () => {
  const { number } = useParams();

  return (
    <main className='pt-10 pl-5 pr-5 pb-10'>
      <h1 className='text text_type_main-large mb-10'>
        {number ? `#${number}` : 'Заказ'}
      </h1>
      <OrderInfo />
    </main>
  );
};
