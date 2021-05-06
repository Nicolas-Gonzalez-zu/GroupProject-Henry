const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Budget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Budget.belongsTo(models.Customer, {
        as: 'customer',
        foreignKey: 'customer_id',
      });
      Budget.hasMany(models.Movement, {
        as: 'movements',
        foreignKey: 'budget_id',
      });
    }
  }
  Budget.init({
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Budget',
  });
  return Budget;
};
