const { Schema, model } = require('mongoose');

const passMaster = new Schema({
    username: String,
    password: String,
});

module.exports = model('passMaster', passMaster, 'passMaster');