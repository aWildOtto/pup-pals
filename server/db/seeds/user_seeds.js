const bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1,
          username: 'Fluffers',
          name: 'Bunny Fluffyface',
          email: 'fluffyface@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Looking for a pup-pal for my pup-pal.',
          avatar_url: 'http://t12.deviantart.net/ATRNlWu5I22v95V2GRGNyF2B6xM=/fit-in/700x350/filters:fixed_height(100,100):origin()/pre06/c01e/th/pre/f/2016/231/e/5/bunny_emoticon_2_by_kiimarie-dael0o8.png'
        }),
        knex('users').insert({id: 2,
          username: 'DV',
          name: 'David van Dusen',
          email: 'davidvandusen@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Pugface is looking for a pup party!',
          avatar_url: 'https://s-media-cache-ak0.pinimg.com/736x/8b/cd/29/8bcd29ea00df24c2ae478886989a82a5--ice-bear-cartoon-bear-mascot.jpg'
        }),
        knex('users').insert({id: 3,
          username: 'Rosy',
          name: 'Rosy Lee',
          email: 'rosylee@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Boop all the snoots!',
          avatar_url: 'https://lighthouselabs.ca/uploads/team_member/avatar/77/medium_rosy_2x.jpg'
        }),
      ]);
    });
};
