const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const contactSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    phone: Number,
    company: ObjectId
});

const contact = mongoose.model('contact', contactSchema);

module.exports = contact;