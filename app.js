'user strict';

// Instatiate Express and listen to server
const express - require('express');
const app = express();

// Router setup for --> html
app.use(express.static(__dirname + '/views'));
// Router setup for --> js, css, images
app.use(express.static(__dirname + '/public'));

// Server setup for Real-Time Communication (RTC) between server <--> browser
const server = app.listen(5000);
// Routing path
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

const io = require('socket.io')(server);
io.on('connection', function(socket) {
 console.log('a user connected');
});

const apiai = require('apiai')('1a83a4e7127d443c8a1fa3ddd902acd8');

// Initialize Socket.IO
const socket = io();
io.on('connection', function(socket) {
 socket.on('Chat Message', (text) => {
   // Retrieve response to user's message
   let apiaiReq = apiai.textRequest(text, {
     sessionId: request.body.sessionId
   });
   // Prepares response transmission back to browser
   apiaiReq.on('response', (response) => {
     let aiText = response.result.fulfillment.speech;
     socket.emit('bot reply', aiText);
   });
   apiaiReq.on('error', (error) => {
     console.log('error');
   });
   apiaiReq.end();
 });
});
