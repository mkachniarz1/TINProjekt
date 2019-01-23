const mongo = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/mydb";

exports.addItem = (collection, item) => {
    mongo.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection(collection).insertOne(item, function (err, res) {
            if (err) throw err;
            console.log(`1 document inserted \n${item}`);
            db.close();
        });
    });
};