const FacebookStrategy = require('passport-facebook').Strategy;
const { User } = require('../../../db/models');

module.exports = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3001/facebook/callback',
  },
  (token, refreshToken, profile, done) => {
    User.findOrCreate({
      where: { facebookId: profile.id },
      defaults: {
        facebookId: profile.id, // set the users facebook id
        facebookToken: token, // we will save the token that facebook provides to the user
        email: profile.emails[0].value, // facebook can return multiple emails so we'll take the first
      },
    })
      .then((user) => {
        console.log(user);
      })
      .catch((err) => done(null, false, { error: err.message }));
  },
);
