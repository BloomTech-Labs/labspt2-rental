import mongoose from 'mongoose';

const { Schema } = mongoose;

const discountSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Discount requires a name'],
      maxlength: 100
    },
    description: {
      type: String,
      maxlength: 500
    },
    discountPercentage: {
      type: Number,
      required: [true, 'A discount amount is required'],
      min: 0,
      max: 1
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
      },
    lastUsed: {
      type: Date,
      default: Date.now,
      required: [true, 'Last used date is a required field']
    }
  },
  { timestamps: true }
);

export const Discount = mongoose.model('discount', discountSchema);
