const faker = require('faker');

const demoTransfers = [];

const generatedemoTransfers = async () => {
  demoTransfers.push({
    amount: faker.datatype.float(),
    generation_date: faker.date.past(),
    customer_id: 1,
    origin_wallet_id: 2,
    destination_wallet_id: 25,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });

  demoTransfers.push({
    amount: faker.datatype.float(),
    generation_date: faker.date.past(),
    customer_id: 1,
    origin_wallet_id: 4,
    destination_wallet_id: 25,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });

  demoTransfers.push({
    amount: faker.datatype.float(),
    generation_date: faker.date.past(),
    customer_id: 2,
    origin_wallet_id: 13,
    destination_wallet_id: 14,
    createdAt: faker.date.past(),
    updatedAt: faker.date.future(),
  });
};
module.exports = {
  up: async (queryInterface) => {
    await generatedemoTransfers();
    await queryInterface.bulkInsert('Transfers', demoTransfers, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Transfers', null, {});
  },
};
