var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

let rooms = {};

function checkRooms() {
  console.log(rooms);
  let roomarray = Object.values(rooms);
  roomarray.forEach((room) => {
    if (room.length > 1) {
      console.log('Bigger');
    } else {
      console.log('Smaller');
    }
  });
}

function addSocketToRoom(socket) {
  if (socket.handshake.query.room in rooms) {
    console.log('room exist');
    rooms[socket.handshake.query.room].push(socket.id);
  } else {
    console.log('room doesn exist');
    rooms[socket.handshake.query.room] = [socket.id];
  }
}

function removeSocket(socket) {
  rooms[socket.handshake.query.room] = rooms[
    socket.handshake.query.room
  ].filter((id) => id !== socket.id);
}

app.get('/', async (req, res) => {
  res.send('Hello');
});

io.on('connection', async (socket) => {
  console.log('user connected');
  await addSocketToRoom(socket);
  socket.join(socket.handshake.query.room).emit('joined');
  socket.on('disconnect', () => {
    console.log('person disconnected');
    removeSocket(socket);
  });
  socket.on('reconnect', (socket) => {
    console.log('Reconnect');
  });
});

setInterval(checkRooms, 1000);

server.listen(4000);
