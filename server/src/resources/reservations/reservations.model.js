import mongoose from 'mongoose';

const { Schema } = mongoose;

const reservationSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    },
    assistant: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    },
    guest: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
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

reservationSchema.index({ '$**': 'text' });

export const Reservation = mongoose.model('reservation', reservationSchema);
