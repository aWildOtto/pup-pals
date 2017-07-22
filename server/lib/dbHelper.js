'use strict'

const bcrypt = require("bcrypt");

//-----------------db query functions------------
module.exports = (knex) => {
  return{

    updateOwnerProfile: (id, avatar_url, name) => {
      return knex.table('users')
        .update({avatar_url, name})
        .where({'id': id})
    },

    updatePupProfile: (id, profile) => {
      return knex.table('pups')
        .update(profile)
        .where({'id': id})
    },

    getUserStatus: (userId) => {
      return knex.table('users')
        .select('status')
        .where({'id': userId})
    },

    getPupStatuses: (pupId) => {
      return knex.table('pup_updates')
        .select()
        .whereIn('pup_id', pupId)
        .limit(5)
    },

    makeOwnerStatus: (userId, content) => {
      return knex.table('users')
        .update({status: content})
        .where({'id': userId})
    },

    makePupStatus:(pupId, content) => {
      return knex.table('pup_updates')
        .insert({pup_id: pupId,
          content: content})
        .returning('id')
    },

    eventsForUser: (userId) => {
      const sq = () =>  knex('events')
        .leftOuterJoin('event_user', 'events.id', 'event_user.event_id')
        .groupBy('events.id')
        .select('events.id', knex.raw('count(event_user.*)'))
      const eventsWithCount = () => knex('events')
        .leftOuterJoin(sq().as('sq'), 'events.id', 'sq.id')
        .select('events.*', 'sq.count')
      return eventsWithCount()
      .join('event_user', 'events.id', 'event_user.event_id')
      .where({'event_user.user_id': userId})
    },

    eventsForPup : (id) => {
      const sq = () =>  knex('events')
        .leftOuterJoin('event_user', 'events.id', 'event_user.event_id')
        .groupBy('events.id')
        .select('events.id', knex.raw('count(event_user.*)'))
      const eventsWithCount = () => knex('events')
        .leftOuterJoin(sq().as('sq'), 'events.id', 'sq.id')
        .select('events.*', 'sq.count')
      return eventsWithCount()
        .join('event_pup', 'events.id', 'event_pup.event_id')
        .where({'event_pup.pup_id': id});
    },

    getAllEvents: () => {
      return knex.select().from('events');
    },

    getEventDetailsByEventId: (id) => {
      return knex('events')
        .leftJoin('event_user', 'events.id', '=', 'event_user.event_id')
        .leftJoin('event_pup', 'events.id', '=', 'event_pup.event_id')
        .select(knex.raw('to_json(events.*) as events'), knex.raw('to_json(event_user.user_id) as event_user'), knex.raw('to_json(event_pup.pup_id) as event_pup'))
        .where({'events.id' : id});
    },

    getAllEventsOfUser: (id) => {
      return knex('events')
        .leftJoin('event_user', 'events.id', '=', 'event_user.event_id')
        .select ('events.*')
        .where({'event_user.user_id': id});
    },

    getAllEvents: () => {
      return knex('events')
        .innerJoin('event_user', 'event_user.event_id', '=', 'events.id')
        .select('events.*')
        .count("event_user.id as count")
        .groupBy('events.id');
    },

    getEventUserIdByEventId: (event_id) => {
      return knex('event_user')
        .select('user_id')
        .where({
          'event_id' : event_id
        })
    },

    countEventAttendants: (event_id) => {
      return knex('event_user')
        .count('event_id')
        .where({'event_id' : event_id});
    },

    getProfileByUsername: (username) => {
      return knex.select().from('users').where({username});
    },

    createUser: (user) => {
      return knex.table('users').insert({
        username: user.username,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        password: bcrypt.hashSync(user.password, 10)
      }).returning('id');
    },

    getPupsByIds: (ids) => {
      return knex.table('pups')
        .select()
        .whereIn('id', ids);
    },

    getUserByIds: (ids) => {
      return knex.table('users')
        .select('id','username', 'name', 'avatar_url','status')
        .whereIn('id', ids)
    },

    getPupsByUserIds: (ids) => {
      return knex.table('pups')
        .select("pups.id",'name', 'breed', 'avatar_url', 'user_id')
        .whereIn('user_id', ids)
        .groupBy('user_id','pups.id', 'pups.name', 'pups.breed', 'pups.avatar_url');
    },

    getUserByPupId: (id) => {
      return knex('pups')
        .leftJoin('users', 'pups.user_id', '=', 'users.id')
        .select('users.name', 'users.username', 'users.avatar_url', 'users.id')
        .where({'pups.id': id});
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
        .where({'users.id' : id});
    },

    createEvent: (event, id) => {
      return knex.table('events').insert({
        creator_user_id:id,
        title: event.title,
        description: event.description,
        open_status: true,
        location: event.location,
        date_time: event.date_time,
        event_restriction: event.restriction,
        longitude: event.longitude,
        latitude: event.latitude
      }).returning('id');
    },

    insertEventUser: (event_id, user_id) => {
      return knex.table('event_user'). insert({
        event_id: event_id,
        user_id: user_id
      });
    },

    getPupsIdsByUserId: (user_id) =>{
      return knex('pups')
        .select('pups.id')
        .where({'pups.user_id':user_id});
    },

    insertEventPups: (pup_id, event_id) => {
      return knex.table('event_pup').insert({
        pup_id: pup_id,
        event_id: event_id
      });
    },

    saveMessage: (content, user_id, event_id) => {
       return knex('event_posts').insert({
        user_id,
        event_id,
        content
      }).returning('id');//add media url in here
    },

    savePet: (pup, user_id) => {
      return knex('pups').insert({
        user_id: user_id,
        breed: pup.breed,
        size: pup.size,
        temperament: pup.temperament,
        neutered: (pup.neutered === 'yes')? true: false,
        age: pup.age,
        avatar_url: pup.avatar_url,
        name: pup.name,
        sex: pup.sex
      }).returning('id');
    },

    getPupsAndEventsById: (id) => {
      return new Promise((resolve, reject) => {
        knex('pups')
          .where('id', id)
          .first()
          .then((pup) => {
            knex('event_pup')
            .where('pup_id', pup.id)
            .leftJoin('events', 'event_pup.event_id', '=', 'events.id')
            .then((events) => {
              // console.log(events)
              pup.events = events;
              resolve(pup);
            })
          });
      });
    },

    getUserPupsById: (id) => {
      return knex ('users')
        .leftJoin('pups', 'users.id', '=', 'pups.user_id')
        .select(['users.username', 'users.name', 'users.avatar_url', 'users.status', knex.raw('to_json(pups.*) as pups')])
        .where({'users.id' : id});
    },


    getMessagesByEventId: (event_id) => {
      return knex('event_posts')
        .leftJoin('users','event_posts.user_id', '=', 'users.id')
        .select('users.username', 'users.avatar_url', 'event_posts.*')
        .where({'event_posts.event_id': event_id});
    },

    rsvpToEvent: (user_id, event_id) => {
      return knex('event_user')
        .insert({
          user_id,
          event_id
        });
    },

    searchEventInABox: (bound_a_lat, bound_a_lng, bound_b_lat, bound_b_lng) => {
      bound_a_lat = parseFloat(bound_a_lat);
      bound_a_lng = parseFloat(bound_a_lng);
      bound_b_lat = parseFloat(bound_b_lat);
      bound_b_lng = parseFloat(bound_b_lng);
      return knex.raw(`
          select events.*, count(event_user.id) as count
          from events
          inner join event_user on event_user.event_id = events.id
          where box '((${bound_a_lat}, ${bound_a_lng}), (${bound_b_lat}, ${bound_b_lng}))'
          @> point(events.latitude, events.longitude)
          group by events.id;
          `
          //TODO(prevent sql injection): validate that bounds are floats and nothing else
        )
    }

  }
};