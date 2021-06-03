const faker = require('faker');
const { User, Customer } = require('../../../db/models');
const bcryptUtils = require('../../utils/bcryptUtils');

module.exports = async (token, refreshToken, profile, done) => {
  let fullFirstName;
  const { email } = profile._json;
  let last_name;
  if (profile.provider === 'google') {
    fullFirstName = profile._json.given_name;
    last_name = profile._json.family_name;
  } else {
    const { first_name, middle_name } = profile._json;
    fullFirstName = `${first_name}${middle_name ? ` ${middle_name}` : ''}`;
    last_name = profile._json.last_name;
  }
  let user;
  try {
    user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      done(null, user);
    } else {
      user = await User.create({
        first_name: fullFirstName,
        last_name,
        email,
        password: bcryptUtils.encrypt(faker.internet.password()),
      });
      if (user) {
        const customer = await Customer.create({ user_id: user.id, plan_id: 1 });
        if (customer) done(null, user);
        else {
          await User.destroy({
            where: {
              email,
            },
          });
          done(null, false, { error: 'Facebook authentication failed, try again' });
        }
      } else {
        done(null, false, { error: 'Facebook authentication failed, try again' });
      }
    }
  } catch (e) {
    done(null, false, { error: e.message });
  }
};
