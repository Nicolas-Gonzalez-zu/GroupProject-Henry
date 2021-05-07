module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InvoiceServices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      invoice_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Invoices',
          key: 'id',
        },
      },
      service_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Services',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('InvoiceServices');
  },
};
