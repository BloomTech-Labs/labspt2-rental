import mongoose from 'mongoose';

const { Schema } = mongoose;

const invoiceItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is a required field'],
      maxlength: 100
    },
    description: {
      type: String,
      maxlength: 500
    },
    price: {
      type: Number,
      required: [true, 'A price must be assigned'],
      min: 0
    },
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      autopopulate: true
    },
    defaultItem: {
      type: Boolean,
      default: false,
      required: [true, 'Default distinction is required']
    },
    lastUsed: {
      type: Date,
      default: Date.now,
      required: [true, 'Last used date is a required field']
    }
  },
  { timestamps: true }
);

invoiceItemSchema.plugin(require('mongoose-autopopulate'));

export const InvoiceItem = mongoose.model('invoice_item', invoiceItemSchema);
