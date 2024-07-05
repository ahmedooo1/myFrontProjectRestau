// const fs = require('fs');
// const https = require('https');
// const socketIo = require('socket.io');
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// const server = https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/live/api.aa-world.store/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/api.aa-world.store/fullchain.pem')
// }, app);

// const io = socketIo(server, {
//   cors: {
//     origin: 'https://app.aa-world.store',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['my-custom-header'],
//     credentials: true
//   }
// });

// app.use(bodyParser.json());

// app.post('/notify', (req, res) => {
//   const notification = req.body;
//   io.emit('new-order', notification);
//   res.status(200).send('Notification sent');
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

// server.listen(3001, () => {
//   console.log('WebSocket server is running on port 3001');
// });

// module.exports = io;
