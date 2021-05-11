module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Configurations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      app_name: {
        allowNull: false,
        type: Sequelize.STRING(100),
        defaultValue: 'FinanceApp',
      },
      addres: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      fiscal_id: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      payment_gw_api_key: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      transactional_gw_api_key: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      secret_key: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      logo_url: {
        allowNull: true,
        type: Sequelize.STRING(100),
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
    await queryInterface.dropTable('Configurations');
  },
};
