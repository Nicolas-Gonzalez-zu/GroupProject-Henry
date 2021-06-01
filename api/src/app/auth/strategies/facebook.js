const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../../../db/models');

module.exports = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3001/api/auth/facebook/callback',
    profileFields: ['id', 'name', 'email'],
  },
  (token, refreshToken, profile, done) => {
    console.log(profile);
    User.findOrCreate({
      where: { email: profile.emails[0].value },
    })
      .then((user) => {
        console.log(user);
      })
      .catch((err) => done(null, false, { error: err.message }));
  },
);
