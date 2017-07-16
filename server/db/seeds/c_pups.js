
exports.seed = function(knex, Promise) {
  return knex('pups').del()
    .then(function () {
      return Promise.all([
        knex('pups').insert({id: 1,
          user_id: '1',
          breed: 'Bull Terrier',
          size: 'Medium',
          temperament: 'Playful',
          neutered: true,
          age: '1',
          avatar_url: 'https://s-media-cache-ak0.pinimg.com/736x/b0/9e/a7/b09ea7b85f75a8929392ecd9168102ca.jpg',
          name: 'Rocky',
          sex: 'male'
        }),
        knex('pups').insert({id: 2,
          user_id: '2',
          breed: 'Pug',
          size: 'Small',
          temperament: 'Energetic',
          neutered: false,
          age: '5',
          avatar_url: 'https://mnmidwestpugrescue.wildapricot.org/resources/Pictures/Bella2a.jpg',
          name: 'Pugface',
          sex: 'female'
        }),
        knex('pups').insert({id: 3,
          user_id: '2',
          breed: 'Golden Retriever',
          size: 'Medium-Large',
          temperament: 'Cheerful',
          neutered: true,
          age: '7',
          avatar_url:'https://media1.britannica.com/eb-media/33/136133-004-3385F6F5.jpg',
          name: 'Emma',
          sex: 'female'
        }),
        knex('pups').insert({id: 4,
          user_id: '3',
          breed: 'Doberman',
          size: 'Medium-Large',
          temperament: 'Friendly',
          neutered: true,
          age: '8',
          avatar_url:'https://s-media-cache-ak0.pinimg.com/736x/19/f2/76/19f276156a79bcf6e4cfe3e3884aba5e.jpg',
          name: 'Zeus',
          sex: 'male'
        }),
        knex('pups').insert({id: 5,
          user_id: '3',
          breed: 'Labrador Retriever',
          size: 'Medium-Large',
          temperament: 'Active',
          neutered: true,
          age: '1',
          avatar_url:'https://s-media-cache-ak0.pinimg.com/736x/cb/43/1a/cb431a937eefd5f2db41d12e09960873--wall-calendars-greeting-cards.jpg',
          name: 'Mavis',
          sex: 'female'
        })
      ]);
    });
};
