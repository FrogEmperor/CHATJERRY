const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

// estableciendo port
app.set('port', process.env.PORT || 3000);

require('./sockets')(io);

// enviar index.html
app.use(express.static(path.join(__dirname, 'public')));

// poner server en puerto 3000
server.listen(app.get('port'), () => {
  console.log('listening on port', app.get('port'));
});