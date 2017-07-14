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
    // getEventDetailById: (id) => {
    //   return knex.
    // }

    // },

    createUser: (user) => {
      // return knex.table('users').insert({
      //   username:'ppb',
      //   name: 'Percy Poopybutt',
      //   email: 'percypoop@hotmail.com',
      //   password: '1234',
      //   created_at: Date.now
      // }).returning('id');
      //.into('users');
      const password = bcrypt.hashSync(user.password, 10)
      return knex.raw(
        `INSERT INTO users (username,name,email,password)
           VALUES ('${user.username}','${user.name}','${user.email}','${password}')`
        )
    }

  }
};