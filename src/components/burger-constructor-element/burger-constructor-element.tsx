import { FC, memo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

import {
  removeIngredient,
  moveIngredient
} from '../../services/slices/burgerConstructorSlice';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = useCallback(() => {
      dispatch(moveIngredient({ index, direction: 'down' }));
    }, [dispatch, index]);

    const handleMoveUp = useCallback(() => {
      dispatch(moveIngredient({ index, direction: 'up' }));
    }, [dispatch, index]);

    const handleClose = useCallback(() => {
      dispatch(removeIngredient({ id: ingredient.id }));
    }, [dispatch, ingredient.id]);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
