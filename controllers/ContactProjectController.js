const db = require('../db/Db');
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const ObjectId = require('mongodb').ObjectId;

const ContactProject = require('../models/contactproject');

exports.assignproject = async (req, res) => {
    var contactproject = new ContactProject({
        project: new ObjectId(req.body.project),
        contact: new ObjectId(req.params.contactid)
    });

    try {
        await db.addItem('contactproject', contactproject);
    } catch (ex) {
        return
    }

    res.redirect('/contactdetails/' + req.params.contactid);
};