const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

const companyprojectSchema = new mongoose.Schema({
    project: {
        type: ObjectId,
        required: true
    },
    company: {
        type: ObjectId,
        required: true
    }
});

const companyproject = mongoose.model('companyproject', companySchema);

module.exports = companyproject;