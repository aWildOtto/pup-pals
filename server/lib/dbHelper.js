'use strict'

const bcrypt = require("bcrypt");

//-----------------db query functions------------
module.exports = (knex) => {
  return{

    getAllEvents: () => {
      return knex.select().from('events');
    },

    getEventById: (id) => {
      return knex.select()
        .from('events')
        .where({id})
    },

    getProfileByUsername: (username) => {
      return knex.select().from('users').where({username});
    },

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

    createEvent: (event) => {
      return knex.table('events').insert({
        creator_user_id:event.user_id,
        title: event.title,
        description: event.description,
        open_status: true,
        location: event.location,
        date_time: event.date_time,
        restriction: false
      }).returning('id');
    },


    test: (id) => {
      return knex('users')
        .leftJoin('pups', 'users.id', '=', 'pups.user_id')
        .select(['users.username', 'users.name', 'users.avatar_url', 'users.status', knex.raw('to_json(pups.*) as pups')])
        .where({'users.id' : id})
    },

    testCount: (id) => {
      return knex('pups')
        .count('user_id')
        .count('')
        .where({'user_id' : id})
    }

  }
};