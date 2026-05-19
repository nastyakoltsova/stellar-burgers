import { FC } from 'react';

import { Preloader } from '@ui';
import { ConstructorPage } from '@pages';

import {
  selectIngredientsError,
  selectIngredientsLoading
} from '../../services/selectors';
import { useSelector } from '../../services/store';

import styles from './app.module.css';

export const ConstructorRoute: FC = () => {
  const isIngredientsLoading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  if (isIngredientsLoading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className={`${styles.error} text text_type_main-medium pt-4`}>
        {error}
      </div>
    );
  }

  return <ConstructorPage />;
};
