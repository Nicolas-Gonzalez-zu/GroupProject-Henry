const faker = require('faker');

module.exports = [
  // Orders module
  {
    name: 'Menu orders',
    id_code: 'MENU_ORDERS',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Assing orders',
    id_code: 'ASSING_ORDERS',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'View orders',
    id_code: 'VIEW_ORDERS',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Edit orders',
    id_code: 'EDIT_ORDERS',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];
