const socket = io();
socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected to server');
});

socket.on('newMessage', message => {
  console.log('newMessage', message);
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', message => {
  const li = jQuery('<li></li>');
  const a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', event => {
  event.preventDefault();

  const messageTextBox = jQuery('[name=message]');

  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: messageTextBox.val()
    },
    () => {
      messageTextBox.val('');
    }
  );
});

const locationButton = jQuery('#send-location');
locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
    position => {
      locationButton.removeAttr('disabled').text('Send location');
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    () => {
      locationButton.removeAttr('disabled').text('Send location');
      alert('Unable to fetch location.');
    }
  );
});
