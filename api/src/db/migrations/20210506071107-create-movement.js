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
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('INCOME', 'OUTGO'),
      },
      generation_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'user_id',
        },
        onDelete: 'cascade',
      },
      wallet_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Wallets',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      budget_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Budgets',
          key: 'id',
        },
        onDelete: 'cascade',
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
