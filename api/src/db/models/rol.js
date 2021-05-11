const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.hasMany(models.Employee, {
        as: 'Employee',
        foreignKey: 'employee_id',
      });
      Rol.belongsToMany(models.Permission, {
        through: 'RolPermissions',
        foreignKey: 'rol_id',
      });
    }
  }
  Rol.init(
    {
      name: DataTypes.STRING(100),
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Rol',
    },
  );
  return Rol;
};
