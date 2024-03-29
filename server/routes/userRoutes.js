const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../config/generateToken');
const authenticate = require('../middlewares/authMiddleware')


const userRoute = express.Router();

userRoute.post('/register', async (req, res) => {
    const { name, email, password, pic, isAdmin } = req.body;

    try {

        if (!name || !email || !password) {
            return res.status(400).send({ 'msg': 'Please enter all fields' })
        }

        const isUserExist = await userModel.findOne({ email });

        // console.log(isUserExist);

        if (isUserExist) {
            return res.status(400).send({ msg: 'User already exists' });
        }

        const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*[a-zA-Z]).{8,}$/;

        if (!passRegex.test(password)) {
            return res.status(400).send({ msg: "Please select a new password" })
        }

        const newPass = await bcrypt.hash(password, 5);

        const user = await userModel.create({
            ...req.body,
            password: newPass
        });

        const token = generateToken(user._id);
        // // console.log(token);
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            // password: newPass,
            pic: user.pic,
            token
        })

        // res.status(200).send({ 'msg': 'New user has been registered.', user });
    } catch (error) {
        res.status(400).send(error);
    }
});

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).send({ msg: 'User not found' });
        }

        const verify = await bcrypt.compare(password, user?.password);

        if (user && verify) {
            const token = generateToken(user._id);
            // console.log(token);
            return res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                pic: user.pic,
                token
            })
        } else {
            return res.status(400).send({ "msg": "Wrong password" })
        }
    } catch (error) {
        res.status(401).send({ msg: 'Error logingin', error })
    }
});

userRoute.get('/allUsers', authenticate, async (req, res) => {
    const keyWord = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]
    } : {};

    const users = await userModel.find(keyWord)
        .find({
            _id: { $ne: req.user._id }
        });

    res.status(200).send(users);
    // console.log(keyWord);
});

module.exports = userRoute;