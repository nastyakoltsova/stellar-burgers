import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const items = useSelector(selectIngredients);

  const ingredientData = useMemo(
    () => (id ? items.find((item) => item._id === id) : undefined),
    [id, items]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
