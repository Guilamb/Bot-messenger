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
//facebook latence
app.post('/webhook/', function (req, res) {
    let message_events = req.body.entry[0].messaging
    for (message_event of message_events) {
        let sender = message_event.sender.id
        if (message_event.message && message_event.message.text) {
            let text = message_event.message.text
            sendTextMessage(sender, "J'ai recu : " + text.substring(0, 200))
        }
    }
    res.sendStatus(200)
})
//receive message
function sendTextMessage(sender, text) {
    let data = { text:text }
    let access_token = "mEAAVX3oiaB0QBAJ0ckwF9XRy50Os5LNBu5DqMt8VwmQbtZCFlqzAubfjU3tBaebZATcWNPSktuplrfHD2OrTpx5sozZCbB0CaesZCMVqP55dgNPCRsMKGNV7psWZB3IlgyyXNMHHIjzQqYlKyttsR9YnL5W0fROuRWqa48V8kWrgZDZD";
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: access_token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: data,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}