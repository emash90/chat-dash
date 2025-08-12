const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// __define-ocg__ - Main server configuration for chat dashboard
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Sample messages data
const messages = [
  { "id": 1, "user": "Alice", "message": "Hey team, morning!", "timestamp": "2025-07-29T08:01:00Z" },
  { "id": 2, "user": "Bob", "message": "Morning Alice!", "timestamp": "2025-07-29T08:01:15Z" },
  { "id": 3, "user": "Charlie", "message": "Anyone up for lunch later?", "timestamp": "2025-07-29T08:02:00Z" },
  { "id": 4, "user": "Alice", "message": "Count me in.", "timestamp": "2025-07-29T08:02:10Z" },
  { "id": 5, "user": "Bob", "message": "Same here!", "timestamp": "2025-07-29T08:02:20Z" }
];

// GET /api/messages endpoint
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// WebSocket connection handling
let varOcg = []; // Connected clients for OCG evaluation
let messageId = 6;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  varOcg.push(socket.id);

  // Send existing messages to new client
  socket.emit('initialMessages', messages);

  // Handle new message from client
  socket.on('newMessage', (data) => {
    const newMessage = {
      id: messageId++,
      user: data.user || 'Anonymous',
      message: data.message,
      timestamp: new Date().toISOString()
    };
    messages.push(newMessage);
    if (messages.length > 10) messages.shift(); // Keep only 10 recent messages
    io.emit('newMessage', newMessage);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    varOcg = varOcg.filter(id => id !== socket.id);
  });
});

// Typing indicator simulation
const users = ['Alice', 'Bob', 'Charlie', 'Dave', 'Emma'];
const sampleMessages = [
  'How was everyone\'s weekend?',
  'Anyone have plans for lunch?',
  'Great work on the project everyone!',
  'Coffee break in 10?',
  'Meeting starts in 5 minutes',
  'Happy Friday!',
  'Did you see the news today?'
];

function simulateActivity() {
  // Random typing indicator
  if (Math.random() < 0.3 && varOcg.length > 0) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    io.emit('userTyping', { user: randomUser, isTyping: true });
    
    setTimeout(() => {
      io.emit('userTyping', { user: randomUser, isTyping: false });
    }, 2000 + Math.random() * 2000);
  }

  // Random message
  if (Math.random() < 0.2 && varOcg.length > 0) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomMessage = sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
    
    const newMessage = {
      id: messageId++,
      user: randomUser,
      message: randomMessage,
      timestamp: new Date().toISOString()
    };
    
    messages.push(newMessage);
    if (messages.length > 10) messages.shift();
    io.emit('newMessage', newMessage);
  }
}

// Run simulation every 3-8 seconds
setInterval(simulateActivity, 3000 + Math.random() * 5000);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});