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

// amount variable passed in x100
// need: amount, stripeEmail, stripeToken id, description
// need: quantity for subscribe and update

export const subscribe = async (req, res) => {
  try {
    const { id, stripeEmail } = req.body;
    stripe.customers.create(
      {
        email: stripeEmail,
        source: id
      },
      (err, customer) => {
        if (err) {
          return res
            .status(500)
            .json({ message: 'Failed to create new customer', err });
        } else {
          console.log('customer id', customer.id);
          stripe.subscriptions.create(
            {
              customer: customer.id,
              items: [
                {
                  plan: planid
                }
              ]
            },
            (err, subscription) => {
              if (err) {
                console.log('subscription err', err);
                return res.status(500).json({
                  message: 'Failed to create new subscription',
                  err
                });
              } else {
                // Then send update to user object to store subscription id and customer id
                console.log('subscription id', subscription.id, 'subscription object', subscription);
                res.status(200).send();
                // stripe.usageRecords.create(
                //   subscription.id,
                //   {
                //     quantity: 2,
                //     timestamp: Date.now()
                //   },
                //   (err, usageRecord) => {
                //     if (err) {
                //       console.log('usage record err', err);
                //       return res.status(500).json({
                //         message:
                //           'Failed to send usage record updating subscription',
                //         err
                //       });
                //     } else {
                //       console.log('usage record', usageRecord);
                //       // Send updated to user object to store subscription.id and customer.id
                //     }
                //   }
                // );
              }
            }
          );
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
