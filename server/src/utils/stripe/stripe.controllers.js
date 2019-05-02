/* eslint-disable camelcase */
import config from '../../config';
import stripeModule from 'stripe';
import { User } from '../../resources/user/user.model';
import { Reservation } from '../../resources/reservations/reservations.model';

const keyPublishable = config.keys.stripePublishable;
const keySecret = config.keys.stripeSecret;
const planid = config.keys.stripePlan;

const stripe = stripeModule(keySecret);

let userID = '';

let userObject = {
  stripeCustomerID: '',
  subscriptionID: '',
  subscriptionItemID: '',
  cardID: '',
  last4: '',
  cardType: '',
  cardExpiration: '',
  billingPlan: '',
  billingAddress: {
    address1: '',
    city: '',
    state: ''
  }
};

export const render = async (req, res, next) => {
  try {
    res.render('index.js', { keyPublishable });
  } catch (err) {
    console.error(err);
  }
};

// Callback functions used for subscribing

const createSubscription = async (err, customer, res) => {
  if (err && err != null) {
    return res
      .status(500)
      .json({ message: 'Failed to create new customer', err });
  } else {
    userObject.stripeCustomerID = customer.id;
    userObject.cardID = customer.sources.data[0].id;
    userObject.last4 = customer.sources.data[0].last4;
    userObject.cardType = customer.sources.data[0].brand;
    userObject.cardExpiration = `${customer.sources.data[0].exp_month}/${
      customer.sources.data[0].exp_year
    }`;
    stripe.subscriptions.create(
      {
        customer: customer.id,
        items: [
          {
            plan: planid
          }
        ]
      },
      async (err, subscription) => {
        userObject.subscriptionID = subscription.id;
        const subscriptionItemID = subscription.items.data[0].id;
        userObject.subscriptionItemID = subscriptionItemID;
        const updateUser = await updateUserWithStripeInfo(err, res);
        if (updateUser) {
          return res.status(200).send(updateUser);
        } else if (err != null) {
          return res
            .status(500)
            .json({ message: 'Failed to update user record', err });
        }
      }
    );
  }
};

const updateUserWithStripeInfo = async (err, res) => {
  if (err && err != null) {
    return res.status(500).json({
      message: 'Failed to create new subscription',
      err
    });
  } else {
    try {
      const user = await User.findByIdAndUpdate(userID, userObject, {
        new: true
      })
        .select('-password')
        .lean()
        .exec();

      if (user) {
        return res.status(201).send(user);
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Failed to updated user record', err });
    }
  }
};

// Subscribe is for first time customers. It runs through a series of callback functions:
// 1. Creates a new customer with stripe
// 2. Creates their subscription to the Roostr monthly metered plan
// 3. Updates their User profile on the database with Stripe customer info and new billing plan
// Billing plan will be used like role permissions to determine if a user is allowed to add additional properties. Rather than having the user choose which plan, we'll upgrade them and let them know when they're being bumped to the next tier (10) or downgraded on billing. Do it automatically.

// Remove billing plan model and update seed data to free/upgraded for billing plan on user object.

export const subscribe = async (req, res) => {
  try {
    userID = req.user._id;

    const { id, email, name } = req.body.token;

    const { address } = req.body;

    userObject.billingAddress.address1 = address.address_line1;
    userObject.billingAddress.city = address.address_city;
    userObject.billingAddress.state = address.address_state;

    userObject.billingPlan = req.body.updatedPlan;

    stripe.customers.create(
      {
        email: email,
        name: name,
        source: id
      },
      async (err, customer) => {
        const subscription = await createSubscription(err, customer, res);
        if (subscription) {
          return res.status(200);
        } else if (err != null) {
          return res
            .status(500)
            .json({ message: 'Unable to create subscription', err });
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

// Fetches user's subscription details

export const getSubscription = async (req, res) => {
  stripe.subscriptions.retrieve(
    req.body.subscriptionID,
    (err, subscription) => {
      if (err && err != null) {
        return res.status(500).json({
          message: 'Failed to fetch user subscription',
          err
        });
      } else {
        return res.status(201);
      }
    }
  );
};

// Used for updating the quantity of properties on the user object and sending the updated usage amount to Stripe for adjusting their monthly subscription charge

export const updateUsage = async (req, res) => {
  userID = req.body._id;
  const userInfo = {
    quantity: req.body.quantity,
    subscriptionItemID: req.body.subscriptionItemID
  };

  const updatedUsage = await createUsageRecord(userInfo, res);
  if (updatedUsage) {
    return res.status(201);
  } else {
    return res.status(500).json({ message: 'Unable to update usage record' });
  }
};

// Just send success 201 from this endpoint so that Jess can hit the next endpoint to add the property

const createUsageRecord = async (user, res) => {
  const currentDate = Math.floor(Date.now() / 1000);
  stripe.usageRecords.create(
    user.subscriptionItemID,
    {
      quantity: user.quantity,
      timestamp: currentDate
    },
    (err, usageRecord) => {
      if (err && err != null) {
        return res.status(500).json({
          message: 'Failed to send usage record updating subscription',
          err
        });
      } else {
        return res.status(201);
      }
    }
  );
};

// Runs a single charge for guests paying reservations
// If not in development mode, source must be req.body.token.id; in test mode, source must be 'tok_visa' or 'tok_mastercard'
// Automatically sends guests a receipt when in live mode, but not test mode.

export const singleCharge = async (req, res) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { id, email, name, address_zip } = req.body.token;
    const reservationID = req.body.reservationID;

    stripe.charges.create(
      {
        amount: req.body.amount,
        currency: 'usd',
        receipt_email: email,
        name: name,
        address_zip: address_zip,
        source: 'tok_visa'
      },
      async (err, charge) => {
        if (err && err != null) {
          return res
            .status(500)
            .json({ message: 'Unable to process payment', err });
        } else {
          const updateUserObject = {
            paid: true,
            stripeCharge: charge.id
          };
          try {
            const reservation = await Reservation.findByIdAndUpdate(
              reservationID,
              updateUserObject,
              {
                new: true
              }
            )
              .select()
              .lean()
              .exec();

            if (reservation) {
              return res.status(201).send(reservation);
            }
          } catch (err) {
            return res
              .status(500)
              .json({ message: 'Failed to updated reservation record', err });
          }
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

// Updating card details including card number:

export const updateCC = async (req, res) => {
  try {
    userID = req.user._id;
    const { customerID } = req.body;

    stripe.customers.update(
      customerID,
      { source: req.body.token.id },
      async (err, customer) => {
        if (err && err != null) {
          console.log(err);
          return res
            .status(500)
            .json({ message: 'Could not update user card', err });
        } else {
          const cardUpdates = {
            cardID: customer.sources.data[0].id,
            last4: customer.sources.data[0].last4,
            cardType: customer.sources.data[0].brand,
            cardExpiration: `${customer.sources.data[0].exp_month} / ${
              customer.sources.data[0].exp_year
            }`,
            billingAddress: {
              address1: customer.sources.data[0].address_line1,
              city: customer.sources.data[0].address_city,
              state: customer.sources.data[0].address_state,
              zip: customer.sources.data[0].address_zip
            }
          };

          const updateUser = await User.findByIdAndUpdate(userID, cardUpdates, {
            new: true
          })
            .select('-password')
            .lean()
            .exec();

          if (updateUser) {
            return res.status(201).send(updateUser);
          }
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
