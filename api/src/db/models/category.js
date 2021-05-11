const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Service, {
        through: 'ServiceCategories',
        foreignKey: 'category_id',
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: 'Category',
    },
  );
  return Category;
};
