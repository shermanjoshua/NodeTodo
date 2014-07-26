(function (data) {
    
    var seedData = require("./seedData");
    var database = require("./database");
    
    data.getTodoCategories = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            } else {
                db.todos.find().toArray(function (err, results) {
                    if (err) {
                        next(err, null);
                    } else {
                        next(null, results);
                    }
                });
            }
        })
    };
    
    data.getTodos = function (categoryName, next) { 
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todos.findOne({ name: categoryName }, next);
            }
        }); 
    };
    
    data.createNewCategory = function (categoryName, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.todos.find({ name: categoryName }).count(function (err, count) {
                    
                    if (err) {
                        next(err);
                    } else {
                        if (count != 0) { 
                            next("Category already exists");
                        } else {
                            var cat = {
                                name: categoryName, 
                                todos: []
                            };
                            db.todos.insert(cat, function (err) {
                                if (err) {
                                    next(err);
                                } else {
                                    next(null)
                                }
                            });
                        }
                    }
                });
            }
        });
    };

    function seedDatabase() {
        database.getDb(function (err, db) {
            if (err) {
                console.log("Failed to seed database: " + err);
            } else {
                // see if data is already there
                db.todos.count(function (err, count) {
                    if (err) {
                        console.log("Failed to retreive todo count");
                    } else {
                        if (count == 0) {
                            console.log("Seeding database...");
                            seedData.initialTodos.forEach(function (item) {
                                db.todos.insert(item, function (err) {
                                    if (err) console.log("Failed to insert todos");
                                });
                            });
                        } else {
                            console.log("Database already seeded...");
                        }
                    }
                });
            }
        });
    }
    
    seedDatabase();

})(module.exports);