import { InvoiceItem } from '../invoice_items.model';
import mongoose from 'mongoose';

describe('Invoice items model', () => {
  describe('schema', () => {
    test('name', () => {
      const { name } = InvoiceItem.schema.obj;
      expect(name).toEqual({
        type: String,
        required: [true, 'Name is a required field'],
        maxlength: 100
      });
    });

    test('description', () => {
      const { description } = InvoiceItem.schema.obj;
      expect(description).toEqual({
        type: String,
        maxlength: 500
      });
    });

    test('price', () => {
      const { price } = InvoiceItem.schema.obj;
      expect(price).toEqual({
        type: Number,
        required: [true, 'A price must be assigned'],
        min: 0
      });
    });

    test('owner', () => {
      const { owner } = InvoiceItem.schema.obj;
      expect(owner).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      });
    });

    test('defaultItem', () => {
      const { defaultItem } = InvoiceItem.schema.obj;
      expect(defaultItem).toEqual({
        type: Boolean,
        default: false,
        required: [true, 'Default distinction is required']
      });
    });

    test('lastUsed', () => {
      const { lastUsed } = InvoiceItem.schema.obj;
      expect(lastUsed).toEqual({
        type: Date,
        default: Date.now,
        required: [true, 'Last used date is a required field']
      });
    });
  });
});
