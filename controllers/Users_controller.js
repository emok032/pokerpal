// users_controller.js
var bcrypt = require('bcryptjs');
var models  = require('../models');
var express = require('express');
var router  = express.Router();
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//this is the users_controller.js file
router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});
// router.get('/register', function(req,res) {
//  res.render('layouts/main'); // *FRONT-END: Add directory "/users/...""
// });

// router.get('/sign-in', function(req,res) {
//  res.render('users/sign-in');
// });
// router.get("/register", function(req, res){
//   res.render("home")
// });


router.get("/home", function(req, res){
  res.render("home")
});

router.get("/home/games", function(req, res){
  models.game.findAll({
    include: [models.User]
  })
  .then(function(games){
    res.render('home')
  })
})
//passport implementation
passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//authentication request for passport
router.post("/login",
  passport.authenticate('local', {failureRedirect: '/login'}),
  function(req, res){
    res.redirect('/');
 });

// was "/register"
router.post("/register", function(req, res){
  models.User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }).then(function(users){res.redirect('/home')   
  });
});

router.post("/host", function(req, res){
  models.game.create({
    zipcode: req.body.zipcode,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    apt: req.body.apt,
    date: req.body.date,
    time: req.body.time
    }).then(function(games){res.redirect('/home/games')   
  });
});

module.exports = router;
