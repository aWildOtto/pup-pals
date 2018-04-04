# Pup-Pals
Pup-Pals is a web application that assists dog owners to create and join dog meet-up events. It is built with NodeJS, Express, ReactJS, Socket.io, AWS-S3 and PostgreSQL.

[Deployed Version](https://puppals.herokuapp.com/)

[Production Build Repository](https://github.com/nombiezinja/puppal-production)


### Usage

All visitors can browse the events listing on the webpage, create an event, and find events with advanced search of time range and location. They can also browse the profiles of users and their dogs.

Logged-in users can RSVP to events, cancel their attendances, or participate in the real-time message board of specific events. They can also update their personal statuses and upload picture onto the profiles of their dogs.

### Getting Started

1)Clone this repository, cd into each folder and install the dependencies(descibed at the end) individually.  
2)Follow the format of `.example.env` file present in each repository and create a `.env` file for each folder.  
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
To compile the style sheets, run the following commands, open main.scss in your code editor, and perform a save.
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
