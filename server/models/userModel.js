const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pic: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_640.png'
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;