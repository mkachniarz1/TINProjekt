const db = require('../db/Db');
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const Company = require('../models/company');
const ObjectId = require('mongodb').ObjectId;


exports.companies = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection('company').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.render('companies', {list: result});
        });
    });
};

exports.addcompany = (req, res) => {
    res.render('addcompany');
};

exports.addnewcompany = async (req, res, next) => {
    var company =  new Company({
        name: req.body.name,
        address: req.body.address,
        speciality: req.body.speciality
    });

    try {
        await db.addItem('company', company);
    } catch (ex) {
        return 
    }
    
    res.redirect('/companies');
};

exports.updatecompany = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myquery = { _id: new ObjectId(req.params.companyid) };
        var newvalues = {
            $set:
            {
                name: req.body.name,
                address: req.body.address,
                speciality: req.body.speciality
            }
        };
        dbo.collection("company").updateOne(myquery, newvalues, function (err, result) {
            if (err) throw err;
            db.close();
        });
    });
    res.redirect('/companies');
};

exports.deletecompany = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('mydb');
        var myquery = { _id: new ObjectId(req.params.company) };
        dbo.collection("company").deleteOne(myquery, function (err, result) {
            if (err) throw err;
            db.close();
        });
    });
    res.redirect('/companies');
};


exports.editcompany = (req, res) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('mydb');
        var query = { _id: new ObjectId(req.params.companyid) };
        dbo.collection('company').findOne(query, function (err, result) {
            if (err) console.log(err);
            else {
                res.render('editcompany', { company: result })
            };
        });
    });
};
