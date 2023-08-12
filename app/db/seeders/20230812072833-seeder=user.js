'use strict';
const bcrypt = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add seed commands here.
    const password = bcrypt.hashSync('rahasia', 10);
    Example: await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John Doe',
          email: 'admin@gmail.com',
          password: password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Sarah Doe',
          email: 'sarah@gmail.com',
          password: password,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
