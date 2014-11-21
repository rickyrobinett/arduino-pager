var twilio = require('twilio'),
   SerialPort = require("serialport").SerialPort,
   express = require('express'),
   bodyParser = require('body-parser');

var serialPort = new SerialPort("/dev/tty.usbmodem1421", {
 baudrate: 9600
});

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/sms', function(req, res){
 serialPort.write(req.body.Body, function(err, results) {
   if (err) {
     console.log('err ' + err);
   }
   console.log('results ' + results);
 });
 var resp = new twilio.TwimlResponse();
  resp.message(function() {
        this.body('Thanks for paging me. You can also find me on twitter @rickyrobinett')
            .media('http://media.giphy.com/media/y3ADSTHiLwhEs/giphy.gif');
      });
 res.type('text/xml');
 res.send(resp.toString());
});

serialPort.open( function () {
 app.listen(3000);
 console.log('Listening on port 3000');
});

