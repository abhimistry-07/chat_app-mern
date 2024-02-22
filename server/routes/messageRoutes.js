const express = require('express');
const messageModel = require('../models/messageModel');
const userModel = require('../models/userModel');
const chatModel = require('../models/chatModel');

const messageRoute = express.Router();

messageRoute.post('/', async (req, res) => {
    const { content, chatId } = req.body;

    if (!content || !chatId) {
        console.log('Invalid data passed into request');
        return res.status(400).send('Invalid data passed into request')
    };

    let newMsg = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        let msg = await messageModel.create(newMsg);

        msg = await msg.populate("sender", "name pic");
        msg = await msg.populate("chat");
        msg = await userModel.populate(msg, {
            path: 'chat.users',
            select: 'name pic email'
        });

        await chatModel.findByIdAndUpdate(req.body.chatId, {
            latestMessage: msg
        });

        res.status(200).json(msg);

    } catch (error) {
        res.status(400).send(error.message);
    }
});

messageRoute.get('/:chatId', async (req, res) => {

    const { chatId } = req.params;

    try {

        const messages = await messageModel.find({ chat: chatId }).populate("sender", "name pic email").populate('chat')

        res.status(200).json(messages);

    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = messageRoute;