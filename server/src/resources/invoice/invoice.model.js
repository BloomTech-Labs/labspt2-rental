import mongoose from 'mongoose';

const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    reservation: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'reservation',
      required: [true, 'A reservation link is required']
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: [true, 'createdBy is a required field']
    },
    lineItems: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'invoice-item',
        required: [true, 'Invoice must have line items']
      }
    ],
    discounts: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'discount'
      }
    ],
    invoiceDate: {
      type: Date,
      default: Date.now,
      required: [true, 'An invoice date is required']
    },
    message: {
      type: String,
      default: 'We hope you enjoyed your stay.'
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
      required: [true, 'Invoice total is a required field']
    }
  },
  { timestamps: true }
);

/*
Schema description -

reservation - ties to the reservation which gives us
  - reservationID
  - guest
  - property
  - # nights stay
  - cleaning fee
createdBy - owner of this item
lineItems - additional items to invoice (obligatory bottle of wine)
discounts - what discounts are applied to invoice
invoiceDate - date of invoice
message - personal message that invoicer can add to guest (defaults to "Please come again")
*/
export const Invoices = mongoose.model('invoices', invoiceSchema);
