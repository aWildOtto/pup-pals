function newArr (data,table) {
  arr = [];
  data.forEach(function(item){
    if(!arr.item.table){
      arr.push(item.table);
    }
  });
  return arr
}

const dataset = [ anonymous {
    username: 'Rosy',
    name: 'Rosy Lee',
    avatar_url: 'https://lighthouselabs.ca/uploads/team_member/avatar/77/medium_rosy_2x.jpg',
    status: 'Boop all the snoots!',
    pups:
     { id: 4,
       user_id: 3,
       breed: 'Doberman',
       size: 'Medium-Large',
       temperament: 'Friendly',
       neutered: true,
       age: 8,
       avatar_url: 'https://s-media-cache-ak0.pinimg.com/736x/19/f2/76/19f276156a79bcf6e4cfe3e3884aba5e.jpg',
       created_at: '2017-07-15T16:25:16.100558-07:00',
       updated_at: '2017-07-15T16:25:16.100558-07:00',
       name: 'Zeus',
       sex: 'male' },
    events:
     { id: 31,
       creator_user_id: 3,
       title: 'Doggos Beach Party',
       description: 'Bring your pups to the beach! All pups welcome.',
       location: 'Sunset Beach Park',
       event_time: '2017-07-23T19:48:31.893-07:00',
       open_status: true,
       created_at: '2017-07-15T16:25:16.075693-07:00',
       updated_at: '2017-07-15T16:25:16.075693-07:00' } },
  anonymous {
    username: 'Rosy',
    name: 'Rosy Lee',
    avatar_url: 'https://lighthouselabs.ca/uploads/team_member/avatar/77/medium_rosy_2x.jpg',
    status: 'Boop all the snoots!',
    pups:
     { id: 5,
       user_id: 3,
       breed: 'Labrador Retriever',
       size: 'Medium-Large',
       temperament: 'Active',
       neutered: true,
       age: 1,
       avatar_url: 'https://s-media-cache-ak0.pinimg.com/736x/cb/43/1a/cb431a937eefd5f2db41d12e09960873--wall-calendars-greeting-cards.jpg',
       created_at: '2017-07-15T16:25:16.101249-07:00',
       updated_at: '2017-07-15T16:25:16.101249-07:00',
       name: 'Mavis',
       sex: 'female' },
    events:
     { id: 31,
       creator_user_id: 3,
       title: 'Doggos Beach Party',
       description: 'Bring your pups to the beach! All pups welcome.',
       location: 'Sunset Beach Park',
       event_time: '2017-07-23T19:48:31.893-07:00',
       open_status: true,
       created_at: '2017-07-15T16:25:16.075693-07:00',
       updated_at: '2017-07-15T16:25:16.075693-07:00' } } ]

newArr(dataset, pups)