const db = require('../db/Db');
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const ObjectId = require('mongodb').ObjectId;

const ContactProject = require('../models/contactproject');

exports.assignproject = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection('contact').findOne({ _id: new ObjectId(req.params.contactid) }, function (err, contactresult) {
            if (err) throw err;
            mongo.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                dbo.collection('contactproject').find({ contact: new ObjectId(req.params.contactid) }).project({ project: 1, _id: 0 }).toArray(function (err, result) {
                    if (err) throw err;
                    console.log(result);
                    result.forEach((contactproject, index) => {
                        dbo.collection('project').findOne({ _id: contactproject.project }, function (err, project) {
                            if (err) throw err;

                            if (project) {
                                if (index == result.length - 1) {
                                    dbo.collection('project').find({ project: { $nin: result } }).toArray((err, projects) => {
                                        if (err) throw err;

                                        res.render('assignproject', {
                                            contact: contactresult,
                                            projects: projects
                                        });
                                    });
                                    return;
                                }
                            }
                        });
                    });
                });
            });
        });
    })
};