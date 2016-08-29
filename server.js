// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs  = require('express-handlebars');
var models = require('./models');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

var router = express.Router();

//MIDDLEWARE//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(require('express-session')({secret: 'keyboard dog', resave: true, saveUninitialized: true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(process.cwd() + '/public'));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
models.sequelize.sync();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Basic route that sends the user first to the AJAX Page
app.get('/', function (req, res) {
  // res.send('Welcome to the Star Wars Page!')
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get("/home", function(req, res){
  res.render("home")
});

app.get("/home/games", function(req, res){
  models.game.findAll({
    include: [models.User]
  })
  .then(function(games){
    res.render('')
  })
})

// //passport implementation
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     models.User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));
//
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
//
// //authentication request for passport
// app.post("/login",
//   passport.authenticate('local', {failureRedirect: '/login'}),
//   function(req, res){
//     res.redirect('/');
//   });
//
// app.post("/register", function(req, res){
//   models.User.create(
//     {
//       username: req.body.username,
//       password: req.body.password,
//       email: req.body.email
//     }
//   );
// });

//Defining middleware to serve static files
app.use('/static', express.static('public'));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
