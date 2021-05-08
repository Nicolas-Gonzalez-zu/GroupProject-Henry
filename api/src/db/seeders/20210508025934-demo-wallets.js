const faker = require('faker');
const { Customer } = require('../models');

const demoWallets = [];

const generateDemoWallets = async () => {
  const Customers = await Customer.findAll({ attributes: ['id'] });
  Customers.forEach((c) => {
    demoWallets.push({
      name: faker.finance.accountName(),
      balance: faker.datatype.number(),
      customer_id: c.id,
      status: true,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  });
  Customers.forEach((c) => {
    demoWallets.push({
      name: faker.finance.accountName(),
      balance: faker.datatype.number(),
      customer_id: c.id,
      status: true,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  });
  Customers.forEach((c) => {
    demoWallets.push({
      name: faker.finance.accountName(),
      balance: faker.datatype.number(),
      customer_id: c.id,
      status: true,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  });
};
module.exports = {
  up: async (queryInterface) => {
    await generateDemoWallets();
    await queryInterface.bulkInsert('Wallets', demoWallets, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Wallets', null, {});
  },
};
