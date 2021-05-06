'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Plan.hasMany(models.Customer,{
        as:'customer',
        foreignKey: 'plan_id'
      });
      Plan.belongsToMany(models.Benefit,{
        through:'PlanBenefits',
        foreignKey: 'plan_id'
      });
    }
  }
  Plan.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Plan',
  });
  return Plan;
};