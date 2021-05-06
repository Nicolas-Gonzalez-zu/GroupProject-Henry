const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Employee, {
        as: 'employee',
        foreignKey: 'user_id',
      });
      User.hasMany(models.Customer, {
        as: 'customer',
        foreignKey: 'user_id',
      });
      User.hasMany(models.Order, {
        as: 'orders_assigned',
        foreignKey: 'assigned_user_id',
      });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
