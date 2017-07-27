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
    .then(()=>{
      return knex('pups').del()
        .then(()=>{
          return knex('pup_updates').del();
        });
    })
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
                "http://www.petwave.com/~/media/Images/Center/Breed/Dogs/Terrier-Group/Bull-Terrier/Bull-Terrier-puppy.ashx"
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
              return Promise.all([
                insertPupUpdate(//TODO: change the url
                  pup_id,
                  'Can\'t decide if sleeping or eating is better',
                  "https://vetstreet.brightspotcdn.com/dims4/default/b39c83f/2147483647/thumbnail/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F4b%2F79%2Fed7633494767bd00d07d97604c98%2FAP-W8EG6F-ph645080113.jpg"
                ),
                insertPupUpdate(//TODO: change the url
                  pup_id,
                  'Love the grass',
                  "https://vetstreet.brightspotcdn.com/dims4/default/4c5102d/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F74%2F9a03709e8e11e0a2380050568d634f%2Ffile%2FBoston-Terrier-1-645mk062111.jpg"
                ),
              ])
              ;
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
            "https://previews.123rf.com/images/voronin76/voronin761302/voronin76130200101/17688555-The-dog-Siberian-husky-in-the-winter-Stock-Photo.jpg"
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
              return Promise.all([
                insertPupUpdate(//change the url
                  pup_id,
                  'me on the grass',
                  "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
                ),
                insertPupUpdate(
                  pup_id, 
                  'me on the beach',
                  "https://s-media-cache-ak0.pinimg.com/originals/1b/18/59/1b185975b0dad478fe8b47096860647d.jpg"
                )
              ])
            }),
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
                "https://s-media-cache-ak0.pinimg.com/originals/11/df/09/11df0994564516bb631c6c369014080f.jpg"
              )
            }),
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
            .then((pup_id)=>{
              return insertPupUpdate(
                pup_id,
                'I\'m a good boy',
                "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
              )
            })
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
                  "https://s-media-cache-ak0.pinimg.com/736x/3e/61/ae/3e61ae8caee7a448ba11d836d06df16d--husky-pomeranian-mix-husky-mix.jpg"
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
            ).then((pup_id)=>{
                return insertPupUpdate(//change the url
                  pup_id,
                  'Shy me',
                  "https://s-media-cache-ak0.pinimg.com/736x/b5/9f/87/b59f8728480231a869b262c5df1978d9--chicken-nuggets-cute-pomeranian.jpg"
                );
              })
          ]);
        }),
        //5.ti has one dog
        insertUser(
          'tizhang',
          'Ti Zhang',
          'tizhng@gmail.com',
          '123',
          'Had a great time at the sunset beach meetup!',
          '/styles/pictures/ti.jpg'
        )
          .then((id) => {
            return insertPup(
            id,
            'German Shepherd',
            'Large',
            'Active',
            true,
            '4',
            '/styles/pictures/german.jpg',
            'Jessi',
            'female'
            );
          })
          .then((pup_id)=>{
              return insertPupUpdate(//change the url
                pup_id,
                'Ain\'t I attractive?',
                "http://cdn3-www.dogtime.com/assets/uploads/gallery/german-shepherd-dog-breed-pictures/side-3.jpg"
                );
            }),
        //6.matt has 2 dogs
        insertUser(
          'Reece',
          'Reece Simpson',
          'rsimpson@gmail.com',
          '123',
          'Rolling safe with my doggos',
          '/styles/pictures/reece.JPG'
        )
        .then((id) => {
          return Promise.all([
            insertPup(
              id,
              'Border Collie',
              'Medium',
              'Quiet',
              true,
              '2',
              '/styles/pictures/collie.jpg',
              'Calli',
              'female'
          )
            .then((pup_id)=>{
              return insertPupUpdate(//change the url
                pup_id,
                'the name\'s Calli',
                "http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg"
              );
            }),
            insertPup(
              id,
              'Blue Heeler',
              'Small',
              'Playful',
              true,
              '1',
              '/styles/pictures/heeler.jpg',
              'Timmy',
              'male'
            )
            .then((pup_id) => {
              return insertPupUpdate(//change the url
                pup_id,
                'I want more friends~~~',
                "http://cdn3-www.dogtime.com/assets/uploads/gallery/australian-cattle-dog-dog-breed-pictures/5-sidelaying.jpg"
              );
            })
          ]);
        }),
      //7.ali has one dog
        insertUser(
          'alicat',
          'Alison Johnson',
          'alijohnson@gmail.com',
          '123',
          'Going to the park with my puppy',
          '/styles/pictures/morgan.jpg'
        )
          .then((id) => {
            return insertPup(
            id,
            'Chow Chow',
            'Medium',
            'Assertive',
            true,
            '3',
            '/styles/pictures/chow.jpg',
            'Ace',
            'male'
          )
          .then((pup_id) => {
              return insertPupUpdate(//change the url
                pup_id,
                'People say I walk like a lion',
                "https://s-media-cache-ak0.pinimg.com/736x/11/12/09/1112097172845da1ab30cf3fc3eed160--white-chow-chow-chow-chow-puppies.jpg"
              );
            });
        }),
        //8.alec has 2 dogs
        insertUser(
          'alecthom',
          'Alec Thompson',
          'alecthompson@gmail.com',
          '123',
          'Found out my pup Sasha is going to be having puppies! So excited :)',
          '/styles/pictures/alec.jpg'
        )
          .then((id) => {
            return insertPup(
            id,
            'St.Bernard',
            'Large',
            'Calm',
            true,
            '6',
            '/styles/pictures/bernard.jpg',
            'Brock',
            'male'
          )
           .then((pup_id) => {
              return insertPupUpdate(//change the url
                pup_id,
                'I smelt candy from her month',
                "https://i.ytimg.com/vi/naOv2zipzT4/maxresdefault.jpg"
              );
            })
            .then(() => {
              return insertPup(
              id,
              'Great Dane',
              'Large',
              'Quiet',
              true,
              '5',
              '/styles/pictures/dane.jpg',
              'Sasha',
              'female'
            ).then((pup_id) => {
              return insertPupUpdate(//change the url
                pup_id,
                'I\'m too quiet to say anything',
                "https://www.dogbreedinfo.com/images27/GreatDanePurebredDogJunior8Months1.JPG"
              );
            });
          })
       }),
        //9.emma has 2 dogs
        insertUser(
          'emmab024',
          'Emma Barret',
          'emmab@gmail.com',
          '123',
          'Taking my pups to the beach today. They cannot wait!',
          '/styles/pictures/emma.jpg'
        )
          .then((id) => {
            return insertPup(
            id,
            'Chihuahua',
            'Small',
            'Energetic',
            true,
            '4',
            '/styles/pictures/chi.jpg',
            'Finley',
            'male'
          ).then((pup_id) => {
              return insertPupUpdate(//change the url
                pup_id,
                'I\'m small but not weak',
                "http://www.dogbreedslist.info/uploads/allimg/dog-pictures/Chihuahua-3.jpg"
              );
            })
            .then(() => {
              return insertPup(
              id,
              'Long Haired Chihuahua',
              'Small',
              'Friendly',
              true,
              '3',
              '/styles/pictures/chi2.jpg',
              'Betsy',
              'female'
            );
          })
        }),
        //10.ben has one dog
        insertUser(
          'benk',
          'Ben Kaster',
          'benk@gmail.com',
          '123',
          'Met soo many nice pups at the meetup last weekend!',
          '/styles/pictures/mike.jpg'
        )
          .then((id) => {
            return insertPup(
            id,
            'Labradoodle',
            'Medium',
            'Energetic',
            true,
            '3',
            '/styles/pictures/labradoodle.jpg',
            'Chester',
            'male'
          );
        }),
        //11.aisha has two dogs
        insertUser(
          'aishaaa',
          'Aisha Ramachandran',
          'aisha@gmail.com',
          '123',
          'Looking for owners that love a game of fooseball!',
          '/styles/pictures/aisha.jpg'
        )
          .then((id) => {
            return insertPup(
            id,
            'Chinese Crested',
            'Small',
            'Playful',
            true,
            '5',
            '/styles/pictures/crested.jpg',
            'Parker',
            'male'
          )
          .then(() => {
              return insertPup(
              id,
              'Corgi',
              'Small',
              'Friendly',
              true,
              '1',
              '/styles/pictures/corgi.jpg',
              'Jack',
              'male'
            );
          })
        }),
        //12.kian has one dog
        insertUser(
          'kian',
          'Kian Invyr',
          'kian@gmail.com',
          '123',
          'Love playing catch with my boy Jeter',
          '/styles/pictures/kian.jpg'
        )
         .then((id) => {
            return insertPup(
            id,
            'Australian Spirit Groomer',
            'Medium',
            'Playful',
            true,
            '5',
            '/styles/pictures/jeter.jpg',
            'Jeter',
            'male'
          );
         }),
        //13.ella has 2 dogs
        insertUser(
          'ellalynn',
          'Ella Dorner',
          'elladorner@gmail.com',
          '123',
          'Had the best time at the cabin over the weekend, my pups loved the lake!',
          '/styles/pictures/ella.jpg'
        )
         .then((id) => {
            return insertPup(
            id,
            'Golden Retriever',
            'Medium',
            'Playful',
            true,
            '3',
            '/styles/pictures/lucy.jpg',
            'Lucy',
            'female'
          )
            .then(() => {
              return insertPup(
              id,
              'Golden Retriever',
              'Small',
              'Friendly',
              true,
              '1',
              '/styles/pictures/louie.jpg',
              'Louie',
              'male'
            );
          })
        }),
        //14.tyler has one dog
        insertUser(
          'tylertopham',
          'Tyler Topham',
          'tylertopham@gmail.com',
          '123',
          'Going to my first meetup this weekend with Jett, so excited!',
          '/styles/pictures/tyler.jpg'
        )
        .then((id) => {
            return insertPup(
            id,
            'Akita',
            'Medium',
            'Playful',
            true,
            '3',
            '/styles/pictures/akita.jpg',
            'Jett',
            'male'
          );
         }),
        //15.adam has two dogs
        insertUser(
          'adamyeager',
          'Adam Yeager',
          'adamyeager@gmail.com',
          '123',
          'Looking for a new pup to add to the crew. Hit me up if you know of anyone selling their pup!',
          '/styles/pictures/adam.jpg'
        )
        .then((id) => {
            return insertPup(
            id,
            'Shiba Inu',
            'Small',
            'Energetic',
            true,
            '1',
            '/styles/pictures/shiba.jpg',
            'Max',
            'male'
            )
          .then(() => {
              return insertPup(
                id,
                'Rottweiler',
                'Small',
                'Curious',
                true,
                '1',
                '/styles/pictures/rottweiler.jpg',
                'Chase',
                'male'
              );
          });
        }),
        //16.packalu has two dogs
        insertUser(
          'pakalu',
          'Pakalu Papito',
          'pakalu@gmail.com',
          '123',
          'Things I like about other people: their dogs.',
          '/styles/pictures/pakalu.png'
        )
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
                'Doggo',
                'male'
              ),
              insertPup(
                id,
                'Boston Terrier',
                'Small',
                'Energetic',
                true,
                '3',
                '/styles/pictures/boston.jpg',
                'Puppo',
                'male'
              )
            ]);
          }),
          //17.matt has 2 dogs
          insertUser(
            'mattyb',
            'Matt Baxley',
            'mbaxley@gmail.com',
            '123',
            'Just went to my first meetup with Jack, so fun!!',
            'http://www.gangstersout.com/david_gilesbf.JPG'
          )
          .then((id) => {
            return Promise.all([
             insertPup(
              id,
              'Border Collie',
              'Medium',
              'Quiet',
              true,
              '2',
              '/styles/pictures/collie.jpg',
              'Calli',
              'female'
           ),
             insertPup(
              id,
              'Blue Heeler',
              'Small',
              'Playful',
              true,
              '1',
              '/styles/pictures/heeler.jpg',
              'Timmy',
              'male'
             )
           ]);
         })
        //can add more users here

    ]);//return Promise.all
});//del().then
}//export