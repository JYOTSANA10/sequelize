'use strict';

const { faker } = require('@faker-js/faker');

const todos = [...Array(100)].map((todo) => (
  {
    firstName:  faker.name.firstName(),
    lastName:  faker.name.lastName(),

    email:faker.internet.email(),
  
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', todos, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};
