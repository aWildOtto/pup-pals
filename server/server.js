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

io.set('authorization', function (handshakeData, callback) {
  // console.log(handshakeData, 'is handshakeData')
  console.log('socket request', handshakeData.headers.referer)
  callback(null, true);
});

let userCount = 0;
io.on('connection', function (socket) {
  userCount ++;
  //console.log("a user joined: " + userCount + " users");
  if(socket.handshake.session) {
    console.log(socket.handshake.session.eventId);
  }
  //const sessionId = socket.handshake.sessionID
  //console.log(socket.handshake.sessionStore.sessions[sessionId].cookie.eventId);
  // console.log(socket.handshake.session.eventId);
  // const eventId = socket.handshake.session.cookie.eventId;
  //console.log(socket.handshake.headers.referer.slice(29))
  var eventId = socket.handshake.headers.referer.slice(29)
  if(eventId){
    dbHelper.getMessagesByEventId(eventId)// find all messages under this event
    .then((results) => {
      // console.log( "all event posts: ", results);
      const messages = [];
      results.forEach(function(message){
         messages.push({
          message: message.content,
          username: message.user_id,//TODO: need username for this message
          id: message.id
        });
      })
      // console.log(messages);
      io.in("room-"+eventId).emit("incomingMessage", messages);
      });
    }

  socket.join("room-"+eventId);//set up and join a room for each event page
  socket.on('message', (data)=>{
    console.log("username is", socket.handshake.session );
    const msgId = uuid();
    console.log("current event id is", eventId);
    io.in("room-"+eventId).emit("incomingMessage",{//broadcast to the room
      msg:data.message,
      username: socket.handshake.session.username,
      id:msgId
    });
    dbHelper.saveMessage(data.message, socket.handshake.session.user_id, msgId, eventId)
      .then((results)=>{console.log(results)});
    //TODO: save message to database
  });

  socket.on("disconnect", (e)=>{
    userCount --;
    console.log("a user left: " + userCount + " users");
  })
});

app.use(morgan('dev'));

app.use(knexLogger(knex));

app.set('view engine', 'ejs');


app.use('/styles', express.static('../styles/'));

app.use(bodyParser.urlencoded({ extended: true }));


app.use('/scripts', express.static('../search-client/build'));

app.get('/', (req, res) => {
  res.render('index');
});


app.use("/events", eventRoutes(dbHelper));
app.use("/user", userRoutes(dbHelper));
app.use("/", petRoutes(dbHelper));
app.use("/", ownerRoutes(dbHelper));

server.listen(3000 || process.env.PORT, () => {
  console.log('Server running');
});