const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transfer.belongsTo(models.Customer, {
        as: 'customer',
        foreignKey: 'customer_id',
      });
      Transfer.belongsTo(models.Wallet, {
        as: 'origin_wallet',
        foreignKey: 'origin_wallet_id',
      });
      Transfer.belongsTo(models.Wallet, {
        as: 'destination_wallet',
        foreignKey: 'destination_wallet_id',
      });
    }
  }
  Transfer.init(
    {
      amount: DataTypes.DECIMAL(10, 2),
      generation_date: DataTypes.DATE,
      customer_id: DataTypes.INTEGER,
      origin_wallet_id: DataTypes.INTEGER,
      destination_wallet_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Transfer',
    },
  );
  return Transfer;
};
