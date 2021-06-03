const GoogleStrategy = require('passport-google-oauth20').Strategy;
const processOauthResponse = require('./processOauthResponse');

const { GOOGLE_APP_ID, GOOGLE_APP_SECRET } = process.env;

module.exports = new GoogleStrategy(
  {
    clientID: GOOGLE_APP_ID,
    clientSecret: GOOGLE_APP_SECRET,
    callbackURL:
      process.env.GOOGLE_APP_CALLBACK_URL || 'http://localhost:3001/auth/google/callback',
  },
  processOauthResponse,
);
