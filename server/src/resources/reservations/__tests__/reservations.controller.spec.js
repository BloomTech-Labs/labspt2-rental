import { controllers } from '../reservations.controllers';
import { isFunction } from 'lodash';

describe('reservation controllers', () => {
  test('has crud controllers', () => {
    const crudControllers = [
      'getOne',
      'getMany',
      'createOne',
      'removeOne',
      'updateOne'
    ];
    crudControllers.forEach(name =>
      expect(isFunction(controllers[name])).toBe(true)
    );
  });
});
