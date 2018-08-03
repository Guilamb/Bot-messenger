var express = require('express') ;
var bodyParser = require('body-parser') ;
var request = require('request') ;
var app = express() ;
app.set('port', (process.env.PORT || 5000)) ;
// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false})) ;
// Process application/json
app.use(bodyParser.json()) ;
// Index route
app.get('/', function (req, res) {
res.send('Hello world, je suis un chat bot’) ; }) ;
// for Facebook verification
app.get('/webhook/', function (req, res) {
if (req.query['hub.verify_token'] === 'password_facile_a_retenir’) {res.send(req.query['hub.challenge']) ;}
res.send(‘erreur, mauvais token') ;}) ;
// Spin up the server
app.listen(app.get('port'), function() {
console.log('running on port', app.get('port')) ;
}) ;