'use strict';

var env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var webhook = require('./webhook');
var app = express();


// Modules
app.disable('etag');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/webhook', webhook);


app.use('/', function (req, res) {
    res.sendStatus(200);
});

// 404 Error handling
app.use(function (req, res, next) {
    next(new NotFoundError());
});


// Start server
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

});