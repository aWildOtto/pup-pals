const bcrypt = require("bcrypt");

exports.seed = function(knex, Promise) {
  function insertUser(username, name, email, password, status, avatar_url){
    return knex('users').insert({
      username,
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      status,
      avatar_url
    }).returning("id");
  }

  function insertPup(user_id, breed, size, temperament, neutered, age, avatar_url, name, sex){
    user_id = Number(user_id);
    return knex('pups').insert({
      user_id,
      breed,
      size,
      temperament,
      neutered,
      age,
      avatar_url,
      name,
      sex
    })
    //copy paste this part to add more updates to puppies
    .returning('id');
  }

  function insertPupUpdate(pup_id, content, media_url){
    pup_id = Number(pup_id);
    return knex('pup_updates').insert({
      pup_id,
      content,
      media_url
    });
  }

  return knex('users').del()
    .then(function () {
      return Promise.all([
        //1 .Nikki has two dogs
        insertUser(
          'nikki915',
          'Nikki Seidel',
          'nikkis@gmail.com',
          '123',
          'Looking for a new puppy! Let me know if you know of anyone selling!!',
          '/styles/pictures/nikki.jpg')
        .then((id) => {
          return Promise.all([
            insertPup(
              id,
              'Bull Terrier',
              'Medium',
              'Playful',
              true,
              '1',
              '/styles/pictures/bull.jpg',
              'Tucker',
              'male'
            )
            //copy paste this part to add more updates to puppies
            .then((pup_id)=>{
              return insertPupUpdate(
                pup_id,
                "Man I just love sleeping",
                "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
              );
            })
            //----------------------
            ,
            insertPup(
              id,
              'Boston Terrier',
              'Small',
              'Energetic',
              true,
              '3',
              '/styles/pictures/boston.jpg',
              'Brodie',
              'male'
            )
            .then((pup_id)=>{
              return insertPupUpdate(//TODO: change the url
                pup_id,
                'Can\'t decide if sleeping or eating is better',
                "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
              );
            })
          ]);
        }),
        //2 .otto has one dog 
        insertUser(
          'ottoMatic',
          'Otto Hu',
          'ottohu101@gmail.com',
          '123',
          'Darn dogs',
          '/styles/pictures/otto.jpg'
        )
        .then((id) => {
          return insertPup(
          id,
          'Husky',
          'Medium-Large',
          'Cheerful',
          true,
          '5',
          '/styles/pictures/husky.jpg',
          'Molly',
          'female'
        )
        .then((pup_id)=>{
          return insertPupUpdate(//change the url
            pup_id,
            'wof wof',
            "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
          );
        })
        }),
        //3.caitlin has 3 dogs
        insertUser(
          'caitlinquon',
          'Caitlin Quon',
          'caitlin.quon@gmail.com',
          '123',
          'Looking forward to National Dog Day!',
          '/styles/pictures/caitlin.jpg'
        )
        .then((id) => {
          return Promise.all([
            insertPup(
              id,
              'Long-haired Mini Daschund',
              'Small',
              'Friendly',
              true,
              '1',
              '/styles/pictures/mini.jpg',
              'Joey',
              'male'
            )
            .then((pup_id)=>{
              return insertPupUpdate(//change the url
                pup_id,
                'me on the grass',
                "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
              );
            }
            ),
            insertPup(
              id,
              'Long-haired Mini Daschund',
              'Small',
              'Playful',
              true,
              '1',
              '/styles/pictures/mini2.jpg',
              'Penny',
              'female'
            )
            .then((pup_id)=>{
              return insertPupUpdate(//change the url
                pup_id,
                'gaga',
                "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
              )
            }
            ),
            insertPup(
              id,
              'Golden Retriever',
              'Medium',
              'Active',
              true,
              '1',
              '/styles/pictures/golden.jpg',
              'Charlie',
              'male'
            )
          ]);
        }),
        //4.donald has two dogs
        insertUser(
          'donaldma',
          'Donald Ma',
          'donaldma@gmail.com',
          '123',
          'Cannot wait for my pups birthday party',
          '/styles/pictures/donald.jpg'
        )
        .then((id) => {
          return Promise.all([
            insertPup(
              id,
              'Husky Pomeranian',
              'Small',
              'Active',
              true,
              '1',
              '/styles/pictures/huskypom.jpg',
              'Baxter',
              'male'
            )
              .then((pup_id)=>{
                return insertPupUpdate(//change the url
                  pup_id,
                  'hello guys, I\'m new here',
                  "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
                );
              }),
            insertPup(
              id,
              'Pomeranian',
              'Small',
              'Quiet',
              true,
              '2',
              '/styles/pictures/pom.jpg',
              'Fiona',
              'female'
            )
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
          username: 'mattyb',
          name: 'Matt Baxley',
          email: 'mbaxley@gmail.com',
          password: bcrypt.hashSync('123', 10),
          status: 'Just went to my first meetup with Jack, so fun!!',
          avatar_url: '/styles/pictures/david.jpg'
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