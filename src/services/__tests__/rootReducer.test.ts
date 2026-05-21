import { rootReducer } from '../rootReducer';
import { expectedInitialRootState } from './expectedInitialState';

describe('rootReducer', () => {
  it('возвращает полное начальное состояние store при неизвестном экшене', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(expectedInitialRootState);
  });
});
