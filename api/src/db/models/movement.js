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
      amount: DataTypes.INTEGER,
      type: DataTypes.STRING,
      generation_date: DataTypes.DATE,
      description: DataTypes.STRING,
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
