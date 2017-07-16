const ENV = process.env.ENV || "development";
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const uuid = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socket(server);
const bodyParser  = require("body-parser");

const session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
const sharedsession = require("express-socket.io-session");

// Use express-session middleware for express
app.use(session);

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

const eventRoutes = require("./routes/event");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");

const dbHelper = require("./lib/dbHelper")(knex);

let userCount = 0;
io.on('connection', function (socket) {
  userCount ++;
  console.log(userCount);
  socket.on('message', (data)=>{
    console.log(data);
    socket.emit("incomingMessage",{
      msg:data.msg,
      username: "caitlin",
      id:uuid()
    })
  });
  socket.on("disconnect", (e)=>{
    userCount --;
    console.log(userCount + " users");
  })
});

app.use(morgan('dev'));

app.use(knexLogger(knex));

app.set('view engine', 'ejs');


app.use('/styles', express.static('../styles/'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieSession({
  secret: 'My socks aren not matching.'
}));

app.use('/scripts', express.static('../search-client/build'));

app.get('/', (req, res) => {
  res.render('index');

});


app.use("/events", eventRoutes(dbHelper));
app.use("/user", userRoutes(dbHelper));
app.use("/profile", profileRoutes(dbHelper));

server.listen(3000 || process.env.PORT, () => {
  console.log('Server running');
});