import mongoose from 'mongoose';

const { Schema } = mongoose;

const billingSchema = new Schema(
  {
    
  }, 
  { timestamps: true }
);

export const Billing = mongoose.model('billing', billingSchema);