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
        type: Sequelize.STRING,
      },
      addres: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      fiscal_id: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      payment_gw_api_key: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      transactional_gw_api_key: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      secret_key: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      logo_url: {
        allowNull: true,
        type: Sequelize.STRING,
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
