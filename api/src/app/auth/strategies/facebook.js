const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('../../../db/models');

module.exports = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'https://localhost:3001/api/auth/facebook/callback',
  },
  (accessToken, refreshToken, profile, cb) => {
    db.User.findOrCreate({ where: { facebookId: profile.id } }, (err, user) => cb(err, user));
  },
);

// ngrok
