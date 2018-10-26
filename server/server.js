const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.static(publicPath));
io.on('connection', socket => {
  console.log('a user connected');

  socket.emit('newMessage', {
    from: 'jon@example.com',
    text: 'hey what is going on',
    createdAt: 123
  });
  socket.on('createMessage', message => {
    console.log('createMessage', message);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
