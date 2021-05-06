module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transfers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      generation_date: {
        type: Sequelize.DATE,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id',
        },
      },
      origin_wallet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Wallets',
          key: 'id',
        },
      },
      destination_wallet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Wallets',
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
    await queryInterface.dropTable('Transfers');
  },
};
