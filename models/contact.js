const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    phone: Number
});

const contact = mongoose.model('contact', contactSchema);

module.exports = contact;