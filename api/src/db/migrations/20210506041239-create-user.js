module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Users',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
        },
        first_name: {
          allowNull: false,
          type: Sequelize.STRING(50),
        },
        last_name: {
          allowNull: true,
          type: Sequelize.STRING(50),
        },
        phone: {
          allowNull: true,
          type: Sequelize.STRING(100),
        },
        email: {
          type: Sequelize.STRING(100),
          unique: true,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING(64),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      { onDelete: 'cascade' },
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users', { cascade: true });
  },
};
