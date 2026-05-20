import { TIngredient } from '@utils-types';

import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';

const ingredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('ingredients reducer', () => {
  it('обрабатывает pending', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fulfilled', () => {
    const state = ingredientsReducer(
      { items: [], isLoading: true, error: null },
      fetchIngredients.fulfilled(ingredients, '', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(ingredients);
  });

  it('обрабатывает rejected', () => {
    const state = ingredientsReducer(
      { items: [], isLoading: true, error: null },
      fetchIngredients.rejected(null, '', undefined, 'Ошибка загрузки')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки');
  });
});
