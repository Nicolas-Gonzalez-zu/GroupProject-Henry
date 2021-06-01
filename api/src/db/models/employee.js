const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'user_id',
      });
      Employee.belongsTo(models.Plan, {
        as: 'rol',
        foreignKey: 'rol_id',
      });
    }
  }
  Employee.init(
    {
      user_id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      rol_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Employee',
    },
  );
  return Employee;
};
