const passport = require('passport');
const db = require('../../db/models');

const LocalStrategy = require('./strategies/local');
const FacebookStrategy = require('./strategies/facebook');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  db.Customer.findOne({
    where: { user_id: user.id },
    include: [
      { model: db.User, as: 'user' },
      { model: db.Plan, as: 'plan' },
    ],
  })
    .then((LoggedUser) => {
      const usr = {
        id: LoggedUser.user_id,
        first_name: LoggedUser.user.first_name,
        last_name: LoggedUser.user.last_name,
        phone: LoggedUser.user.phone,
        email: LoggedUser.user.email,
        plan: LoggedUser.plan,
      };
      done(null, usr);
    })
    .catch((e) => {
      done(null, false, e);
    });
});

passport.use(LocalStrategy);
passport.use(FacebookStrategy);

module.exports = passport;
