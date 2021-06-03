const passport = require('passport');
const db = require('../../db/models');

const LocalStrategy = require('./strategies/local');
const FacebookStrategy = require('./strategies/facebook');
const googleStrategy = require('./strategies/google');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  try {
    const LoggedUser = await db.User.findOne({
      where: { id: user.id },
      include: { all: true },
    });

    const acl = LoggedUser.employee
      ? { userType: 'employee', type: 'Rol', detailModel: 'Permission', foreingKeyName: 'rol_id' }
      : { userType: 'customer', type: 'Plan', detailModel: 'Benefit', foreingKeyName: 'plan_id' };
    const attributes = ['id_code', 'name'];
    if (acl.type === 'Rol') {
      attributes.push('status');
    }
    const aclData = await db[acl.type].findOne({
      where: { id: LoggedUser[acl.userType][acl.foreingKeyName] },
      include: {
        model: db[acl.detailModel],
        as: `${acl.detailModel.toLowerCase()}s`,
        attributes,
        all: false,
      },
    });
    const restrictions = aclData[`${acl.detailModel.toLowerCase()}s`].map((r) => r.id_code);
    const serializedUser = {
      id: LoggedUser.id,
      first_name: LoggedUser.first_name,
      last_name: LoggedUser.last_name,
      phone: LoggedUser.phone,
      email: LoggedUser.email,
      userType: acl.userType,
      [acl.type.toLowerCase()]: aclData,
      acl: restrictions,
    };
    done(null, serializedUser);
  } catch (e) {
    done(null, false, e);
  }
});

passport.use(LocalStrategy);
passport.use(FacebookStrategy);
passport.use(googleStrategy);

module.exports = passport;
