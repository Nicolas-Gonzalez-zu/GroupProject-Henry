const faker = require('faker');

const initialPlans = [
  {
    name: 'Free',
    price: 0,
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Pro',
    price: 20,
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Plans', initialPlans, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Plans', null, {});
  },
};
