const mongoose = require('mongoose');

const user = mongoose.model('user', {
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    }
});

module.exports = {user};