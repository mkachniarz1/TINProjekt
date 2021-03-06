const db = require('../db/Db');
const { check, validationResult, body } = require('express-validator/check');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";

const User = require('../models/user')

exports.signup =  (req, res, next) => {

    var user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
        });
    });
    try {
        mongo.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('mydb');
            var query = { email: req.body.email };
            dbo.collection('contact').findOne(query, function (err, result) {
                if (err) console.log(err);
                if (result) {
                    console.log('email exists.');
                    return;
                }
            });
        });
        db.addItem('users', user);
    } catch (ex) {
        return
    }

    res.redirect('/signin');
};

exports.validate = [
    check('name').trim().isLength({ min: 3 }).withMessage('Name is required.'),
    check('lastName').trim().isLength({ min: 3 }).withMessage('Last name is required.'),
    check('email').isEmail().withMessage('Hmm.. it doesn\'t look like an email. Try again.'),
    check('email').isLength({ min: 4 }).withMessage('Email is required.'),
    check('password').isLength({ min: 6 }).withMessage('Password has to be at least 6 characters long.'),
    check('password').custom((value, { req, loc, path }) => {
        if (value !== req.body.repeatPassword) {
            throw new Error("Passwords don't match");
        } else {
            return value;
        }
    }).withMessage('Passwords doesn\'t match'),
    check('email').custom((value, { req, loc, path }) => {
        if (User.findOne({ email: req.body.email })) {
            return value;
        } else {
            throw new Error("Email already exists.");
        }
    }).withMessage("Email already exists.")
];

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('signup', {
            validated: req.body,
            errors: errors.mapped()
        });
    }

    next();
};

exports.signin = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
};


// exports.singin = (req, res, next) => {
//     passport.authenticate('mydb', {
//         successRedirect: '/',
//         successFlash: 'You\'ve been signed in !',
//         failureRedirect: '/signin',
//     });
// }