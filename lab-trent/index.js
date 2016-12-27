'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorRoute = require('./routes/error-route');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/statshot';
const PORT = process.env.PORT || 3000;

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, function() {
  console.log('Connected to MongoDB successfully.');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('*', function(req, res, next) {
  console.log('Connection from: ' + req.connection.remoteAddress.replace('::ffff:', '') + ' requesting ' + req.url);
  next();
});

app.use('/api', require('./routes/statshotroute'));
app.use(errorRoute);

module.exports = app;

if (require.main === module) {
  app.listen(PORT, function() {
    console.log('Server listening on http://localhost/:' + PORT);
  });
}
