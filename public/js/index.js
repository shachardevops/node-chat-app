const socket = io();
socket.on('connect', () => {
  console.log('connected to server');

  socket.emit('createMessage', {
    to: 'yosi@gmail.com',
    text: 'welcome yosi'
  });
});

socket.on('disconnect', () => {
  console.log('disconnected to server');
});

socket.on('newMessage', message => {
  console.log('newMessage', message);
});
