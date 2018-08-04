var express = require('express') ;
var bodyParser = require('body-parser') ;
var request = require('request') ;
const http = require('http'),
var app = express() ;
app.set('port', (process.env.PORT || 5000)) ;
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false})) ;
// Process application/json
app.use(bodyParser.json()) ;
// for Facebook verification
const VALIDATION_TOKEN = "mdp";
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});
// Index route
app.get('/', function (req, res) {
res.send("Hello world, je suis un chat bot"); 
});

// Spin up the server
app.listen(app.get('port'), function() {
console.log('running on port', app.get('port')) ;
}) ;