import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { OrderInfo, ProfileMenu } from '@components';

import styles from '../../components/ui/pages/profile-orders/profile-orders.module.css';

export const ProfileOrderPage: FC = () => {
  const { number } = useParams();

  return (
    <main className={styles.main}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        <h1 className='text text_type_main-large mb-10'>
          {number ? `#${number}` : 'Заказ'}
        </h1>
        <OrderInfo />
      </div>
    </main>
  );
};
