const db = require('../db/Db');
const { check, validationResult } = require('express-validator/check');

exports.signup = async (req, res, next) => {

    var item = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };
    try {
        await db.addItem('customers', item);
    } catch (ex) {
        return 
    }
    res.redirect('/signin');
};

exports.validate = [
    check('name').trim().isLength({min: 3}).withMessage('Name is required.'),
    check('lastName').trim().isLength({min: 3}).withMessage('Last name is required.'),
    check('email').isEmail().withMessage('Hmm.. it doesn\'t look like email. Try again.'),
    check('email').isLength({min: 4}).withMessage('Email is required.'),
    check('password').isLength({min: 6}).withMessage('Password has to be at least 6 characters long.'),
    check('repeatPassword').equals('password').withMessage('Passwords are diffrent.')
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

exports.checkPassword = (req, res, next) => {
    if (req.body.password === req.body.repeatPassword) {
        next();
    } else {

    }
};



