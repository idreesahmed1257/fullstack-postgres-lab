const express = require('express');
const app = express();
const PORT = 5000;

const cors = require('cors');

app.use(cors());



//Web Socket Logic
// New imports
const http = require('http').Server(app);
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3001"
    }
});
var count = 0;

socketIO.on('connect', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    count++;
    socket.on('message', (message) => {
        console.log(message);
        socketIO.emit('notification', message + 'Comming From Scoket');
    });
    console.log("Connected users:", count)
    socketIO.emit('notification', 'Hello from server');

    socket.on('disconnect', () => {
        count--;
        console.log(`🔥: A user disconnected ${socket.id} 🔥`);
    });
});


app.get('/api', (req, res) => {
    console.log("socket", socket);
    res.json({
        message: 'Hello world',
    });
});

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
