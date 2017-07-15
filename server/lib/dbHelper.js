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
      return knex.table('users').insert({
        username:user.username,
        name: user.name,
        email: user.email,
        password: bcrypt.hashSync(user.password, 10)
      }).returning('id');
    },

    getUserByEmail: (email) => {
      return knex.select('password', 'username')
        .from('users')
        .where({email});
    },

    getUserAndPupsById: (id) => {
      return knex ('users')
        .leftJoin('pups', 'users.id', '=', 'pups.user_id')
        .leftJoin('events', 'users.id', '=', 'events.creator_user_id')
        .select(['users.username', 'users.name', 'users.avatar_url', 'users.status', knex.raw('to_json(pups.*) as pups'), knex.raw('to_json(events.*) as events')])
        .where({'users.id' : id})
    },

    test: (id) => {
      return knex('users')
        .leftJoin('pups', 'users.id', '=', 'pups.user_id')
        .select(['users.username', 'users.name', 'users.avatar_url', 'users.status', knex.raw('to_json(pups.*) as pups')])
        .where({'users.id' : id})
    }

  }
};