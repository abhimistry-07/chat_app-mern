const express = require('express');
const connectDB = require('./db');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const notFoundMiddleware = require('./middlewares/notFoundMiddleware')
const cors = require('cors');
const userRoute = require('./routes/userRoutes')
const chatRoute = require('./routes/chatRoutes');
const authenticate = require('./middlewares/authMiddleware')


// To accept JSON data
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home Page of MERN chat-app')
});

app.use('/user', userRoute);

app.use('/chat', authenticate, chatRoute);

app.use(notFoundMiddleware);

app.listen(PORT || 8080, async () => {
    try {
        await connectDB;
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Listening on port:- ${PORT}`);
});