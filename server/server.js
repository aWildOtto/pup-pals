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


io.on('connection', function () {
});

app.use(morgan('dev'));

app.use(knexLogger(knex));

app.set('view engine', 'ejs');

app.use('/styles', express.static('../styles/build'));
app.use('/scripts', express.static('../search-client/build'));

app.get('/', (req, res) => {
  res.render('index');
  //sample knex test query to make sure connected to database
  knex.select().table('test').then(function(results){
    console.log(results)
  });

});

app.get('/search', (req, res) => {
  res.render('search');
});

server.listen(3000 || process.env.PORT, () => {
  console.log('Server running');
});
