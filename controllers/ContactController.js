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
            result.forEach(function (contact, index) {
                if (contact.company) {
                    var query = { _id: contact.company };
                    dbo.collection('company').findOne(query, function (err, company) {
                        if (company) {
                            console.log(index);
                            contact.cname = company.name;
                            if (index == result.length - 1){
                                res.render('contacts', {list: result});
                                return;
                            }
                        }
                    });
                }
            });
            db.close();
        });
    });
};

exports.addnewcontact = async (req, res, next) => {
    var contact = new Contact({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        company: new ObjectId(req.body.company)
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
                dbo.collection('company').find({}).toArray(function (err, companies) {
                    if (err) throw err;
                    res.render('editcontact',
                        {
                            contact: result,
                            companies: companies
                        });
                });
            };
        });
    });
};

exports.addcontact = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection('company').find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            res.render('addcontact', { projects: result });
        });
    });
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
                phone: req.body.phone,
                company: new ObjectId(req.body.company)
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