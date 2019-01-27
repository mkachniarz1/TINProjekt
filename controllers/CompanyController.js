const db = require('../db/Db');
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const Company = require('../models/company');

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
