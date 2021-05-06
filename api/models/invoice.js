'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoice.belongsTo(models.Customer,{
        as:'customer',
        foreignKey:'customer_id'
      })
      Invoice.belongsToMany(models.Service,{
        through:'InvoiceServices',
        foreignKey:'invoice_id'
      })
    }
  }
  Invoice.init({
    payment_method: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};