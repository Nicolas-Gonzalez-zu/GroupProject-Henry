const faker = require('faker');

const initialRols = [
  {
    name: 'Super admin',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Employee',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Rols', initialRols, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Rols', null, {});
  },
};
