const bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        //1 .Pakalu has two dogs
        knex('users').insert({
          username: 'pakalu',
          name: 'Pakalu Papito',
          email: 'pakalu@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Things I like about other people: their dogs.',
          avatar_url: '/styles/pictures/pakalu.png'
        })
        .returning('id').then((id) => {
          return Promise.all([
            knex('pups').insert({
              breed: 'Bull Terrier',
              size: 'Medium',
              temperament: 'Playful',
              neutered: true,
              age: '1',
              avatar_url: '/styles/pictures/bull.jpg',
              name: 'Doggo',
              sex: 'male'
            })
            //copy paste this part to add more updates to puppies
            .returning('id')
            .then((pup_id)=>{
              pup_id = Number(pup_id);
              return knex('pup_updates').insert({
                pup_id: pup_id,
                content: 'Man I just love sleeping',
                media_url: "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
              })
            })
            //----------------------
            ,
            knex('pups').insert({
              user_id: Number(id),
              breed: 'Boston Terrier',
              size: 'Small',
              temperament: 'Energetic',
              neutered: true,
              age: '3',
              avatar_url: '/styles/pictures/boston.jpg',
              name: 'Puppo',
              sex: 'male'
            }).returning('id')
            .then((pup_id)=>{
              pup_id = Number(pup_id);
              return knex('pup_updates').insert({//TODO: change the url
                pup_id: pup_id,
                content: 'Can\'t decide if sleeping or eating is better',
                media_url: "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
              });
            })
          ]);
        }),
        //2 .otto has one dog
        knex('users').insert({
          username: 'ottoMatic',
          name: 'Otto Hu',
          email: 'ottohu101@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Darn dogs',
          avatar_url: '/styles/pictures/otto.jpg'
        })
          .returning('id').then((id) => {
            return knex('pups').insert({
            user_id: Number(id),
            breed: 'Husky',
            size: 'Medium-Large',
            temperament: 'Cheerful',
            neutered: true,
            age: '5',
            avatar_url:'/styles/pictures/husky.jpg',
            name: 'Molly',
            sex: 'female'
          }).returning('id')
            .then((pup_id)=>{
              pup_id = Number(pup_id);
              return knex('pup_updates').insert({//change the url
                pup_id: pup_id,
                content: 'wof wof',
                media_url: "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
              });
          })
        }),
        //3.caitlin has 3 dogs
        knex('users').insert({
          username: 'caitlinquon',
          name: 'Caitlin Quon',
          email: 'caitlin.quon@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Looking forward to National Dog Day!',
          avatar_url: '/styles/pictures/caitlin.jpg'
        })
        .returning('id').then((id) => {
          return Promise.all([
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
          }).returning('id')
              .then((pup_id)=>{
                pup_id = Number(pup_id);
                return knex('pup_updates').insert({//change the url
                  pup_id: pup_id,
                  content: 'me on the grass',
                  media_url: "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
                });
              }),
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
          }).returning('id')
              .then((pup_id)=>{
                pup_id = Number(pup_id);
                return knex('pup_updates').insert({//change the url
                  pup_id: pup_id,
                  content: 'gaga',
                  media_url: "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
                })
              }),
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
            })
          ]);
        }),
        //4.donald has two dogs
        knex('users').insert({
          username: 'donaldma',
          name: 'Donald Ma',
          email: 'donaldma@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Cannot wait for my pups birthday party',
          avatar_url: '/styles/pictures/donald.jpg'
        })
        .returning('id').then((id) => {
          return Promise.all([
            knex('pups').insert({
              user_id: Number(id),
              breed: 'Husky Pomeranian',
              size: 'Small',
              temperament: 'Active',
              neutered: true,
              age: '1',
              avatar_url:'/styles/pictures/huskypom.jpg',
              name: 'Baxter',
              sex: 'male'
          }).returning('id')
              .then((pup_id)=>{
                pup_id = Number(pup_id);
                return knex('pup_updates').insert({//change the url
                  pup_id: pup_id,
                  content: 'hello guys, I\'m new here',
                  media_url: "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
                });
              }),
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
            })
          ]);
        }),
        //5.ti has one dog
        knex('users').insert({
          username: 'tizhang',
          name: 'Ti Zhang',
          email: 'tizhng@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Had a great time at the sunset beach meetup!',
          avatar_url: '/styles/pictures/ti.jpg'
        })
          .returning('id').then((id) => {
            return knex('pups').insert({
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
        //6.matt has 2 dogs
        knex('users').insert({
          username: 'Reece',
          name: 'Reece Simpson',
          email: 'rsimpson@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Rolling safe with jack',
          avatar_url: '/styles/pictures/reece.JPG'
        })
        .returning('id').then((id) => {
          return Promise.all([
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
          }).returning('id')
            .then((pup_id)=>{
              pup_id = Number(pup_id);
              return knex('pup_updates').insert({//change the url
                pup_id: pup_id,
                content: 'the name\'s Calli',
                media_url: "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
              });
            }),
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
            })
          ]);
        }),
      //7.ali has one dog
        knex('users').insert({
          username: 'alicat',
          name: 'Alison Johnson',
          email: 'alijohnson@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Going to the park with my puppy',
          avatar_url: '/styles/pictures/morgan.jpg'
        })
          .returning('id').then((id) => {
            return knex('pups').insert({
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
        //8.alec has 2 dogs
        knex('users').insert({
          username: 'alecthom',
          name: 'Alec Thompson',
          email: 'alecthompson@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Found out my pup Sasha is going to be having puppies! So excited :)',
          avatar_url: '/styles/pictures/alec.jpg'
        })
          .returning('id').then((id) => {
            return knex('pups').insert({
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
              return knex('pups').insert({
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
        //9.emma has 2 dogs
        knex('users').insert({
          username: 'emmab024',
          name: 'Emma Barret',
          email: 'emmab@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Taking my pups to the beach today. They cannot wait!',
          avatar_url: '/styles/pictures/emma.jpg'
        })
          .returning('id').then((id) => {
            return knex('pups').insert({
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
              return knex('pups').insert({
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
        //10.ben has one dog
        knex('users').insert({
          username: 'benk',
          name: 'Ben Kaster',
          email: 'benk@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Met soo many nice pups at the meetup last weekend!',
          avatar_url: '/styles/pictures/mike.jpg'
        })
          .returning('id').then((id) => {
            return knex('pups').insert({
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
        //11.aisha has two dogs
        knex('users').insert({
          username: 'aishaaa',
          name: 'Aisha Ramachandran',
          email: 'aisha@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Looking for owners that love a game of fooseball!',
          avatar_url: '/styles/pictures/aisha.jpg'
        })
          .returning('id').then((id) => {
            return knex('pups').insert({
            user_id: Number(id),
            breed: 'Chinese Crested',
            size: 'Small',
            temperament: 'Playful',
            neutered: true,
            age: '5',
            avatar_url:'/styles/pictures/crested.jpg',
            name: 'Parker',
            sex: 'male'
          })
          .then(() => {
              return knex('pups').insert({
              user_id: Number(id),
              breed: 'Corgi',
              size: 'Small',
              temperament: 'Friendly',
              neutered: true,
              age: '1',
              avatar_url:'/styles/pictures/corgi.jpg',
              name: 'Jack',
              sex: 'male'
            });
          })
        }),
        //12.kian has one dog
        knex('users').insert({
          username: 'kian',
          name: 'Kian Invyr',
          email: 'kian@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Love playing catch with my boy Jeter',
          avatar_url: '/styles/pictures/kian.jpg'
        })
         .returning('id').then((id) => {
            return knex('pups').insert({
            user_id: Number(id),
            breed: 'Australian Spirit Groomer',
            size: 'Medium',
            temperament: 'Playful',
            neutered: true,
            age: '5',
            avatar_url:'/styles/pictures/jeter.jpg',
            name: 'Jeter',
            sex: 'male'
          });
         }),
        //13.ella has 2 dogs
        knex('users').insert({
          username: 'ellalynn',
          name: 'Ella Dorner',
          email: 'elladorner@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Had the best time at the cabin over the weekend, my pups loved the lake!',
          avatar_url: '/styles/pictures/ella.jpg'
        })
         .returning('id').then((id) => {
            return knex('pups').insert({
            user_id: Number(id),
            breed: 'Golden Retriever',
            size: 'Medium',
            temperament: 'Playful',
            neutered: true,
            age: '3',
            avatar_url:'/styles/pictures/lucy.jpg',
            name: 'Lucy',
            sex: 'female'
          })
            .then(() => {
              return knex('pups').insert({
              user_id: Number(id),
              breed: 'Golden Retriever',
              size: 'Small',
              temperament: 'Friendly',
              neutered: true,
              age: '1',
              avatar_url:'/styles/pictures/louie.jpg',
              name: 'Louie',
              sex: 'male'
            });
          })
        }),
        //14.tyler has one dog
        knex('users').insert({
          username: 'tylertopham',
          name: 'Tyler Topham',
          email: 'tylertopham@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Going to my first meetup this weekend with Jett, so excited!',
          avatar_url: '/styles/pictures/tyler.jpg'
        })
         .returning('id').then((id) => {
            return knex('pups').insert({
            user_id: Number(id),
            breed: 'Akita',
            size: 'Medium',
            temperament: 'Playful',
            neutered: true,
            age: '3',
            avatar_url:'/styles/pictures/akita.jpg',
            name: 'Jett',
            sex: 'male'
          });
         }),
        //15.adam has two dogs
        knex('users').insert({
          username: 'adamyeager',
          name: 'Adam Yeager',
          email: 'adamyeager@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Looking for a new pup to add to the crew. Hit me up if you know of anyone selling their pup!',
          avatar_url: '/styles/pictures/adam.jpg'
        })
         .returning('id').then((id) => {
            return knex('pups').insert({
            user_id: Number(id),
            breed: 'Shiba Inu',
            size: 'Small',
            temperament: 'Energetic',
            neutered: true,
            age: '1',
            avatar_url:'/styles/pictures/shiba.jpg',
            name: 'Max',
            sex: 'male'
            })
          .then(() => {
              return knex('pups').insert({
                user_id: Number(id),
                breed: 'Rottweiler',
                size: 'Small',
                temperament: 'Curious',
                neutered: true,
                age: '1',
                avatar_url:'/styles/pictures/rottweiler.jpg',
                name: 'Chase',
                sex: 'male'
              });
          });
        })
    ]);//return Promise.all
});//del().then
}//export