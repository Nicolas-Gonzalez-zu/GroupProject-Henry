const faker = require('faker');

const initialPlans = [
  {
    id: 1,
    name: 'Pro',
    price: 300,
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    id: 2,
    name: 'Free',
    price: 0,
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
