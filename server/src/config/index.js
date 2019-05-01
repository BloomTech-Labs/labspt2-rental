import { merge } from 'lodash';
const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isProd: env === 'production',
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 5000,
  secrets: {
    jwt: 'local secrets are no fun',
    jwtExp: '100d'
  },
  stripe: {
    stripe_pub: 'pk_test_Il1MCOR4thnvsuNgiwCaJzOw',
    stripe_secret: 'sk_test_DNgeIDV0yXsWhahC6Wq4ZKg9',
    stripe_plan: 'plan_EpLtM3j2EMurWg'
  },
  sendgrid:
    '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'
};

let envConfig = {};

switch (env) {
  case 'prod':
  case 'production':
    envConfig = require('./prod').config;
    break;
  case 'dev':
  case 'development':
    envConfig = require('./dev').config;
    break;
  case 'test':
  case 'testing':
    envConfig = require('./testing').config;
    break;
  default:
    envConfig = require('./dev').config;
}

export default merge(baseConfig, envConfig);
