import mongoose from 'mongoose';

const { Schema } = mongoose;

const reservationSchema = new Schema(
  {
    manager: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    },
    assistant: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    },
    property: {
      type: mongoose.Types.ObjectId,
      ref: 'property',
      required: true
    },
    checkIn: {
      type: Date,
      required: true
    },
    checkOut: {
      type: Date,
      required: true
    },
    address1: {
      type: String,
      required: true
    },
    address2: {
      type: String
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['upcoming', 'incomplete', 'complete']
    },
    tasks: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'task'
      }
    ],
    nights: {
      type: Number,
      required: true
    },
    cleaningFee: {
      type: Number
    },
    guests: {
      type: Number,
      required: true
    },
    paid: {
      type: Boolean,
      default: false
    },
    guestLoginCode: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const Reservation = mongoose.model('reservation', reservationSchema);
