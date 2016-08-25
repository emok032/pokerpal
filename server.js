// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs  = require('express-handlebars');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(process.cwd() + '/public'));

// // Star Wars Characters (DATA)
// // =============================================================
// var pokemon = [{
//   routeName: 'bulbasaur',
//   name: 'Bulbasaur',
//   type: 'Poison'
// }, {
//   routeName: 'ivysaur',
//   name: 'Ivysaur',
//   type: 'Grass'
// }, {
//   routeName: 'charmander',
//   name: 'Charmander',
//   type: 'Fire'
// }];

// Routes
// =============================================================

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

//Defining middleware to serve static files
app.use('/static', express.static('public'));

// // Search for Specific Character (or all characters) - provides JSON
// app.get('/api/pokemon/', function (req, res) {
//   var chosen = req.params.pokemon;

//   if (chosen) {
//     console.log(chosen);

//     for (var i = 0; i < pokemon.length; i++) {
//       if (chosen === pokemon[i].routeName) {
//         res.json(pokemon[i]);
//         return;
//       }
//     }

//     res.json(false);
//   } else {
//     res.json(pokemon);
//   }
// });

// app.get('/api/pokemon/:index/', function (req, res) {
//   var chosen = req.params.pokemon;

//   if (chosen) {
//     console.log(chosen);

//     for (var i = 0; i < pokemon.length; i++) {
//       if (chosen === pokemon[i].routeName) {
//         res.json(pokemon[i]);
//         return;
//       }
//     }

//     res.json(false);
//   } else {
//     res.json(pokemon);
//   }
// });

// // Create New Characters - takes in JSON input
// app.post('/api/pokemon/', function (req, res) {
//   // req.body hosts is equal to the JSON post sent from the user
//   var newpokemon = req.body;

//   console.log(newpokemon);

//   // We then add the json the user sent to the character array
//   characters.push(newpokemon);

//   // We then display the JSON to the users
//   res.json(newpokemon);
// });

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log('App listening on PORT ' + PORT);
});
