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


router.get('/home', function(req, res){
  res.render('home');
});

// router.get("/home/games", function(req, res){
//   models.Game.findAll({
//     include: [models.Game]
//   })
//   .then(function(games){
//     res.render("home")
//   })
// });

//passport implementation
  // passport.use(new LocalStrategy(
  //   function(username, password, done) {
  //     models.User.findOne({where: { username: username, password: password } }, function (err, user) {
  //       if (err) { return done(err); }
  //       if (!user) { return done(null, false); }
  //       if (!user.verifyPassword(password)) { return done(null, false); }
  //       return done(null, user);
  //     });
  //   }
  // ));

passport.use(new LocalStrategy(
 function(username, password, done) {
  //console.log(password);
  models.User.findOne(
    {
      where: 
        {
          username: username, 
          password: password 
        }
    }
  ).then(function (user) {
    //console.log(user);
     // if (err) { return done(err); }
    if (!user) {
      return done(null, false, console.log("Incorrect credentials"));
    }
      return done(null, user);
  }).catch(function(err) {
    throw err;
  })
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  // function (err, user) {
  //   done(err, user);
  // });

//authentication request for passport
router.post('/login',
  passport.authenticate('local'
    , {failureRedirect: '/'}
    ),
  function(req, res){
    console.log('Success');
    res.redirect('/home');
    console.log(req.session.)
 });

// router.post('/login',
//   function(req, res){
//     models.User.findOne({where: {username: req.body.username, password: req.body.password}}).then(function(){
        
//     })
//     console.log('Success');
//     res.redirect('/home');
//  });

// was "/register"
router.post("/register", function(req, res){
  models.User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }).then(function(users){res.redirect('/')   
  }, function(err){
    throw err
  });
});

router.post("/games", function (req, res) {
  models.Game.create({
    // columnName: req.body.htmlFormName
    zipcode: req.body.zipcode,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    apt: req.body.apt,
    date: req.body.date,
    time: req.body.time
    // user_id: req.session.user_id (or find a way to access this if it is wrong. also sid's api needs this userid to put address into search)
  }).then(function(games) { // connect the .create to this .then
    res.redirect('/home');
  });
});

module.exports = router;
