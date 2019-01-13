
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    userName: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: false
    },
    emailAddress:  {
        type: String,
        required: true,
        unique: false
    },
    password:  {
        type: String,
        required: false
    }
});

const UserModel = mongoose.model('User', UserSchema)

module.exports = {
    UserModel
}