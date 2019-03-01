import { controllers } from '../user.controllers';
import { isFunction } from 'lodash';

describe('user controllers', () => {
  test('has request user controllers', () => {
    const specialMethods = ['me', 'updateMe'];

    specialMethods.forEach(name =>
      expect(isFunction(controllers[name])).toBe(true)
    );
  });
});
