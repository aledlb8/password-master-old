const { Schema, model } = require('mongoose');

const creditCards = new Schema({
    user: String,
    title: String,
    cardNumber: String,
    expiration: String,
    cvv: String,
});

module.exports = model('creditCards', creditCards, 'creditCards');