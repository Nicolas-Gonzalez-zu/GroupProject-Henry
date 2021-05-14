module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.changeColumn('Movements', 'budget_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
      }),
    ]),

  down: (queryInterface) => Promise.all([queryInterface.changeColumn('Movements', 'budget_id')]),
};
