var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var sensor = require('./models/sensor');

app.use(bodyParser.json());

mongoose.connect("mongodb://admin:automationROCKS!@ds143777.mlab.com:43777/automation");
var connection = mongoose.connection;

connection.on("error", function() {
  console.log("Error connection to MongoLab");
});

connection.on("open", function() {
  console.log("Successfully connected to MongoLab");
});

app.get('/', function(request, response) {
  return response.send({
    "message": "Welcome to the Automation API"
  });
});

app.get('/api/retrieve', function(request, response) {
  sensor.find(function(error, data) {
    if(error) {
      return response.send({
        "message": "There was a problem"
      });
    }
    return response.send(data);
  });
});

app.post('/api/save', function(request, response) {
  new sensor({
    humidity: request.body.humidity,
    temperature: request.body.temperature,
    light: request.body.light,
    time: new Date()
  }).save(function(error, data) {
    return response.send({
      "message": error ? "There was a problem" : "Data saved"
    });
  });
});

app.listen(process.env.PORT || 3000);
