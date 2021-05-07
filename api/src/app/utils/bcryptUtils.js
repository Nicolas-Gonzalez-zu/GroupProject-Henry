const bcrypt = require('bcrypt');

const saltRounds = 10;

const encrypt = (password) => bcrypt.hashSync(password, saltRounds);
const validatePassword = (targetPassword, storedPassword) =>
  bcrypt.compareSync(targetPassword, storedPassword);
module.exports = {
  encrypt,
  validatePassword,
};
