const faker = require('faker');

module.exports = [
  // customers module
  {
    name: 'Menu customers',
    id_code: 'MENU_CUSTOMERS',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'View customer',
    id_code: 'VIEW_CUSTOMER',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Create customer',
    id_code: 'DELETE_CUSTOMER',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Edit customer',
    id_code: 'EDIT_CUSTOMER',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Disable customer',
    id_code: 'DISABLE_CUSTOMER',
    status: true,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];
