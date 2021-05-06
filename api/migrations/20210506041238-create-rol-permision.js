module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RolPermissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rol_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Rols',
          key: 'id',
        },
      },
      permission_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Permissions',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('RolPermissions');
  },
};
