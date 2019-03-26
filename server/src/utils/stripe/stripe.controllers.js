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

export const subscribe = async (req, res, next) => {
  // console.log("req.body", req.body)
  try {
    // will need billing address, email, amount
    const { id, email, amount, description } = req.body;

    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: id
      })
      .then(customer => {
        // save customer id for billing
        stripe.subscriptions
          .create({
            customer: customer.id,
            items: [{ plan: planid }]
          })
          .then(charge => {
            console.log('charge', charge);
            res.status(200).send();
          })
          .catch(err => res.send(err));
      })
      .catch(err => res.send(err));
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

// allows customer to update their CC information on file
export const update = async (req, res, next) => {
  try {
    const { customer, id } = req.body;
    stripe.customers.update(`${customer.id}`, {
      source: id
    });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
