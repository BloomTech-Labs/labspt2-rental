import mongoose from 'mongoose';

const { Schema } = mongoose;

const reservationSchema = new Schema(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    },
    house: {
      type: mongoose.Types.ObjectId,
      ref: 'house',
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
    tasks: [Task],
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