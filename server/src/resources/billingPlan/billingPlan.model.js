import mongoose from 'mongoose';

const { Schema } = mongoose;

const billingPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ['Free', 'Midlevel', 'Enterprise']
    },
    perPropertyPrice: {
      type: Number,
      required: true
    },
    perTransactionFee: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export const BillingPlan = mongoose.model('billingPlan', billingPlanSchema);
