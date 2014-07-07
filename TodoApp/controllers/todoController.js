(function (todoController) {
    
    var data = require("../data");
    
    todoController.init = function (app) {
        
        app.get("/todos/:categoryName", function (req, res) {
            
            var categoryName = req.params.categoryName;
            
            data.getTodos(categoryName, function (err, todos) {
                if (err) { 
                    res.send(400, err);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(todo);
                }
            });
        });

    };
})(module.exports);