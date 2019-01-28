const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongo = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/mydb";
const ObjectId = require('mongodb').ObjectId;

const User = require('../models/user');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(function (email, password, done) {
            mongo.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("mydb");
                var myquery = { email: email };
                dbo.collection("users").findOne(myquery, function (err, result) {
                    if (!result) { return done(null, false, { message: 'Given email is not signed up.' }) }

                    console.log(result);
                    bcrypt.compare(password, result.password, (err, match) => {
                        if (err) throw err;
                        if (match) {
                            return done(null, false);
                        }else{
                            return done(null, false, {message: 'Incorrect password'});
                        }
                    });
                    db.close();
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
};
