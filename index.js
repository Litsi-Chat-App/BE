var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', async (req, res) => {
  res.send('Hello');
});

io.on('connection', (socket) => {
  console.log('user connected');
});

server.listen(4000);
