import { controllers } from '../billingPlan.controllers';
import { isFunction } from 'lodash';

describe('billing controllers', () => {
    test('has getOne and getMany controllers', () => {
        const crudMethods = [
            'getOne',
            'getMany'
        ];

        crudMethods.forEach(name => expect(isFunction(controllers[name])).toBe(true)
        );
    });
});