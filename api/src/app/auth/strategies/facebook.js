const FacebookStrategy = require('passport-facebook').Strategy;
const processOauthResponse = require('./processOauthResponse');

module.exports = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL:
      process.env.FACEBOOK_APP_CALLBACK_URL || 'http://localhost:3001/auth/facebook/callback',
    profileFields: ['email', 'name'],
  },
  processOauthResponse,
);
