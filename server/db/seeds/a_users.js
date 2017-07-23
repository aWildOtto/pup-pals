const bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        //Nikki has two dogs
        knex('users').insert({
          username: 'nikki915',
          name: 'Nikki Seidel',
          email: 'nikkis@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Looking for a new puppy! Let me know if you know of anyone selling!!',
          avatar_url: '/styles/pictures/nikki.jpg'
        })
        .returning('id').then((id) => {
          knex('pups').insert({
            user_id: Number(id),
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
                user_id: Number(id),
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
        //otto has one dog 
        knex('users').insert({
          username: 'ottoMatic',
          name: 'Otto Hu',
          email: 'ottohu@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Darn dogs',
          avatar_url: '/styles/pictures/otto.jpg'
        })
          .returning('id').then((id) => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'Husky',
            size: 'Medium-Large',
            temperament: 'Cheerful',
            neutered: true,
            age: '5',
            avatar_url:'/styles/pictures/husky.jpg',
            name: 'Molly',
            sex: 'female'
          });
      }),
        //caitlin has 3 dogs
        knex('users').insert({
          username: 'caitlinquon',
          name: 'Caitlin Quon',
          email: 'caitlin.quon@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Looking forward to National Dog Day!',
          avatar_url: '/styles/pictures/caitlin.jpg'
        })
          .returning('id').then((id) => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'Long-haired Mini Daschund',
            size: 'Small',
            temperament: 'Friendly',
            neutered: true,
            age: '1',
            avatar_url:'/styles/pictures/mini.jpg',
            name: 'Joey',
            sex: 'male'
          })
            .then(() => {
              knex('pups').insert({
              user_id: Number(id),
              breed: 'Long-haired Mini Daschund',
              size: 'Small',
              temperament: 'Playful',
              neutered: true,
              age: '1',
              avatar_url:'/styles/pictures/mini2.jpg',
              name: 'Penny',
              sex: 'female'
            })
              .then(() => {
                knex('pups').insert({
                user_id: Number(id),
                breed: 'Golden Retriever',
                size: 'Medium',
                temperament: 'Active',
                neutered: true,
                age: '1',
                avatar_url:'/styles/pictures/golden.jpg',
                name: 'Charlie',
                sex: 'male'
              });
            })
          })
        }),
        //donald has two dogs
        knex('users').insert({
          username: 'donaldma',
          name: 'Donald Ma',
          email: 'donaldma@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Cannot wait for my pups birthday party',
          avatar_url: '/styles/pictures/donald.jpg'
        })
          .returning('id').then((id) => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'Husky Pomeranian',
            size: 'Small',
            temperament: 'Active',
            neutered: true,
            age: '1',
            avatar_url:'/styles/pictures/huksypom.jpg',
            name: 'Baxter',
            sex: 'male'
          })
            .then(() => {
              knex('pups').insert({
              user_id: Number(id),
              breed: 'Pomeranian',
              size: 'Small',
              temperament: 'Quiet',
              neutered: true,
              age: '2',
              avatar_url:'/styles/pictures/pom.jpg',
              name: 'Fiona',
              sex: 'female'
            });
          })
        }),
        //ti has one dog
        knex('users').insert({
          username: 'tizhang',
          name: 'Ti Zhang',
          email: 'tizhng@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Had a great time at the sunset beach meetup!',
          avatar_url: '/styles/pictures/ti.jpg'
        })
          .returning('id').then((id) => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'German Shepherd',
            size: 'Large',
            temperament: 'Active',
            neutered: true,
            age: '4',
            avatar_url:'/styles/pictures/german.jpg',
            name: 'Jessi',
            sex: 'female'
          });
        }),
        //matt has 2 dogs
        knex('users').insert({
          username: 'mattyb',
          name: 'Matt Baxley',
          email: 'mbaxley@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Just went to my first meetup with Jack, so fun!!',
          avatar_url: '/styles/pictures/david.jpg'
        })
          .returning('id').then((id) => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'Border Collie',
            size: 'Medium',
            temperament: 'Quiet',
            neutered: true,
            age: '2',
            avatar_url:'/styles/pictures/collie.jpg',
            name: 'Calli',
            sex: 'female'
          })
            .then(() => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'Blue Heeler',
            size: 'Small',
            temperament: 'Playful',
            neutered: true,
            age: '1',
            avatar_url:'/styles/pictures/heeler.jpg',
            name: 'Timmy',
            sex: 'male'
          });
        })
      }),
      //ali has one dog
        knex('users').insert({
          username: 'alicat',
          name: 'Alison Johnson',
          email: 'alijohnson@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Going to the park with my puppy',
          avatar_url: '/styles/pictures/morgan.jpg'
        })
          .returning('id').then((id) => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'Chow Chow',
            size: 'Medium',
            temperament: 'Assertive',
            neutered: true,
            age: '3',
            avatar_url:'/styles/pictures/chow.jpg',
            name: 'Ace',
            sex: 'male'
          });
        }),
        //alec has 2 dogs 
        knex('users').insert({
          username: 'alecthom',
          name: 'Alec Thompson',
          email: 'alecthompson@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Found out my pup Sasha is going to be having puppies! So excited :)',
          avatar_url: '/styles/pictures/alec.jpg'
        })
          .returning('id').then((id) => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'St.Bernard',
            size: 'Large',
            temperament: 'Calm',
            neutered: true,
            age: '6',
            avatar_url:'/styles/pictures/bernard.jpg',
            name: 'Brock',
            sex: 'male'
          })
              .then(() => {
              knex('pups').insert({
              user_id: Number(id),
              breed: 'Great Dane',
              size: 'Large',
              temperament: 'Quiet',
              neutered: true,
              age: '5',
              avatar_url:'/styles/pictures/dane.jpg',
              name: 'Sasha',
              sex: 'female'
            });
          })
       }),
        //emma has 2 dogs
        knex('users').insert({
          username: 'emmab024',
          name: 'Emma Barret',
          email: 'emmab@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Taking my pups to the beach today. They cannot wait!',
          avatar_url: '/styles/pictures/emma.jpg'
        })
          .returning('id').then((id) => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'Chihuahua',
            size: 'Small',
            temperament: 'Energetic',
            neutered: true,
            age: '4',
            avatar_url:'/styles/pictures/chi.jpg',
            name: 'Finley',
            sex: 'male'
          })
            .then(() => {
              knex('pups').insert({
              user_id: Number(id),
              breed: 'Long Haired Chihuahua',
              size: 'Small',
              temperament: 'Friendly',
              neutered: true,
              age: '3',
              avatar_url:'/styles/pictures/chi2.jpg',
              name: 'Betsy',
              sex: 'female'
            });
          })
        }),
        //ben has one dog
        knex('users').insert({
          username: 'benk',
          name: 'Ben Kaster',
          email: 'benk@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Met soo many nice pups at the meetup last weekend!',
          avatar_url: '/styles/pictures/mike.jpg'
        })
          .returning('id').then((id) => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'Labradoodle',
            size: 'Medium',
            temperament: 'Energetic',
            neutered: true,
            age: '3',
            avatar_url:'/styles/pictures/labradoodle.jpg',
            name: 'Chester',
            sex: 'male'
          });
        }),
        //aisha has one dog
        knex('users').insert({
          username: 'aishaaa',
          name: 'Aisha Ramachandran',
          email: 'aisha@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Looking for owners that love a game of fooseball!',
          avatar_url: '/styles/pictures/aisha.jpg'
        })
          .returning('id').then((id) => {
            knex('pups').insert({
            user_id: Number(id),
            breed: 'Chinese Crested',
            size: 'Small',
            temperament: 'Playful',
            neutered: true,
            age: '5',
            avatar_url:'/styles/pictures/crested.jpg',
            name: 'Parker',
            sex: 'male'
          });
        })  
      ]);
    });
};