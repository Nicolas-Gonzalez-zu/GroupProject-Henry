const faker = require('faker');

const initialBenefits = [
  {
    id: 1,
    name: 'Limited to create 5 movement',
    id_code: 'LIMITED_MOVEMENTS_CREATION_5',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    id: 2,
    name: 'Monthly Limited movement report download',
    id_code: 'LIMITED_MOVEMENTS_REPORTS_5',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    id: 3,
    name: 'Pro benefits',
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
