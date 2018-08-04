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
res.send("Hello world, je suis un chat bot"); 
});
// for Facebook verification
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
app.get('/webhook/', function (req, res) {
	const VERIFY_TOKEN = "<EAAVX3oiaB0QBALDB2uGwOUc0qCQGpHOtGSjNndloXWc3j1iGa97EtYUAU7tuSO2qaX5bV9wXxZBuQNuQXBZCw0Hhy4rZAf3TtuNPwcxavpXeMFNpZCJnfrY5UZAIudqdglA67NPeQJKam9WH6OudIcCYH9AAml4GZBjwhj9LMDMwZDZD>";
if (req.query['hub.verify_token'] === "202224") {res.send(req.query['hub.challenge']) ;}
res.send('erreur, mauvais token') ;}) ;
// Spin up the server
app.listen(app.get('port'), function() {
console.log('running on port', app.get('port')) ;
}) ;