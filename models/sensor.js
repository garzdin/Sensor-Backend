var mongoose = require('mongoose');

var sensorSchema = mongoose.Schema({
  humidity: Number,
  temperature: Number,
  light: Number,
  time: Date
});

module.exports = mongoose.model('Sensor', sensorSchema);
