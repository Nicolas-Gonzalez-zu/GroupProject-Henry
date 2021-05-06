'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ServiceCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      service_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model:'Services',
          key:'id'
        }
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references : {
          model:'Categories',
          key:'id'
        }
      }

    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ServiceCategories');
  }
};
