module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('InvoiceServices', 'createdAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('InvoiceServices', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
    ]);
  },
  // eslint-disable-next-line no-unused-vars
  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('InvoiceServices', 'createdAt'),
      queryInterface.removeColumn('InvoiceServices', 'updatedAt'),
    ]);
  },
};
