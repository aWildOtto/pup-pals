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
const aws = require('aws-sdk');
const knexLogger = require('knex-logger');
const uuid = require('uuid');
const eventRoutes = require("./routes/event");
const userRoutes = require("./routes/user");
const petRoutes = require("./routes/pet");
const ownerRoutes = require("./routes/owner");
const apiRoutes = require("./routes/api");

const dbHelper = require("./lib/dbHelper")(knex);
const session = require("express-session")({
    secret: "My socks are not matching.",
    resave: false,
    saveUninitialized: true
});
const sharedsession = require("express-socket.io-session");

const S3_BUCKET = process.env.S3_BUCKET;


// Use express-session middleware for express
app.use(session);

// Use shared session middleware for socket.io
// setting autoSave:true
io.use(sharedsession(session, {
    autoSave:true
}));

app.use(morgan('dev'));

app.use(knexLogger(knex));

app.set('view engine', 'ejs');

app.use('/styles', express.static('../styles/'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/searchReact', express.static('../search-client/build'));
app.use('/chatReact', express.static('../chat-client/build'));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.get('/', (req, res) => {
  console.log(res.locals.user);
  res.render('index');
});


app.use("/events", eventRoutes(dbHelper));
app.use("/user", userRoutes(dbHelper));
app.use("/", petRoutes(dbHelper));
app.use("/", ownerRoutes(dbHelper));
app.use("/api", apiRoutes(dbHelper));

io.set('authorization', function (handshakeData, callback) {
  // console.log(handshakeData, 'is handshakeData')
  callback(null, true);
});

app.get('/s3', (req, res) => {
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
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
    if(socket.handshake.session.user){
      dbHelper.saveMessage(data.message, socket.handshake.session.user.id, eventId)
        .then((id)=>{
          io.in("room-"+eventId).emit("incomingMessage",{//broadcast to the room
            message:data.message,
            username: socket.handshake.session.user.username,
            id:id[0],
            avatar_url: socket.handshake.session.user.avatar_url
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

app.use("/404", (req, res, next) => {
  res.status(404).render("404");
})
app.use("/500", (req, res, next) => {
  res.status(500).render("500");
})
app.use((req, res, next) => {
  res.status(404).render("404");
})
server.listen( process.env.PORT || 3000, () => {
  console.log('Server running');
});