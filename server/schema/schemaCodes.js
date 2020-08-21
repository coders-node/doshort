const { Schema, model } = require('mongoose');

const Code = new Schema({
    owner: String,
    code: String,
    longUri: String
});

module.exports = model('Code', Code);