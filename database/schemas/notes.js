const { Schema, model } = require('mongoose');

const notes = new Schema({
    user: String,
    title: String,
    note: String,
});

module.exports = model('notes', notes, 'notes');