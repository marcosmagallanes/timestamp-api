// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", (req, res) => {
  
  let time

  if (req.params.date === undefined) {
    time = new Date()
  } else if (String(req.params.date).match(/^[0-9]*$/g)) {
    time = new Date(parseInt(req.params.date));
  } else {
    time = new Date(req.params.date);
  }

  if (time == 'Invalid Date') {
    res.json({ error: time.toString() })
  } else {
    res.json({ unix: Date.parse(time), utc: time.toUTCString() });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
