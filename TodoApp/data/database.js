(function (database) {
    
    var mongodb = require("mongodb");
    var mongoUrl = "mongodb://localhost:27017/todoApp";
    var theDb = null;
    
    database.getDb = function (next) {
        if (!theDb) {
            //connect
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db,
                        todos: db.collection("todos")
                    };
                    next(null, theDb);
                }
            });
        } else {
            next(null, theDb);
        }
    }

})(module.exports);