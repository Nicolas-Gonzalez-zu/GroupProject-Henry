const faker = require('faker');

const demoMovements = [];

const generatedemoMovements = async () => {
  demoMovements.push({
    amount: faker.datatype.float(),
    type: 'INCOME',
    generation_date: faker.date.past(),
    description: faker.finance.accountName(),
    wallet_id: 1,
    customer_id: 1,
    budget_id: 2,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });

  demoMovements.push({
    amount: faker.datatype.float(),
    type: 'OUTGO',
    generation_date: faker.date.past(),
    description: faker.finance.accountName(),
    wallet_id: 2,
    customer_id: 8,
    budget_id: 3,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
};
module.exports = {
  up: async (queryInterface) => {
    await generatedemoMovements();
    await queryInterface.bulkInsert('Movements', demoMovements, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Movements', null, {});
  },
};
