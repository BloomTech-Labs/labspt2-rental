import { BillingPlan } from '../billingPlan.model';

// name test will fail because unsure how to check enum value

describe('Billing model', () => {
  describe('schema', () => {
    test('name', () => {
      const { name } = BillingPlan.schema.obj;
      expect(name).toEqual({
        type: String,
        required: true,
        enum: ['Free', 'Midlevel', 'Enterprise']
      });
    });

    test('perPropertyPrice', () => {
      const { perPropertyPrice } = BillingPlan.schema.obj;
      expect(perPropertyPrice).toEqual({
        type: Number,
        required: true
      });
    });

    test('perTransactionFee', () => {
      const { perTransactionFee } = BillingPlan.schema.obj;
      expect(perTransactionFee).toEqual({
        type: Number,
        required: true
      });
    });
  });
});
