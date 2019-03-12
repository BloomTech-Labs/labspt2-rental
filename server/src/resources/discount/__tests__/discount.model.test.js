import { Discount } from '../discount.model';
import mongoose from 'mongoose';

describe('discount model', () => {
  describe('schema', () => {
    test('name', () => {
      const { name } = Discount.schema.obj;
      expect(name).toEqual({
        type: String,
        required: [true, 'Discount requires a name'],
        maxlength: 100
      });
    });

    test('description', () => {
      const { description } = Discount.schema.obj;
      expect(description).toEqual({
        type: String,
        maxlength: 500
      });
    });

    test('discountPercentage', () => {
      const { discountPercentage } = Discount.schema.obj;
      expect(discountPercentage).toEqual({
        type: Number,
        required: [true, 'A discount amount is required'],
        min: 0,
        max: 1
      });
    });

    test('owner', () => {
      const { owner } = Discount.schema.obj;
      expect(owner).toEqual({
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'user'
        });
    });

    test('lastUsed', () => {
      const { lastUsed } = Discount.schema.obj;
      expect(lastUsed).toEqual({ 
        type: Date,
        default: Date.now,
        required: [true, 'Last used date is a required field'] 
      });
    });
  });
});
