const faker = require('faker');

module.exports = [
  // Orders module
  {
    name: 'Menu orders',
    id_code: 'MENU_ORDERS',
    id: 2,
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Assing orders',
    id_code: 'ASSING_ORDERS',
    id: 3,
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'View orders',
    id_code: 'VIEW_ORDERS',
    id: 4,
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Edit orders',
    id_code: 'EDIT_ORDERS',
    id: 5,
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];
