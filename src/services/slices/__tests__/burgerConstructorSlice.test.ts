import { TConstructorIngredient, TIngredient } from '@utils-types';

import burgerConstructorReducer, {
  addIngredient,
  moveIngredient,
  removeIngredient
} from '../burgerConstructorSlice';

jest.mock('uuid', () => {
  let counter = 0;
  return {
    v4: () => `test-id-${++counter}`
  };
});

const bun: TIngredient = {
  _id: 'bun-id',
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
};

const main: TIngredient = {
  _id: 'main-id',
  name: 'Начинка',
  type: 'main',
  proteins: 1,
  fat: 1,
  carbohydrates: 1,
  calories: 1,
  price: 200,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('burgerConstructor reducer', () => {
  it('добавляет булку', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toHaveLength(0);
  });

  it('добавляет начинку с уникальным id', () => {
    const state = burgerConstructorReducer(undefined, addIngredient(main));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      ...main,
      id: 'test-id-1'
    });
  });

  it('удаляет начинку по id', () => {
    const withIngredient = burgerConstructorReducer(
      undefined,
      addIngredient(main)
    );
    const ingredientId = withIngredient.ingredients[0].id;

    const state = burgerConstructorReducer(
      withIngredient,
      removeIngredient({ id: ingredientId })
    );

    expect(state.ingredients).toHaveLength(0);
  });

  it('меняет порядок начинок', () => {
    const first: TConstructorIngredient = {
      ...main,
      _id: 'main-1',
      id: 'id-1',
      name: 'Первая'
    };
    const second: TConstructorIngredient = {
      ...main,
      _id: 'main-2',
      id: 'id-2',
      name: 'Вторая'
    };

    const initialState = {
      bun: null,
      ingredients: [first, second],
      orderRequestPending: false,
      orderModalTitle: '',
      orderNumber: null,
      orderError: null
    };

    const state = burgerConstructorReducer(
      initialState,
      moveIngredient({ index: 1, direction: 'up' })
    );

    expect(state.ingredients[0].name).toBe('Вторая');
    expect(state.ingredients[1].name).toBe('Первая');
  });
});
