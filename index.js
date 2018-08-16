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
res.send(req.query['hub.challenge']) ;
}) ;
// for Facebook verification
app.get('/webhook/', function (req, res) {
if (req.query['hub.verify_token'] === 'password_facile_a_retenir') {
res.send(req.query['hub.challenge']) ;
}
res.send('erreur, mauvais token') ;
}) ;
// Spin up the server
app.listen(app.get('port'), function() {
console.log('running on port', app.get('port')) ;
}) ;
//entry of the server
var token = "<EAAVX3oiaB0QBAMl2hyPhIB43mnwJAb6sZCO96OZCHyIEYTSVltLc3iGVTs46KTXk92RJnF6tC75vSBZCa3uMZBDMrU2ziizPepcOWbSpOVIPJbjJ1kZAHJIbNhVAQ6JOvntM8QkGEgvfK9TrtRbJ76zZACOD6YnXmNQ51InpAyjQZDZD>";
app.post('/webhook/', function (req, res) {
var messaging_events = req.body.entry[0].messaging ;
for (var i = 0; i < messaging_events.length; i++) {
var event = req.body.entry[0].messaging[i] ;
var sender = event.sender.id
if (event.message && event.message.text) {
var text = event.message.text ;
sendTextMessage(sender, "Message reçu : " + text.substring(0, 200)) ;
}
}
res.sendStatus(200) ;
})
//sent message
function sendTextMessage(sender, text) {
var messageText = { text:text } ;
request({
url: 'https://facebook.botframework.com/api/v1/bots/Boty',
qs: {access_token:token},
method: 'POST',
json: {
recipient: {id:sender},
message: messageText,
	}
},function(error, response, body) {
if (error) {
console.log('Une erreur est survenue : ', error) ;
} else if (response.body.error) {
console.log('Erreur: ', response.body.error) ;
}
}) ;
}

