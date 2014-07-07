var http = require("http");
var express = require("express");
var app = express();
var controllers = require("./controllers");
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var expressSession = require("express-session");
var cookieParser = require("cookie-parser");

//Setup View Engine
app.set("view engine", "vash");


//Get Services
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({secret: "TodoDoodoo", resave: true, saveUninitialized: true}));
app.use(flash());


//Setup public resource folder
app.use(express.static(__dirname + "/public"));


//Map routes in controllers/index
controllers.init(app);


//This should probably be in a security controller or something?
//app.get("/api/users", function (req, res) {
//    res.set("Content-Type", "application/json");
//    res.send({ name: "Josh", isValid: true, group: "Admin" });
//});


var server = http.createServer(app);
server.listen(3000);