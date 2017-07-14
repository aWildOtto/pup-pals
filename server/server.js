const express = require('express');
const http = require('http');
const socket = require('socket.io');
const ENV = process.env.ENV || "development";

const app = express();
const server = http.createServer(app);
const io = socket(server);
const bodyParser  = require("body-parser");


const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');


const eventRoutes = require("./routes/event");
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");

const dbHelper = require("./lib/dbHelper")(knex);


io.on('connection', function () {
});

app.use(morgan('dev'));

app.use(knexLogger(knex));

app.set('view engine', 'ejs');

app.use('/styles', express.static('../styles/'));
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
