const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wallet.hasMany(models.Movement, {
        as: 'movements',
        foreignKey: 'wallet_id',
      });
      Wallet.hasMany(models.Transfer, {
        as: 'origin_transfers',
        foreignKey: 'origin_wallet_id',
      });
      Wallet.hasMany(models.Transfer, {
        as: 'destination_transfers',
        foreignKey: 'destination_wallet_id',
      });
      Wallet.belongsTo(models.Customer, {
        as: 'customer',
        foreignKey: 'customer_id',
      });
    }
  }
  Wallet.init(
    {
      name: DataTypes.STRING(100),
      balance: DataTypes.DECIMAL(10, 2),
      customer_id: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Wallet',
    },
  );
  return Wallet;
};
