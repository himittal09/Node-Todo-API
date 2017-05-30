const mongoose = require('mongoose');
const validator = require('validator');

const user = mongoose.model('user', {
    /* username: {
        type: String,
        required: true,
        minlength: 1,  //isAlphanumeric
        trim: true,
        unique: true,
        validate: {
            validator: validator.isAlphanumeric,
            message: '{VALUE} is not a Valid Username.'
        }
    }, */
    email: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a Valid Email.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8

    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

module.exports = {user};