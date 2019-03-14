const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const config = require('../../config');

console.log(config.keys.stripePublishable);

const stripe = require('stripe')(keySecret);

const payment = require('express')();

payment.set('view engine', 'pug');
payment.use(require('body-parser').urlencoded({ extended: false }));

payment.get('/', (req, res) => {
  res.render('index.push', { keyPublishable });
});
