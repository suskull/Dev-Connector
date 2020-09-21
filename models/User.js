const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // minlength: 6

    },
    email: {
        type: String,
        required: true,
        unique: true,
        // validate(value) {
        //     if(!validator.isEmail(value)) {
        //         throw new Error ('email is invalid')
        //     }
        // }
    },
    password: {
        type: String,
        required: true,
        // validate(value) {
        //     if (value.toLowerCase().includes('password')) {
        //         throw new Error('Password cannot contain "password"')
        //     }
        // }

    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('user', UserSchema)