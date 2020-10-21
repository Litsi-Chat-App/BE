var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.get('/', async (req, res) => {
  res.send('Hello');
});

let namespace = io.of('/tag');

namespace.on('connection', (socket) => {
  console.log('namespace connected');
  console.log(socket.handshake.query.room);
});

// io.on('connection', (socket) => {
//   console.log('user connected');
// });

server.listen(4000);
