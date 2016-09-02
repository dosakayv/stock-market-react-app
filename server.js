var express = require("express");
var path = require('path')
var mongodb = require("mongodb").MongoClient; 
var mongoose = require("mongoose");
var bodyParser = require('body-parser');

var app = express();
var port = 4000;

// connect to mongo db
mongoose.connect("mongodb://cucumberv:cucumberv@ds023654.mlab.com:23654/stocks-graph", function(err, database){
	console.log(err);
	console.log(database);
	console.log("connected with data base");
});

// mongodb.connect("mongodb://cucumberv:cucumberv@ds023654.mlab.com:23654/stocks-graph", function(err, database){
// 	console.log(err);
// 	console.log(database);
// 	console.log("connected with data base");
// });

// Need to be able to parse through the req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Make sure to include the JSX transpiler
// require('node-jsx-babel').install()
require('node-jsx').install()

// Set up Routes for the application
require('./app/routes/core-routes.js')(app);

console.log("added static files")
// Include static assets. Not advised for production
app.use(express.static(path.join(__dirname, 'public')));

// Set view path
app.set('views', path.join(__dirname, 'views'));
// set up ejs for templating. You can use whatever
app.set('view engine', 'ejs');

// Route not found -- Set 404
app.get('*', function(req, res){
  res.send('what???', 404);
});

app.listen(port);
console.log('Server is Up and Running at Port : ' + port);
