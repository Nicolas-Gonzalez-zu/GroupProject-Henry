const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Configuration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Configuration.init(
    {
      app_name: DataTypes.STRING(100),
      addres: DataTypes.STRING(100),
      fiscal_id: DataTypes.STRING(100),
      payment_gw_api_key: DataTypes.STRING(100),
      transactional_gw_api_key: DataTypes.STRING(100),
      secret_key: DataTypes.STRING(100),
      logo_url: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: 'Configuration',
    },
  );
  return Configuration;
};
