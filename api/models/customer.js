const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
      });
      Customer.belongsTo(models.Plan, {
        as: 'plan',
        foreignKey: 'plan_id',
      });
      Customer.hasMany(models.Budget, {
        as: 'budgets',
        foreignKey: 'customer_id',
      });
      Customer.hasMany(models.Movement, {
        as: 'movements',
        foreignKey: 'customer_id',
      });
      Customer.hasMany(models.Wallet, {
        as: 'wallets',
        foreignKey: 'customer_id',
      });
      Customer.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'customer_id',
      });
      Customer.hasMany(models.Invoice, {
        as: 'invoices',
        foreignKey: 'customer_id',
      });
    }
  }
  Customer.init({
    user_id: DataTypes.INTEGER,
    plan_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};
