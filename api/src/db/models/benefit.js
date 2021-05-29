const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Benefit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Benefit.belongsToMany(models.Plan, {
        through: 'PlanBenefits',
        foreignKey: 'benefit_id',
        as: 'benefits',
      });
    }
  }
  Benefit.init(
    {
      name: DataTypes.STRING(100),
      id_code: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: 'Benefit',
    },
  );
  return Benefit;
};
