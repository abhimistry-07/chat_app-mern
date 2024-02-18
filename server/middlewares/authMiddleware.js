const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const auth = async (req, res, next) => {
    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);


            req.user = await userModel.findById(decoded.id).select("-password");
            //  decoded.id;

            next();
        } catch (error) {
            res.status(401).send({ 'msg': 'Not, authorized, token failed!' })
        }
    }

    if (!token) {
        return res.send({ msg: 'Please login first' });
    }
}

module.exports = auth;
