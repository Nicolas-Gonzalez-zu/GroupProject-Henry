const faker = require('faker');

const initialBenefits = [
  {
    name: 'Create movement',
    id_code: 'CREATE_MOVEMENT',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'All benefits',
    id_code: 'ALL_BENEFITS',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Benefits', initialBenefits, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Benefits', null, {});
  },
};
