const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const contactprojectSchema = new mongoose.Schema({
    project: {
        type: ObjectId,
        required: true
    },
    contact: {
        type: ObjectId,
        required: true
    }
});

const contactproject = mongoose.model('contactproject', contactprojectSchema);

module.exports = contactproject;