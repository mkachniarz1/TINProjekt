const db = require('../db/Db');

const Contact = require('../models/contact');
const Project = require('../models/project');
const Company = require('../models/company');

exports.addcontact = (req, res) => {
    res.render('addcontact');
};

exports.addnewcontact = async (req, res, next) => {
    var contact =  new Contact({
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

exports.addnewproject = async (req, res, next) => {
    var project =  new Contact({
        name: req.body.name,
        type: req.body.type,
        email: req.body.email,
        phone: req.body.phone
    });

    try {
        await db.addItem('project', project);
    } catch (ex) {
        return 
    }
    
    res.redirect('/projects');
};
