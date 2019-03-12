import { controllers } from '../task.controllers';
import { isFunction } from 'lodash';

describe('task controllers', () => {
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
