const passport = require('passport');
const db = require('../../db/models');

const LocalStrategy = require('./strategies/local');

passport.serializeUser((user, done) => {
  // console.log('Serialized: ', user);
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
    const aclData = await db[acl.type].findOne({
      where: { id: LoggedUser[acl.userType][acl.foreingKeyName] },
      include: { model: db[acl.detailModel], as: `${acl.detailModel.toLowerCase()}s` },
    });
    const serializedUser = {
      id: LoggedUser.id,
      first_name: LoggedUser.first_name,
      last_name: LoggedUser.last_name,
      phone: LoggedUser.phone,
      email: LoggedUser.email,
      [acl.type.toLowerCase()]: aclData,
    };
    done(null, serializedUser);
  } catch (e) {
    console.log(e);
    done(null, false, e);
  }
});

passport.use(LocalStrategy);

module.exports = passport;
