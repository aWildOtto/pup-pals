const bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({
          username: 'nikki915',
          name: 'Nikki Seidel',
          email: 'nikkis@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Looking for a new puppy! Let me know if you know of anyone selling!!',
          avatar_url: '/styles/pictures/nikki.jpg'
        })
        .returning((id) => {
          knex('pups').insert({
            user_id: id,
            breed: 'Bull Terrier',
            size: 'Medium',
            temperament: 'Playful',
            neutered: true,
            age: '1',
            avatar_url: '/styles/pictures/bull.jpg',
            name: 'Tucker',
            sex: 'male'
          })
          .then(()=> {
            knex('pups').insert({
                user_id: id,
                breed: 'Boston Terrier',
                size: 'Small',
                temperament: 'Energetic',
                neutered: true,
                age: '3',
                avatar_url: '/styles/pictures/boston.jpg',
                name: 'Brodie',
                sex: 'male'
              });
            })
        }),
        knex('users').insert({
          username: 'ottoMatic',
          name: 'Otto Hu',
          email: 'ottohu@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Darn dogs',
          avatar_url: '/styles/pictures/otto.jpg'
        })
        .returning((id) => {
          knex('pups').insert({
          user_id: id,
          breed: 'Husky',
          size: 'Medium-Large',
          temperament: 'Cheerful',
          neutered: true,
          age: '5',
          avatar_url:'/styles/pictures/husky.jpg',
          name: 'Molly',
          sex: 'female'
        }),
        })

        knex('users').insert({
          username: 'caitlinquon',
          name: 'Caitlin Quon',
          email: 'caitlin.quon@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Looking forward to National Dog Day!',
          avatar_url: '/styles/pictures/caitlin.jpg'
        }),
        knex('users').insert({id: 4,
          username: 'donaldma',
          name: 'Donald Ma',
          email: 'donaldma@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Cannot wait for my pups birthday party',
          avatar_url: '/styles/pictures/donald.jpg'
        }),
        knex('users').insert({id: 5,
          username: 'tizhang',
          name: 'Ti Zhang',
          email: 'tizhng@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Had a great time at the sunset beach meetup!',
          avatar_url: '/styles/pictures/ti.jpg'
        }),
        knex('users').insert({id: 6,
          username: 'mattyb',
          name: 'Matt Baxley',
          email: 'mbaxley@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Just went to my first meetup with Jack, so fun!!',
          avatar_url: '/styles/pictures/david.jpg'
        }),
        knex('users').insert({id: 7,
          username: 'alicat',
          name: 'Alison Johnson',
          email: 'alijohnson@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Going to the park with my puppy',
          avatar_url: '/styles/pictures/morgan.jpg'
        }),
        knex('users').insert({id: 8,
          username: 'alecthom',
          name: 'Alec Thompson',
          email: 'alecthompson@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Found out my pup Sasha is going to be having puppies! So excited :)',
          avatar_url: '/styles/pictures/alec.jpg'
        }),
          knex('users').insert({id: 9,
          username: 'emmab024',
          name: 'Emma Barret',
          email: 'emmab@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Taking my pups to the beach today. They cannot wait!',
          avatar_url: '/styles/pictures/emma.jpg'
        }),
          knex('users').insert({id: 10,
          username: 'benk',
          name: 'Ben Kaster',
          email: 'benk@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Met soo many nice pups at the meetup last weekend!',
          avatar_url: '/styles/pictures/mike.jpg'
        }),
          knex('users').insert({id: 11,
            username: 'aishaaa',
            name: 'Aisha Ramachandran',
            email: 'aisha@gmail.com',
            password: bcrypt.hashSync('123', 10),
            status: 'Looking for owners that love a game of fooseball!',
            avatar_url: '/styles/pictures/aisha.jpg'
          })
        
        
      ]);
    });
};