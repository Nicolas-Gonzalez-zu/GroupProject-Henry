const faker = require('faker');
const { Customer } = require('../models');

const demoBudgets = [];

const generateDemoWallets = async () => {
  const Customers = await Customer.findAll({ attributes: ['id'] });
  Customers.forEach((c) => {
    demoBudgets.push({
      name: faker.finance.transactionType(),
      amount: faker.datatype.number(),
      customer_id: c.id,
      status: true,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  });
  Customers.forEach((c) => {
    demoBudgets.push({
      name: faker.finance.transactionType(),
      amount: faker.datatype.number(),
      customer_id: c.id,
      status: true,
      createdAt: faker.date.past(),
      updatedAt: faker.date.future(),
    });
  });
  Customers.forEach((c) => {
    demoBudgets.push({
      name: faker.finance.transactionType(),
      amount: faker.datatype.number(),
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
    await queryInterface.bulkInsert('Budgets', demoBudgets, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Budgets', null, {});
  },
};
