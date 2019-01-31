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
                            if (index == result.length - 1) {
                                res.render('contacts', { list: result });
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

// exports.contactdetails = (req, res) => {
//     mongo.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db('mydb');
//         var myquery = { _id: new ObjectId(req.params.contactid) };
//         dbo.collection("contact").findOne(myquery, function (err, result) {
//             if (err) throw err;
//             dbo.collection('company').findOne({ _id: result.company }, function (err, company) {
//                 console.log(company);
//                 if (err) throw err;
//                 dbo.collection('contactproject').find({ contact: result._id }, function (err, projects) {
//                     if (err) throw err;
//                     projects.forEach((value, index) => {
//                         dbo.collection('project').findOne({ _id: value.project }, function (err, project) {
//                             if (project) {
//                                 value.name = project.name;
//                             }

//                             if (index == projects.length - 1) {
//                                 res.render('contactdetails',
//                                     {
//                                         contact: result,
//                                         company: company,
//                                         list: projects
//                                     });
//                                 return;
//                             }
//                         });
//                     });
//                 });
//             });
//             db.close();
//         });
//     });
// };
exports.contactdetails = (req, res, next) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection('contact').findOne({ _id: new ObjectId(req.params.contactid) }, function (err, result) {
            if (err) throw err;
            req.contact = result;
            console.log(result);
            next();
        });
    });
};


exports.getprojects = (req, res, next) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection('contactproject').find({ contact: new ObjectId(req.params.contactid) }).toArray(function (err, result) {
            if (err) throw err;
            console.log(req.contact);
            res.render('contactdetails', {
                contact: req.contact
            });
        });
    });
};