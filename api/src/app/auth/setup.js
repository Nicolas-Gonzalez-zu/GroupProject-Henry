const passport = require('passport');
const { User } = require('../../db/models');

const LocalStrategy = require('./strategies/local');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  User.findByPk(user.id)
    .then((LoggedUser) => {
      done(null, LoggedUser);
    })
    .catch((e) => done(null, false, e));
});

passport.use(LocalStrategy);

module.exports = passport;
