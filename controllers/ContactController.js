const db = require('../db/Db');
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const ObjectId = require('mongodb').ObjectId;

const Contact = require('../models/contact');

exports.contacts = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection('contact').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.render('contacts', { list: result });
        });
    });
};

exports.addnewcontact = async (req, res, next) => {
    var contact = new Contact({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
    });

    try {
        await db.addItem('contact', contact);
    } catch (ex) {
        return
    }

    res.redirect('/contacts');
};

exports.editcontact = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('mydb');
        var query = { _id: new ObjectId(req.params.contactid) };
        dbo.collection('contact').findOne(query, function (err, result) {
            if (err) console.log(err);
            else {
                console.log(result);
                res.render('editcontact', { contact: result })
            };
        });
    });
};

exports.addcontact = (req, res) => {
    res.render('addcontact');
};

exports.updatecontact = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = { _id: new ObjectId(req.params.contactid) };
        var newvalues = {
            $set:
            {
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone
            }
        };
        dbo.collection("contact").updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            db.close();
        });
    });
    res.redirect('/contacts');
};

exports.deletecontact = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('mydb');
        var myquery = { _id: new ObjectId(req.params.contactid) };
        dbo.collection("contact").deleteOne(myquery, function (err, result) {
            if (err) throw err;
            db.close();
        });
    });
    res.redirect('/contacts');
};