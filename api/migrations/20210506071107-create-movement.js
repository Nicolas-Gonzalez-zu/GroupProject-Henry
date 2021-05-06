module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      generation_date: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id',
        },
      },
      wallet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Wallets',
          key: 'id',
        },
      },
      budget_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Budgets',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Movements');
  },
};
