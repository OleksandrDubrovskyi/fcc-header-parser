// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//Header Parser endpoint
app.get("/api/whoami", function (req, res) {
  let ipraw = req.headers['x-forwarded-for'].toString();
  let ipaddr = ipraw.slice(0,ipraw.indexOf(","))
  let lang = req.headers['accept-language'].toString();
  let soft = req.headers['user-agent'].toString();
  
  var json = `{"ipaddress":"${ipaddr}" , "language":"${lang}", "software":"${soft}"}`;
  var obj = JSON.parse(json);
  
  res.send(obj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
