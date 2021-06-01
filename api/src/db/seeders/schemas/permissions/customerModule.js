const faker = require('faker');

module.exports = [
  // customers module
  {
    name: 'Menu customers',
    id_code: 'MENU_CUSTOMERS',
    status: true,
    id: 6,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'View customer',
    id_code: 'VIEW_CUSTOMER',
    status: true,
    id: 7,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Create customer',
    id_code: 'DELETE_CUSTOMER',
    status: true,
    id: 8,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Edit customer',
    id_code: 'EDIT_CUSTOMER',
    status: true,
    id: 9,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Disable customer',
    id_code: 'DISABLE_CUSTOMER',
    status: true,
    id: 10,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];
