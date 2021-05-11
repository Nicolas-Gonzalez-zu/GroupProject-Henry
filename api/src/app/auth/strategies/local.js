const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../../../db/models');
const bcryptUtils = require('../../utils/bcryptUtils');

module.exports = new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return done(null, false, { error: 'email/password incorrect' });
      }
      const isPasswordValid = bcryptUtils.validatePassword(password, user.password);
      if (isPasswordValid) {
        return done(null, user);
      }
      return done(null, false, { error: 'email/password incorrect' });
    })
    .catch((err) => done(null, false, { error: err.message }));
});
