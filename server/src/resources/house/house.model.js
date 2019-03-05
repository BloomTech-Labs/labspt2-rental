import mongoose from 'mongoose';

const { Schema } = mongoose;

const houseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is a required field'],
      unique: [true, 'Name must be unique']
    },
    assistants: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user'
      }
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'user'
    },
    address: {
      type: String,
      required: [true, 'Address is a required field']
    },
    price: {
      type: Number,
      required: true
    },
    tasks: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'task'
      }
    ]
  },
  { timestamps: true }
);

export const House = mongoose.model('house', houseSchema);
