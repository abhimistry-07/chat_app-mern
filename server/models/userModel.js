const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: {
        type: String, required: true,
        default: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png'
    },
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;