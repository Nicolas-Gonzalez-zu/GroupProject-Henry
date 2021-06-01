const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../../db/models');
const bcryptUtils = require('../../utils/bcryptUtils');

module.exports = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  const userData = email.split('_');
  const searchEmail = userData[0];
  const isAdmin = userData[1] === 'true';
  User.findOne({ where: { email: searchEmail }, include: { all: true } })
    .then((user) => {
      if (!user) {
        return done(null, false, { error: 'email/password incorrect' });
      }
      const isPasswordValid = bcryptUtils.validatePassword(password, user.password);
      if (isPasswordValid) {
        if (isAdmin && user.employee) {
          return done(null, user);
        }
        if (!isAdmin && user.customer) {
          return done(null, user);
        }
        return done(null, false, { error: 'email/password incorrect' });
      }
      return done(null, false, { error: 'email/password incorrect' });
    })
    .catch((err) => done(null, false, { error: err.message }));
});
