const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Customer, {
        as: 'customer',
        foreignKey: 'customer_id',
      });
      Order.belongsTo(models.User, {
        as: 'assigned_user',
        foreignKey: 'assigned_user_id',
      });
    }
  }
  Order.init(
    {
      invoice_id: DataTypes.BIGINT,
      assigned_user_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      status: DataTypes.STRING(100),
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      priority: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
