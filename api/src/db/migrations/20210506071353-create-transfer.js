module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transfers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      generation_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
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
      origin_wallet_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Wallets',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      destination_wallet_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Wallets',
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
    await queryInterface.dropTable('Transfers', { cascade: true });
  },
};
