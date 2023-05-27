// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", function(req, res) {
  if (req.params.date === undefined) {
    return res.json({unix : Date.now(), utc: new Date().toUTCString()});
  }
  let timestamp;
  let utc;
  // is it a date string?
  const date = new Date(req.params.date);
  if(isNaN(date) || date.toString() === 'Invalid Date') {
    // is it a timestamp?
    timestamp = Number(req.params.date);
    const date = new Date(timestamp);
    if(isNaN(date) || date.toString() === 'Invalid Date') {
      return res.json({error : "Invalid Date"});
    }
    utc = new Date(timestamp).toUTCString();
  } else {
    timestamp = date.getTime();
    utc = date.toUTCString();
  }
  res.json({
    unix: timestamp,
    utc: utc
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
