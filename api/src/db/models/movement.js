const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movement.belongsTo(models.Budget, {
        as: 'budget',
        foreignKey: 'budget_id',
      });
      Movement.belongsTo(models.Customer, {
        as: 'customer',
        foreignKey: 'customer_id',
      });
      Movement.belongsTo(models.Wallet, {
        as: 'origin_wallet',
        foreignKey: 'wallet_id',
      });
    }
  }
  Movement.init(
    {
      amount: DataTypes.DECIMAL(10, 2),
      type: DataTypes.ENUM('INCOME', 'OUTGO'),
      generation_date: DataTypes.DATE,
      description: DataTypes.STRING(100),
      customer_id: DataTypes.INTEGER,
      wallet_id: DataTypes.INTEGER,
      budget_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Movement',
    },
  );
  return Movement;
};
