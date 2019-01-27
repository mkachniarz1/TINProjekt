const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    }
});

const company = mongoose.model('companies', companySchema);

module.exports = company;