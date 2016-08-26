// Dependencies
// ============
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // for working with cookies
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var Sequelize = require('sequelize');

//add in mySQL db here
var mySequelize = new Sequelize("");
// Our model controllers (rather than routes)

var users_controller = require('./controllers/Users_controller');
// var index_html = require('index.html'); // do we need this?

//see if database is working
mySequelize.authenticate().complete(function(err){
	if(err){
		console.log('Unable to connect to database:', err);
	}
	else{
		console.log('Connection successful');
	}
});


// Express settings
// ================

// instantiate our app
var app = express();

// override POST to have DELETE and PUT
app.use(methodOverride('_method'))

//allow sessions
app.use(session({ 	secret: 'app',
					cookie: { maxAge: 60000 },
					resave: true,
					saveUninitialized: true
					}));
app.use(cookieParser());

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', users_controller);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next();
});

// 8.25.2016
var models = require("./models");

// we set the port of the app
app.set('port', process.env.PORT || 3000);


// we sync the models with our db
// (thus creating the apropos tables)
models.sequelize.sync().then(function () {
	// set our app to listen to the port we set above
  var server = app.listen(app.get('port'), function() {
  	// then save a log of the listening to our debugger.
    console.log('Express server listening on port ' + server.address().port);
  });
});

// our module get's exported as app.
module.exports = app;


// Where's the listen? Open up bin/www, and read the comments.
