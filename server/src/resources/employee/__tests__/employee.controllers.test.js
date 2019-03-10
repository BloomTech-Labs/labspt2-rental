import { controllers } from '../employee.controllers';
import { isFunction } from 'lodash';

describe('employees controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'getOne',
      'getMany',
      'createOne',
      'removeOne',
      'updateOne'
    ];

    crudMethods.forEach(name =>
      expect(isFunction(controllers[name])).toBe(true)
    );
  });
});
