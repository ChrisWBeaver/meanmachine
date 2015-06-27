// BASE SETUP
// ======================================
// CALL THE PACKAGES --------------------
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database
var User = require('./app/models/user');
var jwt = require('jsonwebtoken');
var config = require('./config');
var apiRoutes = require('./app/routes/api')(app, express);
var path = require('path');
// APP CONFIGURATION ---------------------
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// configure our app to handle CORS requests
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
Authorization');
    next();
});
// log all requests to the console
app.use(morgan('dev'));
// ROUTES FOR OUR API
// =============================
// basic route for the home page
app.get('/', function(req, res) {
res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes 
app.use('/api', apiRoutes);
// START THE SERVER
// ===============================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
// please dont destry my db this is only a test :D
mongoose.connect(config.database);