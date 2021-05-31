module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('PlanBenefits', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    queryInterface.addColumn('PlanBenefits', 'updatedAt', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('PlanBenefits', 'createdAt', {});
    queryInterface.removeColumn('PlanBenefits', 'updatedAt', {});
  },
};
