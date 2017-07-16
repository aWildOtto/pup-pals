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
    resave: true,
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


let userCount = 0;
io.on('connection', function (socket) {
  userCount ++;
  console.log("a user joined: " + userCount + " users");

  console.log(socket.handshake.session.eventId);

  const event_message = dbHelper.getMessagesByEventId(socket.handshake.session.eventId)
  .then((results)=>{
    console.log("all event_posts are " + results);
  });

  socket.on('message', (data)=>{
    console.log("username is", socket.handshake.session );
    const msgId = uuid();
    const eventId = socket.handshake.session.eventId;
    console.log("current event id is", eventId);
    io.broadcast("incomingMessage",{
      msg:data.msg,
      username: socket.handshake.session.username,
      id:msgId
    });
    //TODO: save message to database
    dbHelper.saveMessage(data.msg, socket.handshake.session.user_id, msgId, eventId);
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