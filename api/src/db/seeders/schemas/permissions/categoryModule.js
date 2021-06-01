const faker = require('faker');

module.exports = [
  // customers module
  {
    name: 'Menu Category',
    id_code: 'MENU_CATEGORIES',
    status: true,
    id: 15,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'View Category',
    id_code: 'VIEW_CATEGORY',
    status: true,
    id: 16,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Create Category',
    id_code: 'DELETE_CATEGORY',
    status: true,
    id: 17,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Edit Category',
    id_code: 'EDIT_CATEGORY',
    status: true,
    id: 18,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
  {
    name: 'Disable Category',
    id_code: 'DISABLE_CATEGORY',
    status: true,
    id: 19,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  },
];
