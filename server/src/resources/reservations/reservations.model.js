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

reservationSchema.index({
  _id: 1,
  'property.name': 1,
  'property.address1': 1,
  'property.address2': 1,
  'property.city': 1,
  'property.state': 1,
  'guest.lastName': 1,
  'assistant.lastName': 1
});

export const Reservation = mongoose.model('reservation', reservationSchema);
