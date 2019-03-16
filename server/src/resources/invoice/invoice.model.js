import mongoose from 'mongoose';

const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    reservation: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'reservation'
    },
    createdBy: {
      type: ''
    },
    lineItems: {
      type: ''
    },
    discounts: {
      type: ''
    },
    invoiceDate: {
      type: ''
    },
    message: {
      type: ''
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
