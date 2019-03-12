import { Billing } from '../billingPlan.model';

//name test will fail because unsure how to check enum value

describe('Billing model', () => {
    describe('schema', () => {

        test('name', () => {
            const { name } = Billing.schema.obj;
            expec(name).toEqual({
                type: String,
                required: true,
                enum: ['Free', 'Midlevel', 'Enterprise']
            });
        });

        test('perPropertyPrice', () => {
            const { perPropertyPrice } = Billing.schema.obj;
            expect(perPropertyPrice).toEqual({
                type: Number,
                required: true
            });
        });

        test('perTransactionFee', () => {
            const { perTransactionFee } = Billing.schema.obj;
            expect(perTransactionFee).toEqual({
                type: Number,
                required: true
            });
        });
    });
});