const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Service.belongsToMany(models.Category, {
        through: 'ServiceCategories',
        foreignKey: 'service_id',
      });
      Service.belongsToMany(models.Invoice, {
        through: 'InvoiceServices',
        foreignKey: 'service_id',
      });
    }
  }
  Service.init(
    {
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(10, 2),
      description: DataTypes.STRING(100),
      img_url: DataTypes.STRING(100),
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Service',
    },
  );
  return Service;
};
