var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();

app.use(express.static('../Documents/GitHub/kaleidorpg'));

var portNum = 5000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '../Documents/GitHub/kalediorpg/index.html');
});

var server = app.listen(portNum, function () {
    console.log('Node server is running on port ' + portNum);
});