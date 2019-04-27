export const config = {
  secrets: {
    jwt: 'mentor and stuff'
  },
  keys: {
    stripePublishable: 'pk_test_Il1MCOR4thnvsuNgiwCaJzOw',
    stripeSecret: 'sk_test_DNgeIDV0yXsWhahC6Wq4ZKg9',
    stripePlan: 'plan_EpLtM3j2EMurWg',
    sendgrid:
      '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'
  },
  dbUrl: 'mongodb://localhost:27017/mentorlabs-dev',
  origin: 'http://localhost:3000'
};
