module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('ServiceCategories', 'createdAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('ServiceCategories', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
    ]);
  },
  // eslint-disable-next-line no-unused-vars
  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('ServiceCategories', 'createdAt'),
      queryInterface.removeColumn('ServiceCategories', 'updatedAt'),
    ]);
  },
};
