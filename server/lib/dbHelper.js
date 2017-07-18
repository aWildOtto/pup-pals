'use strict'

const bcrypt = require("bcrypt");

//-----------------db query functions------------
module.exports = (knex) => {
  return{

    getAllEvents: () => {
      return knex.select().from('events');
    },

    getEventDetailsById: (id) => {
      return knex('events')
        .leftJoin('event_user', 'events.id', '=', 'event_user.event_id')
        .leftJoin('event_pup', 'events.id', '=', 'event_pup.event_id')
        .select(knex.raw('to_json(events.*) as events'), knex.raw('to_json(event_user.user_id) as event_user'), knex.raw('to_json(event_pup.pup_id) as event_pup'))
        .where({'events.id' : id})
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

    getPupsByIds: (ids) => {
      return knex.table('pups')
        .select()
        .whereIn('id', ids)
    },

    getUserByIds: (ids) => {
      return knex.table('users')
        .select('id','username', 'name', 'avatar_url')
        .whereIn('id', ids)
    },



    getPupsByUserIds: (ids) => {
      return knex.table('pups')
        .select('name', 'breed', 'avatar_url', 'user_id')
        .whereIn('user_id', ids)
        .groupBy('user_id', 'pups.name', 'pups.breed', 'pups.avatar_url')
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

    createEvent: (event, id) => {
      return knex.table('events').insert({
        creator_user_id:id,
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
    },

    saveMessage: (content, user_id, msgId, event_id) => {
       return knex('event_posts').insert({
        user_id,
        event_id,
        content
      }).returning('id')//add media url in here
    },

    savePet: (pup, user_id) => {
      return knex('pups').insert({
        user_id: user_id,
        breed: pup.breed ,
        size: pup.size,
        temperament: pup.temperament,
        neutered: "Yes"? true: false,
        age: pup.age,
        avatar_url: pup.avatar_url,
        name: pup.name,
        sex: pup.sex
      })
    },

     getUserPupsById: (id) => {
      return knex ('pups')
        .leftJoin('pups', 'users.id', '=', 'pups.user_id')
        .select(['users.username', 'users.name', 'users.avatar_url', 'users.status', knex.raw('to_json(pups.*) as pups')])
        .where({'users.id' : id});
    },

    getMessagesByEventId: (event_id) => {
      return knex('event_posts')
        .leftJoin('users','event_posts.user_id', '=', 'users.id')
        .select('users.username', 'users.avatar_url', 'event_posts.*')
        .where({'event_posts.event_id': event_id});
    }
  }
};