# Pup-Pals

A platform for dog owners to create and join dog meet-up events. This web application is built with NodeJS, Express, ReactJS, socket.io, AWS-S3 and Postgresql.

[Deployed Version](https://puppals.herokuapp.com/)

[Production Build Repository](https://github.com/nombiezinja/puppal-production)


### Usage

Any user can browse events, user profiles, and dog profiles belonging to users, as well as search for events in the search page, narrow them down by time range and location and see the filtered results real-time.

Logged-in users can RSVP to events, cancel their attendance, or participate in the real-time message board of specific events. Logged-in users can also update their personal status, as well as upload picture updates on the individual profiles of their dogs.

### Getting Started

1)Clone this repository, cd into each folder and install the dependencies individually.
2)Create .env file for each folder following the format of .example.env files present in the repository.
3)Run migrations and seed files.



To start the express server:
```
cd server
npm run start
```

To start the search-client server:
```
cd search-client
npm run webpack1
```
To start the chat-client server:
```
cd chat-client
npm run webpack2
```
To compile the style sheets, run the following commands, then open main.scss in your code editor, perform a save.
```
cd styles
npm run sass:dev
```

You are all set, open the web app on your browser: http://localhost:3000/

### Screenshot

!["Home Page"](https://github.com/aWildOtto/pup-pals/blob/master/docs/home.png)
!["Create Event"](https://github.com/aWildOtto/pup-pals/blob/master/docs/create.png)
!["Search"](https://github.com/aWildOtto/pup-pals/blob/master/docs/location:date.png)
!["Event Detail"](https://github.com/aWildOtto/pup-pals/blob/master/docs/detail.png)
!["Emoji"](https://github.com/aWildOtto/pup-pals/blob/master/docs/emoji.png)
!["User Profile"](https://github.com/aWildOtto/pup-pals/blob/master/docs/user.png)
!["Pet Profile"](https://github.com/aWildOtto/pup-pals/blob/master/docs/pet.png)
!["Pet photo upload"](https://github.com/aWildOtto/pup-pals/blob/master/docs/upload.png)
!["Calendar"](https://github.com/aWildOtto/pup-pals/blob/master/docs/calendar.png)

### Dependencies

Dependencies for express server:
* aws-sdk
* express
* express-socket.io-session
* geocoder
* knex
* moment
* socket.io
* ejs
* fullcalendar

Dependencies for search client:
* axios
* babel-core
* babel-loader
* moment
* react
* react-dom
* react-google-maps
* react-moment
* webpack

Dependencies for chat client:
* babel-core
* babel-loader
* emoji-mart
* moment
* react
* react-dom
* react-moment
* socket.io-client
* webpack

### Contributors

* [Caitlin](https://github.com/caitlinquon)
* [Donald](https://github.com/donaldma)
* [Otto](https://github.com/aWildOtto)
* [Ti](https://github.com/nombiezinja)

Disclaimer: this project is meant for learning purpose only, please do not use.