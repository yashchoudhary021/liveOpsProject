const mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gmail: String,
    phone: Number
})
const user = mongoose.model('shemaCollection', userSchema);
module.exports = {user}