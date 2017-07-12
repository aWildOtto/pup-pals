const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', function () {
});

app.set('view engine', 'ejs');

app.use('/styles', express.static('../styles/build'));
app.use('/scripts', express.static('../search-client/build'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/search', (req, res) => {
  res.render('search');
});

server.listen(3000 || process.env.PORT, () => {
  console.log('Server running');
});
