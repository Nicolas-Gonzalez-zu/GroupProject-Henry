const faker = require('faker');
const { Plan } = require('../models');

const initialPlanBenefitsDetails = [
  {
    plan_id: 'Create movement',
    benefit_id: 'LIMITED_MOVEMENTS_5',
  },
  {
    name: 'All benefits',
    id_code: 'ALL_BENEFITS',
  },
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
