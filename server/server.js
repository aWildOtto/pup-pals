//----------server config-----------------
const ENV = process.env.ENV || "development";
const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);
const bodyParser  = require("body-parser");

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const uuid = require('uuid');

const session = require("express-session")({
    secret: "My socks are not matching.",
    resave: false,
    saveUninitialized: true
});
const sharedsession = require("express-socket.io-session");

// Use express-session middleware for express
app.use(session);

// Use shared session middleware for socket.io
// setting autoSave:true
io.use(sharedsession(session, {
    autoSave:true
}));

const eventRoutes = require("./routes/event");
const userRoutes = require("./routes/user");
const petRoutes = require("./routes/pet");
const ownerRoutes = require("./routes/owner");

const dbHelper = require("./lib/dbHelper")(knex);


app.use(morgan('dev'));

app.use(knexLogger(knex));

app.set('view engine', 'ejs');

app.use('/styles', express.static('../styles/'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/searchReact', express.static('../search-client/build'));
app.use('/chatReact', express.static('../chat-client/build'));

app.locals.user = null;//prepare the object for nav bar, add data to user when logged in and signed up

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/events', (req, res) => {
  dbHelper.getAllEvents().then((results) => {
    res.json(results);
  })
});

app.use("/events", eventRoutes(dbHelper));
app.use("/user", userRoutes(dbHelper));
app.use("/", petRoutes(dbHelper));
app.use("/", ownerRoutes(dbHelper));

io.set('authorization', function (handshakeData, callback) {
  // console.log(handshakeData, 'is handshakeData')
  callback(null, true);
});

let userCount = 0;
io.on('connection', function (socket) {
  userCount ++;
  console.log("a user joined: " + userCount + " users");
  const eventId = socket.handshake.session.eventId;

  if(eventId){
    dbHelper.getMessagesByEventId(eventId)// find all messages under this event
      .then((results) => {
      // console.log( "all event posts: ", results);
        const messages = [];
        results.forEach(function(message){
          messages.push({
            message: message.content,
            avatar_url: message.avatar_url,
            username: message.username,
            id: message.id,
            created_at: message.created_at
          });
        });
      // console.log(messages);
      io.in("room-"+eventId).emit("incomingMessage", messages);
      });
  }

  socket.join("room-"+eventId);//set up and join a room for each event page
  socket.on('message', (data)=>{
    console.log(socket.handshake.session);
    if(socket.handshake.session.userID){
      console.log("username is", socket.handshake.session);
      console.log("current event id is", eventId);
      dbHelper.saveMessage(data.message, socket.handshake.session.userID, eventId)
        .then((id)=>{
          io.in("room-"+eventId).emit("incomingMessage",{//broadcast to the room
            message:data.message,
            username: socket.handshake.session.username,
            id:id[0],
            avatar_url: app.locals.user.avatar_url
          });
      });
    }else{
      socket.emit("notification",{
        id: uuid(),
        type: "notification",
        note: "Please log in"
      });
    }
  });

  socket.on('getEvents', (data) =>{
    dbHelper.getAllEvents(data).then((results) => {

    })
  });
  socket.on("disconnect", (e)=>{
    userCount --;
    console.log("a user left: " + userCount + " users");
  });
});

server.listen( process.env.PORT || 3000, () => {
  console.log('Server running');
});