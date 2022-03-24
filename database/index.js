const { connect } = require("mongoose")
const User = require("./schemas/passMaster")
const Passwords = require("./schemas/passwords")
const Notes = require("./schemas/notes")
const CreditCards = require("./schemas/creditCards")

connect("YOUR MONGO URL", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => null)
.catch((err) => console.log('\x1b[31m', '[-] [Database] Error: ', err,"\x1b[0m"));

module.exports = {
    User,
    Passwords,
    Notes,
    CreditCards,
}