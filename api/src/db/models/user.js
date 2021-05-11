const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Employee, {
        as: 'employee',
        foreignKey: 'user_id',
      });
      User.hasOne(models.Customer, {
        as: 'customer',
        foreignKey: 'user_id',
      });
      User.hasMany(models.Order, {
        as: 'orders_assigned',
        foreignKey: 'assigned_user_id',
      });
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING(100),
      last_name: DataTypes.STRING(100),
      phone: DataTypes.STRING(100),
      email: DataTypes.STRING(100),
      password: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
