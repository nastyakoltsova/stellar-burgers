import { FC } from 'react';

import { IngredientDetails } from '@components';

export const IngredientPage: FC = () => (
  <main className='pt-10 pl-5 pr-5 pb-10'>
    <h1 className='text text_type_main-large mb-10'>Ингредиент</h1>
    <IngredientDetails />
  </main>
);
