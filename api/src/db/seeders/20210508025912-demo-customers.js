const faker = require('faker');
const { User } = require('../models');

const demo_customer = [
  {
    user_id: 1,
    plan_id: 1,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  },
];

const generateCustomers = async (quantity = 10) => {
  const users = User.findAll({});
};

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
