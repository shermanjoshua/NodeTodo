(function (controllers) {
    
    var homeController = require("./homeController");
    var todoController = require("./todoController");
        
    controllers.init = function (app) {
        homeController.init(app);
        todoController.init(app);        
    }
})(module.exports);