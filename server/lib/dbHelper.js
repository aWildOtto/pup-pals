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
      return knex.select()
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
    },

    testCount: (id) => {
      return knex('pups')
        .count('user_id')
        .count('')
        .where({'user_id' : id})
    },

    saveMessage: (content, user_id, msgId, event_id) => {
      //TODO: 
      //save the message
      return knex('event_posts').insert({
        user_id,
        event_id,
        content
      })//add media url in here
    },

    savePet: (pup, user_id) => {
      return knex('pups').insert({
        user_id: user_id, 
        breed: pup.breed, 
        size: pup.size, 
        temperament: pup.temperament, 
        neutered: "Yes"? true: false, 
        age: pup.age, 
        avatar_url: pup.avatar_url, 
        name: pup.name, 
        sex: pup.sex
      }).returning('id');
    },

    getPupsAndEventsById: (id) => {
      return knex()
        .select(['pups.id as puppy_id', 'pups.name', 'pups.breed', 'pups.sex', 'pups.age', 'pups.size', 'pups.neutered', 'pups.temperament', 'events.id as events_id', 'events.title', 'events.description', 'events.location', 'events.event_time', 'events.open_status'])
        .from('pups')
        .leftJoin('event_pup', 'pups.id', '=', 'event_pup.pup_id')
        .leftJoin('events', 'event_pup.event_id', '=', 'events.id')
        .where({'pups.id': id});
    },

    getUserPupsById: (id) => {
      return knex ('users')
        .leftJoin('pups', 'users.id', '=', 'pups.user_id')
        .select(['users.username', 'users.name', 'users.avatar_url', 'users.status', knex.raw('to_json(pups.*) as pups')])
        .where({'users.id' : id});
    },


  }
};