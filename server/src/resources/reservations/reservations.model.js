import mongoose from 'mongoose';

const { Schema } = mongoose;

const Guest = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const reservationSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
      autopopulate: true
    },
    assistant: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
      autopopulate: true
    },
    guest: {
      type: Guest,
      required: true
    },
    property: {
      type: mongoose.Types.ObjectId,
      ref: 'property',
      required: true,
      autopopulate: true
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
    },
    stripeCharge: {
      type: String
    }
  },
  { timestamps: true, versionKey: false }
);

// Tasks.virtual('status').get(function() {
//   if (endDate < Date().today()) {
//     return 'overdue';
//   } else if (endDate > Date().today()) {
//     return 'upcoming';
//   } else if (endDate === Date.Today()) {
//     return 'due today';
//   }
// })

reservationSchema.plugin(require('mongoose-autopopulate'));

export const Reservation = mongoose.model('reservation', reservationSchema);
