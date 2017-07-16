const ENV = process.env.ENV || "development";
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const uuid = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socket(server);
const bodyParser  = require("body-parser");
const cookieSession = require('cookie-session');

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');

const eventRoutes = require("./routes/event");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");

const dbHelper = require("./lib/dbHelper")(knex);


io.on('connection', function (socket) {
  console.log(socket);
  socket.emit("i",{msg: "iujiuimn"});
  socket.on('message', (data)=>{
    console.log(data);
    socket.emit("incomingMessage",{
      msg:data.msg,
      username: "caitlin",
      id:uuid()
    })
  });
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
