module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('RolPermissions', 'createdAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('RolPermissions', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
    ]);
  },
  // eslint-disable-next-line no-unused-vars
  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('RolPermissions', 'createdAt'),
      queryInterface.removeColumn('RolPermissions', 'updatedAt'),
    ]);
  },
};
