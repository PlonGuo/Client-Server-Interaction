import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(__dirname, 'dist')));
app.use(cors({ origin: 'http://localhost:5173' })); // express CORS

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
  });

  let onlineUsers = 0;
  let messageCount = 0;

  const io = new Server(server, { // Socket IO CORS
    cors: {
      origin: 'http://localhost:5173', // allow frontend vite to request backend service
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // eslint-disable-next-line no-unused-vars
  io.on('connection', (socket) => {
    onlineUsers++; // once a user connect
    io.emit('user count', onlineUsers);

    //  When user disconnect or refresh the page
    socket.on('disconnect', () => {
      onlineUsers--;
      io.emit('user count', onlineUsers);
    });

    // received the msg from clients, add timestamp and username
    socket.on('chat message', (data) => {
        const timestamp = new Date().toLocaleTimeString();
        const messageData = {
            username: data.username,
            message: data.message,
            timestamp,
        }
        messageCount++;
        io.emit('message count', messageCount); 
        io.emit('chat message', messageData); // send the received msg to web page, so users can view their messages
    });
    
    


  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});