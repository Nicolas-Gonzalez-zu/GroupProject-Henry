const faker = require('faker');

module.exports = [
  // Orders module
  {
    name: 'Menu services',
    id_code: 'MENU_SERVICES',
    status: true,
    id: 11,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Create services',
    id_code: 'ASSING_SERVICES',
    status: true,
    id: 12,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'View services',
    id_code: 'VIEW_SERVICES',
    status: true,
    id: 13,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Edit services',
    id_code: 'EDIT_SERVICES',
    status: true,
    id: 14,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];
