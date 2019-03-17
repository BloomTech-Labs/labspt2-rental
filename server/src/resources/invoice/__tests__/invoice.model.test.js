import { Invoices } from '../invoice.model';
import mongoose from 'mongoose';

describe('Invoices model', () => {
  describe('schema', () => {
    test('reservation', () => {
      const { reservation } = Invoices.schema.obj;
      expect(reservation).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'reservation',
        required: [true, 'A reservation link is required']
      });
    });

    test('createdBy', () => {
      const { createdBy } = Invoices.schema.obj;
      expect(createdBy).toEqual({
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: [true, 'createdBy is a required field']
      });
    });

    test('lineItems', () => {
      const { lineItems } = Invoices.schema.obj;
      expect(lineItems).toEqual([
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'invoice-item',
          required: [true, 'Invoice must have line items']
        }
      ]);
    });

    test('discounts', () => {
      const { discounts } = Invoices.schema.obj;
      expect(discounts).toEqual([
        {
          type: mongoose.SchemaTypes.ObjectId,
          ref: 'discount'
        }
      ]);
    });

    test('invoiceDate', () => {
      const { invoiceDate } = Invoices.schema.obj;
      expect(invoiceDate).toEqual({
        type: Date,
        default: Date.now,
        required: [true, 'An invoice date is required']
      });
    });

    test('message', () => {
      const { message } = Invoices.schema.obj;
      expect(message).toEqual({
        type: String,
        default: 'We hope you enjoyed your stay.'
      });
    });
  });
});
