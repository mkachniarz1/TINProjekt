const db = require('../db/Db');
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const Project = require('../models/project');

exports.projects = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection('project').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.render('projects', {list: result});
        });
    });
};


exports.addproject = (req, res) => {
    res.render('addproject');
};

exports.addnewproject = async (req, res, next) => {
    var project =  new Project({
        name: req.body.name,
        type: req.body.type,
        value: req.body.value,
        date: req.body.date
    });

    try {
        await db.addItem('project', project);
    } catch (ex) {
        return 
    }
    
    res.redirect('/projects');
};

exports.editproject = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('mydb');
        var query = { _id: new ObjectId(req.params.projectid) };
        dbo.collection('project').findOne(query, function (err, result) {
            if (err) console.log(err);
            else {
                res.render('editproject', { project: result })
            };
        });
    });
};
