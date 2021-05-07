const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Configuration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Configuration.init(
    {
      app_name: DataTypes.STRING,
      addres: DataTypes.STRING,
      fiscal_id: DataTypes.STRING,
      payment_gw_api_key: DataTypes.STRING,
      transactional_gw_api_key: DataTypes.STRING,
      secret_key: DataTypes.STRING,
      logo_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Configuration',
    },
  );
  return Configuration;
};
