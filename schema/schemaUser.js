const { Schema, model } = require('mongoose');

const User = new Schema({
    username: String,
    password: String,
    token: String,
    balance: {type: Number, default: 0}
})

module.exports = model('User', User)