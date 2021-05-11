const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoice.belongsTo(models.Customer, {
        as: 'customer',
        foreignKey: 'customer_id',
      });
      Invoice.belongsToMany(models.Service, {
        through: 'InvoiceServices',
        foreignKey: 'invoice_id',
      });
    }
  }
  Invoice.init(
    {
      payment_method: DataTypes.STRING(100),
      amount: DataTypes.DECIMAL(10, 2),
      status: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: 'Invoice',
    },
  );
  return Invoice;
};
