const faker = require('faker');
const { User } = require('../models');

const demoCustomers = [];

const generateDemoCustomers = async () => {
  const users = await User.findAll({ attributes: ['id'] });
  users.forEach((u) => {
    demoCustomers.push({
      user_id: u.id,
      plan_id: 2,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  });
};

module.exports = {
  up: async (queryInterface) => {
    await generateDemoCustomers();
    await queryInterface.bulkInsert('Customers', demoCustomers, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Customers', null, {});
  },
};
