const { Schema, model } = require('mongoose');

const passwords = new Schema({
    user: String,
    title: String,
    email: String,
    username: String,
    password: String,
});

module.exports = model('passwords', passwords, 'passwords');