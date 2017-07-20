const bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
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
        knex('users').insert({id: 4,
          username: 'Lyla',
          name: 'Lyla Barret',
          email: 'lylabarret@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Cannot wait for my pups birthday party',
          avatar_url: 'https://s-media-cache-ak0.pinimg.com/236x/b0/90/2d/b0902dfc80e18605421edf58e8f3e0e0--best-eyeglasses-glasses-frames.jpg'
        }),
        knex('users').insert({id: 5,
          username: 'Emma',
          name: 'Emma Johnson',
          email: 'emmajohnson@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Looking for some golden retriever pups to play with Gizmo',
          avatar_url: 'https://c1.staticflickr.com/6/5252/5403292396_0804de9bcf_b.jpg'
        }),
        knex('users').insert({id: 6,
          username: 'Matt',
          name: 'Matt Baxley',
          email: 'mbaxley@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Just went to my first meetup with Jack, so fun!!',
          avatar_url: 'http://thetrashcan.co/wp-content/uploads/2016/05/election.jpg'
        }),
        knex('users').insert({id: 7,
          username: 'Chad',
          name: 'Chad Bohlman',
          email: 'chadbohlman@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Going to the park with my puppy',
          avatar_url: 'http://thetrashcan.co/wp-content/uploads/2016/05/election.jpg'
        })
      ]);
    });
};