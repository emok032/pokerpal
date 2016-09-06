// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs  = require('express-handlebars');
var models = require('./models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var sequelize = require('sequelize');
var session = require('express-session');

var SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var router = express.Router();
var db = models.sequelize;
//MIDDLEWARE//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(session({
  secret: 'keyboard dog',
  store: new SequelizeStore({
         db: db
       }),
  resave: false,
  saveUninitialized: false}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(process.cwd() + '/public'));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
db.sync();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var users_controller = require('./controllers/Users_controller');
app.use('/', users_controller);

//Defining middleware to serve static files
app.use('/static', express.static('public'));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
