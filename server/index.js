const express = require('express');
const connectDB = require('./db');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Home Page of MERN chat-app')
});

app.listen(PORT || 8080, async () => {
    try {
        await connectDB;
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error.message);
    }
    console.log(`Listening on port:- ${PORT}`);
});