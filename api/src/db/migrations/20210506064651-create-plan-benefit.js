module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PlanBenefits', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plan_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Plans',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      benefit_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Benefits',
          key: 'id',
        },
        onDelete: 'cascade',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('PlanBenefit');
  },
};
