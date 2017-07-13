'use strict'

const bcrypt = require("bcrypt");

//-----------------db query functions------------
module.exports = (knex) => {
  return{
    getAllEvents: () => {
      return knex.select().from('events');
    },
    getProfileByUsername: (username) => {
      return knex.select().from('users').where({username});
    },

  }
};