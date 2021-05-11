const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission.belongsToMany(models.Rol, {
        through: 'RolPermissions',
        foreignKey: 'permission_id',
      });
    }
  }
  Permission.init(
    {
      name: DataTypes.STRING(100),
      id_code: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Permission',
    },
  );
  return Permission;
};
