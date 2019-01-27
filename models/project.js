const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const project = mongoose.model('projects', projectSchema);

module.exports = project;