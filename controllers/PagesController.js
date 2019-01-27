const db = require('../db/Db');
const Contact = require('../models/contact');

exports.home = (req, res) => {
    res.render('home');
};

exports.about = (req, res) => {
    res.render('about');
};

exports.signin = (req, res) => {
    res.render('signin');
};

exports.signup = (req, res) => {
    res.render('signup', {
        validated: req.body
    });
};




