require('dotenv').config();

export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET
  },
  keys: {
    stripePublishable: process.env.STRIPE_PUB,
    stripeSecret: process.env.STRIPE_SECRET,
    stripePlan: process.env.STRIPE_PLAN,
    sendgrid: process.env.SENDGRID
  },
  dbUrl: 'mongodb://localhost:27017/mentorlabs-dev',
  origin: 'http://localhost:3000'
};
