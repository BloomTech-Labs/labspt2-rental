import config from '../../config';
import stripeModule from 'stripe';

const keyPublishable = config.keys.stripePublishable;
const keySecret = config.keys.stripeSecret;

const stripe = stripeModule(keySecret);
const planid = 'plan_EpLtM3j2EMurWg';
const propertyQuantity = 2; // get from redux store
const subscriptionID = '';

export const render = async (req, res, next) => {
  try {
    res.render('index.js', { keyPublishable });
  } catch (err) {
    console.error(err);
  }
};

// This is a callback

const createSubscription = async (err, customer, res) => {
  console.log('subscription:');
  if (err) {
    return res
      .status(500)
      .json({ message: 'Failed to create new customer', err });
  } else {
    // console.log('customer id', customer.id);

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
        const usage = await createUsageRecord(err, subscription, res);
        if (usage) {
          console.log('usage async response:', usage);
          return res.status(200).send(usage);
        }
      }
    );
  }
};

const createUsageRecord = async (err, subscription, res) => {
  console.log('usage record:');
  if (err) {
    // console.log('subscription err', err);
    return res.status(500).json({
      message: 'Failed to create new subscription',
      err
    });
  } else {
    // Then send update to user object to store subscription id and customer id
    const subscriptionItemID = subscription.items.data[0].id;
    const currentDate = Math.floor(Date.now() / 1000);
    // console.log(
    //   'subscription id',
    //   subscriptionItemID,
    //   'timestamp',
    //   currentDate
    // );
    stripe.usageRecords.create(
      subscriptionItemID,
      {
        quantity: 2,
        timestamp: currentDate
      },
      (err, usageRecord) => {
        if (err) {
          // console.log('usage record err', err);
          return res.status(500).json({
            message: 'Failed to send usage record updating subscription',
            err
          });
        } else {
          // console.log('usage record', usageRecord);
          return res.status(200).send(usageRecord);
          // Send updated to user object to store subscription.id and customer.id
        }
      }
    );
  }
};

// amount variable passed in x100
// need: amount, stripeEmail, stripeToken id, description
// need: quantity for subscribe and update

export const subscribe = async (req, res) => {
  try {
    console.log(
      'email',
      req.body.token.email,
      'quantity',
      req.body.quantity,
      'created',
      req.body.created
    );
    const {
      id,
      email,
      address_line1,
      address_city,
      address_state,
      address_zip
    } = req.body.token;

    stripe.customers.create(
      {
        email: email,
        address_line1: address_line1,
        address_city: address_city,
        address_state: address_state,
        address_zip: address_zip,
        source: id
      },
      async (err, customer) => {
        const subscription = await createSubscription(err, customer, res);
        if (subscription) {
          console.log('subscription res', subscription);
          return res.status(200).send(subscription);
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
};

export const updateSubscription = async (req, res) => {
  try {
    stripe.subscriptions
      .update(
        `${subscriptionID}`,
        {
          items: {
            plan: planid,
            quantity: propertyQuantity
          }
        },
        (err, subscription) => {
          if (err) {
            return res.status(500).json(err);
          } else {
            // helper function to update
          }
        }
      )
      .then(() => {
        return res
          .status(201)
          .json({ message: 'Successful subscription update!' });
      })
      .catch(err => {
        return res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// allows customer to update their CC information on file
export const updateCC = async (req, res, next) => {
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
