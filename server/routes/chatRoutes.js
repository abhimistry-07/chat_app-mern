const express = require('express');
const chatModel = require('../models/chatModel');
const userModel = require('../models/userModel');
// const authenticate = require('../middlewares/authMiddleware')

const chatRoute = express.Router();

chatRoute.post('/', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        console.log("UserId param not sent with request");
        return res.status(400).send({ msg: 'UserID param not sent with request' })
    }

    var isChat = await chatModel.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ],
    })
        .populate("users", "-password")
        .populate("latestMessage");

    isChat = await userModel.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    if (isChat.length > 0) {
        res.status(200).send(isChat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await chatModel.create(chatData);
            const FullChat = await chatModel.findOne({ _id: createdChat?._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
        } catch (error) {
            res.status(400).send(error);
        }
    }
});

chatRoute.get('/', async (req, res) => {
    try {
        chatModel.find({
            users: { $elemMatch: { $eq: req.user._id } }
        })
            .populate('users', '-password')
            .populate('groupAdmin', '-password')
            .populate('latestMessage')
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                results = await userModel.populate(results, {
                    path: 'latestMessage.sender',
                    select: 'name pic email',
                });
                res.status(200).send(results);
            });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

chatRoute.post('/group', (req, res) => {

});

chatRoute.put('/rename', (req, res) => {

});

chatRoute.put('/removefrgrp', (req, res) => {

});

chatRoute.put('/addtogrp', (req, res) => {

});


module.exports = chatRoute;