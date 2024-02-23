const express = require('express');
const connectDB = require('./db');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const notFoundMiddleware = require('./middlewares/notFoundMiddleware')
const cors = require('cors');
const userRoute = require('./routes/userRoutes')
const chatRoute = require('./routes/chatRoutes');
const authenticate = require('./middlewares/authMiddleware');
const messageRoute = require('./routes/messageRoutes');
// const io = require('socket.io');

// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);


// To accept JSON data
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home Page of MERN chat-app')
});

app.use('/user', userRoute);

app.use('/chat', authenticate, chatRoute);

app.use('/message', authenticate, messageRoute);

app.use(notFoundMiddleware);

const server = app.listen(PORT || 8080, async () => {
    try {
        await connectDB;
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Listening on port:- ${PORT}`);
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'https://tolki.vercel.app'
    }
});

io.on('connection', (socket) => {
    console.log('connected to socket.io');

    // When loads all chats of particular user ---> user room
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        // console.log(userData._id);
        socket.emit('connected');
    });

    // When opens new chat
    socket.on('join chat', (room) => {
        socket.join(room);
        console.log('user joined room ' + room);
    });

    socket.on('typing', (room) => socket.in(room).emit('typing'));

    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

    // new message
    socket.on('new message', (newMessage) => {
        let chat = newMessage.chat;

        if (!chat.users) return console.log('Chat.users is not defined');

        chat.users.forEach((user) => {
            if (user._id === newMessage.sender._id) return;

            socket.in(user._id).emit('message received', newMessage)
        });
    });

    // socket.on('disconnect', (userData) => {
    //     console.log('User Disconnected');
    //     socket.leave(userData._id);
    // });

    socket.off('setup', (userData) => {
        console.log('User Disconnected');
        socket.leave(userData._id);
    });
});


// server.listen(3000, () => {
//     console.log('listening on *:3000');
// });