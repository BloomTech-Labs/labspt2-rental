import config from '../../config';
import stripeModule from 'stripe';

const keyPublishable = config.keys.stripePublishable;
const keySecret = config.keys.stripeSecret;

const stripe = stripeModule(keySecret);

export const render = async (req, res, next) => {
  try {
    res.render('index.js', { keyPublishable });
  } catch (err) {
    console.error(err);
  }
};

// amount variable passed in x100
// need: amount, stripeEmail, stripeToken, description

export const charge = async (req, res, next) => {
  try {
    let amount = req.body.amount;

    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer => {
        stripe.charges
          .create({
            amount,
            description: req.body.description,
            currency: 'usd',
            customer: customer.id
          })
          .then(charge => res.render('charge.pug'));
      });
  } catch (err) {
    console.error(err);
  }
};
