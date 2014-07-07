(function (homeController) {
    
    var data = require("../data");
    
    homeController.init = function (app) {
        app.get("/", function (req, res) {
            
            data.getTodoCategories(function (err, results) {
                res.render("index", { title: "ToDo List", error: err, categories: results, newCatError: req.flash("newCategoryName") });
            });
        });

        app.post("/newCategory", function (req, res) {
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function (err) {
                if (err) {
                    console.log(err);
                    req.flash("newCategoryName", err);
                    res.redirect("/");
                } else { 
                    res.redirect("/todos/" + categoryName);
                }
            });
        });
    };
})(module.exports);