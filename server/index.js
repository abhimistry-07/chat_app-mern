const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Home Page of MERN chat-app')
});

app.listen(PORT || 8080, () => {
    console.log(`Listening on ${PORT}`);
});